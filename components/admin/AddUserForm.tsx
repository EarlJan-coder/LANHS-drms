"use client";

import { useState, useTransition } from "react";
import { addUser } from "@/lib/actions/users";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";

export function AddUserForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      studentId: formData.get("studentId") as string,
      course: formData.get("course") as string,
      yearLevel: formData.get("yearLevel") as string,
    };

    startTransition(async () => {
      const result = await addUser(data);
      if (result.success) {
        router.push("/admin/users");
        router.refresh();
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
          <Input name="firstName" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Last Name</label>
          <Input name="lastName" required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider">Email Address</label>
        <Input name="email" type="email" required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider">Student ID</label>
        <Input name="studentId" placeholder="e.g. 2024-00123" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Course</label>
          <Input name="course" placeholder="e.g. BSCS" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider">Year Level</label>
          <Input name="yearLevel" placeholder="e.g. 1st Year" required />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

      <div className="flex gap-4 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Adding Student..." : "Add Student"}
        </Button>
      </div>
    </form>
  );
}
