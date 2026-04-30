import { cn } from "@/lib/utils";
import { Check, Clock, Package, ThumbsUp, XCircle } from "lucide-react";

export function TrackingTimeline({ status }: { status: string }) {
  const steps = [
    { label: "Submitted", key: "submitted", icon: Clock },
    { label: "Under Review", key: "pending", icon: Clock },
    { label: status === "declined" ? "Declined" : "Approved", key: "approved", icon: status === "declined" ? XCircle : ThumbsUp },
    { label: "Ready for Pickup", key: "ready", icon: Package },
    { label: "Claimed", key: "claimed", icon: Check },
  ];

  const getStatusIndex = (s: string) => {
    if (s === "pending") return 1;
    if (s === "approved") return 2;
    if (s === "declined") return 2;
    if (s === "ready") return 3;
    if (s === "claimed") return 4;
    return 0;
  };

  const currentIndex = getStatusIndex(status);

  return (
    <div className="flex flex-col space-y-4 py-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex || (index === currentIndex && status !== "declined");
        const isActive = index === currentIndex;
        const isDeclined = status === "declined" && index === 2;
        
        // Hide Ready and Claimed if declined
        if (status === "declined" && index > 2) return null;

        const Icon = step.icon;

        return (
          <div key={step.label} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 flex items-center justify-center border-2",
                isCompleted ? "bg-primary border-primary text-white" : 
                isDeclined ? "bg-red-600 border-red-600 text-white" :
                "bg-white border-gray-300 text-gray-300"
              )}>
                <Icon size={16} />
              </div>
              {index < steps.length - 1 && (status !== "declined" || index < 2) && (
                <div className={cn(
                  "w-0.5 h-8 bg-gray-200",
                  index < currentIndex ? "bg-primary" : ""
                )} />
              )}
            </div>
            <div className="pt-1">
              <p className={cn(
                "text-sm font-bold uppercase tracking-wider",
                isActive ? "text-primary" : isDeclined ? "text-red-600" : "text-gray-400"
              )}>
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
