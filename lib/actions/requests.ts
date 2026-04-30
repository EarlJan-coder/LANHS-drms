"use server";

import { db } from "@/lib/db";
import { requests, users, documentTypes } from "@/lib/schema";
import { generateReferenceCode } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { resend } from "@/lib/resend";
import RequestReceivedEmail from "@/components/emails/RequestReceived";
import RequestApprovedEmail from "@/components/emails/RequestApproved";
import RequestDeclinedEmail from "@/components/emails/RequestDeclined";
import React from "react";

export async function createRequest(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const documentTypeId = formData.get("documentTypeId") as string;
  const purpose = formData.get("purpose") as string;
  const copies = parseInt(formData.get("copies") as string) || 1;

  if (!documentTypeId || !purpose) {
    return { success: false, error: "Missing required fields" };
  }

  const referenceCode = generateReferenceCode();

  try {
    await db.insert(requests).values({
      referenceCode,
      studentId: userId,
      documentTypeId,
      purpose,
      copies,
      status: "pending",
    });

    const student = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    const docType = await db.query.documentTypes.findFirst({
      where: eq(documentTypes.id, documentTypeId),
    });

    if (student && docType) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: student.email,
        subject: `Your document request has been received — ${referenceCode}`,
        react: React.createElement(RequestReceivedEmail, {
          referenceCode,
          documentType: docType.name,
          processingDays: docType.processingDays,
        }),
      });
    }

    revalidatePath("/track");
    return { success: true, referenceCode };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create request" };
  }
}

export async function updateRequestStatus(
  requestId: string,
  status: "approved" | "declined" | "ready" | "claimed",
  remarks?: string
) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== "admin") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const [updatedRequest] = await db
      .update(requests)
      .set({ status, remarks, updatedAt: new Date() })
      .where(eq(requests.id, requestId))
      .returning();

    const student = await db.query.users.findFirst({
      where: eq(users.id, updatedRequest.studentId!),
    });

    const docType = await db.query.documentTypes.findFirst({
      where: eq(documentTypes.id, updatedRequest.documentTypeId!),
    });

    if (student && docType) {
      if (status === "approved") {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: student.email,
          subject: `Your document request has been approved — ${updatedRequest.referenceCode}`,
          react: React.createElement(RequestApprovedEmail, {
            referenceCode: updatedRequest.referenceCode,
            documentType: docType.name,
          }),
        });
      } else if (status === "declined") {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: student.email,
          subject: `Your document request has been declined — ${updatedRequest.referenceCode}`,
          react: React.createElement(RequestDeclinedEmail, {
            referenceCode: updatedRequest.referenceCode,
            documentType: docType.name,
            remarks: remarks || "No remarks provided",
          }),
        });
      }
    }

    revalidatePath("/admin/transactions");
    revalidatePath("/admin/dashboard");
    revalidatePath("/track");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update request" };
  }
}
