import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import { TrackingTimeline } from "./TrackingTimeline";

interface RequestCardProps {
  request: {
    id: string;
    referenceCode: string;
    documentType: { name: string } | null;
    requestedAt: Date | null;
    status: string;
    remarks: string | null;
  };
}

export function RequestCard({ request }: RequestCardProps) {
  return (
    <div className="bg-white border border-border overflow-hidden">
      <div className="p-6 border-b flex justify-between items-start bg-gray-50/50">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Reference Code</p>
          <p className="font-mono text-lg font-bold">{request.referenceCode}</p>
        </div>
        <StatusBadge status={request.status} />
      </div>
      
      <div className="p-6 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Document Type</p>
            <p className="font-bold">{request.documentType?.name || "Unknown Document"}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Date Requested</p>
            <p className="text-sm">{formatDate(request.requestedAt)}</p>
          </div>

          {request.remarks && (
            <div className="p-4 bg-red-50 border border-red-100 space-y-1">
              <p className="text-[10px] font-bold uppercase text-red-600 tracking-widest">Admin Remarks</p>
              <p className="text-sm text-red-800">{request.remarks}</p>
            </div>
          )}
        </div>

        <div className="border-l md:pl-8">
           <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-4">Request Progress</p>
           <TrackingTimeline status={request.status} />
        </div>
      </div>
    </div>
  );
}
