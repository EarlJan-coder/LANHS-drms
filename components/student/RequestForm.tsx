"use client";

import { useState, useTransition } from "react";
import { createRequest } from "@/lib/actions/requests";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";

interface DocumentType {
  id: string;
  name: string;
  fee: string;
}

export function RequestForm({ documentTypes }: { documentTypes: DocumentType[] }) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await createRequest(formData);
      if (result.success) {
        setSuccess(result.referenceCode!);
      } else {
        setError(result.error || "An error occurred");
      }
    });
  }

  if (success) {
    return (
      <div className="bg-white p-8 border border-border space-y-4">
        <Badge variant="success" className="text-lg py-1 px-3">Success!</Badge>
        <h2 className="text-2xl font-bold">Request Submitted</h2>
        <p className="text-gray-600">
          Your request has been received. Please keep your reference code for tracking:
        </p>
        <div className="bg-gray-100 p-4 border border-dashed border-gray-400 font-mono text-xl text-center">
          {success}
        </div>
        <div className="pt-4">
          <Button onClick={() => window.location.href = "/track"}>Track My Request</Button>
        </div>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="bg-white p-8 border border-border space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider">Document Type</label>
        <Select name="documentTypeId" required defaultValue="">
          <option value="" disabled>Select a document...</option>
          {documentTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} (PHP {type.fee})
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider">Purpose</label>
        <Input name="purpose" placeholder="e.g. For employment, scholarship, etc." required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider">Number of Copies</label>
        <Input name="copies" type="number" min="1" defaultValue="1" required />
      </div>

      {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}
