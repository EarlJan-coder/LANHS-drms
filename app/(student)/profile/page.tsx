import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { ProfileForm } from "@/components/student/ProfileForm";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-12">
        <h1 className="text-3xl font-black uppercase tracking-tight text-primary">Your Profile</h1>
        <p className="text-gray-600">Update your student information for document requests.</p>
      </div>

      <div className="bg-white border border-border p-8">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
