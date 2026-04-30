"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { auth, createClerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function getUsers() {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return await db.query.users.findMany({
    orderBy: (users, { desc }) => [desc(users.createdAt)],
  });
}

export async function updateUserProfile(data: {
  firstName: string;
  lastName: string;
  studentId: string;
  course: string;
  yearLevel: string;
}) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    await db
      .update(users)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
        studentId: data.studentId,
        course: data.course,
        yearLevel: data.yearLevel,
      })
      .where(eq(users.id, userId));

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function addUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  course: string;
  yearLevel: string;
}) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== "admin") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await clerk.invitations.createInvitation({
      emailAddress: data.email,
      publicMetadata: {
        role: "student",
      },
      ignoreExisting: true,
    });

    // We can't insert into users table without Clerk ID, 
    // so we rely on the webhook when the student accepts the invitation.
    
    return { success: true, message: "Invitation sent successfully" };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || "Failed to add user" };
  }
}
