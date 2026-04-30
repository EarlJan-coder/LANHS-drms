"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { ApproveDeclineModal } from "./ApproveDeclineModal";
import { updateRequestStatus } from "@/lib/actions/requests";

interface Request {
  id: string;
  referenceCode: string;
  student: { firstName: string; lastName: string } | null;
  documentType: { name: string } | null;
  requestedAt: Date | null;
  status: "pending" | "approved" | "declined" | "ready" | "claimed";
}

export function RequestsTable({ requests }: { requests: Request[] }) {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [modalType, setModalType] = useState<"approve" | "decline" | null>(null);

  const handleStatusUpdate = async (id: string, status: any) => {
    if (confirm(`Mark as ${status}?`)) {
      await updateRequestStatus(id, status);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase font-bold text-[10px] tracking-widest">Ref Code</TableHead>
            <TableHead className="uppercase font-bold text-[10px] tracking-widest">Student</TableHead>
            <TableHead className="uppercase font-bold text-[10px] tracking-widest">Document</TableHead>
            <TableHead className="uppercase font-bold text-[10px] tracking-widest">Date</TableHead>
            <TableHead className="uppercase font-bold text-[10px] tracking-widest">Status</TableHead>
            <TableHead className="uppercase font-bold text-[10px] tracking-widest text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell className="font-mono font-bold">{req.referenceCode}</TableCell>
              <TableCell>{req.student ? `${req.student.firstName} ${req.student.lastName}` : "N/A"}</TableCell>
              <TableCell>{req.documentType?.name}</TableCell>
              <TableCell>{formatDate(req.requestedAt)}</TableCell>
              <TableCell><StatusBadge status={req.status} /></TableCell>
              <TableCell className="text-right space-x-2">
                {req.status === "pending" && (
                  <>
                    <Button 
                      size="sm" 
                      variant="primary"
                      onClick={() => { setSelectedRequest(req); setModalType("approve"); }}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => { setSelectedRequest(req); setModalType("decline"); }}
                    >
                      Decline
                    </Button>
                  </>
                )}
                {req.status === "approved" && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusUpdate(req.id, "ready")}
                  >
                    Mark Ready
                  </Button>
                )}
                {req.status === "ready" && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusUpdate(req.id, "claimed")}
                  >
                    Mark Claimed
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {requests.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedRequest && modalType && (
        <ApproveDeclineModal
          isOpen={!!selectedRequest}
          onClose={() => { setSelectedRequest(null); setModalType(null); }}
          request={selectedRequest}
          type={modalType}
        />
      )}
    </>
  );
}
