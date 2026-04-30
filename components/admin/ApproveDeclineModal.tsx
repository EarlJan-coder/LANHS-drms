"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useTransition } from "react";
import { updateRequestStatus } from "@/lib/actions/requests";

interface ApproveDeclineModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: { id: string; referenceCode: string };
  type: "approve" | "decline";
}

export function ApproveDeclineModal({ isOpen, onClose, request, type }: ApproveDeclineModalProps) {
  const [isPending, startTransition] = useTransition();
  const [remarks, setRemarks] = useState("");

  const handleSubmit = async () => {
    if (type === "decline" && !remarks) {
      alert("Remarks are required for declining.");
      return;
    }

    startTransition(async () => {
      const result = await updateRequestStatus(
        request.id, 
        type === "approve" ? "approved" : "declined", 
        remarks
      );
      if (result.success) {
        onClose();
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === "approve" ? "Approve Request" : "Decline Request"}
    >
      <div className="space-y-4">
        <p className="text-sm">
          Are you sure you want to {type} request <span className="font-mono font-bold">{request.referenceCode}</span>?
        </p>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider">
            Remarks {type === "decline" && <span className="text-red-600">*</span>}
          </label>
          <Input 
            placeholder={type === "approve" ? "Optional notes..." : "Reason for declining..."}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isPending}>Cancel</Button>
          <Button 
            variant={type === "approve" ? "primary" : "danger"} 
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Processing..." : type === "approve" ? "Approve" : "Decline"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
