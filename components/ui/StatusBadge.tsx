import { Badge } from "./Badge";

export function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "approved":
      return <Badge variant="success">Approved</Badge>;
    case "declined":
      return <Badge variant="danger">Declined</Badge>;
    case "ready":
      return <Badge variant="success" className="bg-blue-100 text-blue-800 border-blue-200">Ready for Pickup</Badge>;
    case "claimed":
      return <Badge variant="default">Claimed</Badge>;
    default:
      return <Badge variant="default">{status}</Badge>;
  }
}
