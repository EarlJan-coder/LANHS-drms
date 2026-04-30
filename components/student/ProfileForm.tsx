"use client";

import { useState, useTransition } from "react";
import { updateUserProfile } from "@/lib/actions/users";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string | null;
  course: string | null;
  yearLevel: string | null;
}

export function ProfileForm({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);
    
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      studentId: formData.get("studentId") as string,
      course: formData.get("course") as string,
      yearLevel: formData.get("yearLevel") as string,
    };

    startTransition(async () => {
      const result = await updateUserProfile(data);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "An error occurred");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">First Name</label>
          <Input name="firstName" defaultValue={user.firstName} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Last Name</label>
          <Input name="lastName" defaultValue={user.lastName} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider">Email (Read-only)</label>
        <Input value={user.email} readOnly className="bg-gray-50 text-gray-500 cursor-not-allowed" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider">Student ID</label>
        <Input name="studentId" defaultValue={user.studentId || ""} placeholder="e.g. 2024-00123" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Course</label>
          <Input name="course" defaultValue={user.course || ""} placeholder="e.g. BSCS" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Year Level</label>
          <Input name="yearLevel" defaultValue={user.yearLevel || ""} placeholder="e.g. 4th Year" required />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
      {success && <p className="text-green-600 text-sm font-bold">Profile updated successfully!</p>}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
