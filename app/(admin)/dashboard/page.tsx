import { db } from "@/lib/db";
import { requests } from "@/lib/schema";
import { count, desc, eq } from "drizzle-orm";
import { RequestsTable } from "@/components/admin/RequestsTable";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export default async function AdminDashboard() {
  const totalRequests = await db.select({ count: count() }).from(requests);
  const pendingRequests = await db.select({ count: count() }).from(requests).where(eq(requests.status, "pending"));
  const approvedRequests = await db.select({ count: count() }).from(requests).where(eq(requests.status, "approved"));
  const declinedRequests = await db.select({ count: count() }).from(requests).where(eq(requests.status, "declined"));

  const recentRequests = await db.query.requests.findMany({
    limit: 10,
    with: {
      student: true,
      documentType: true,
    },
    orderBy: [desc(requests.requestedAt)],
  });

  const stats = [
    { label: "Total Requests", value: totalRequests[0].count, icon: FileText, color: "text-blue-600" },
    { label: "Pending", value: pendingRequests[0].count, icon: Clock, color: "text-yellow-600" },
    { label: "Approved", value: approvedRequests[0].count, icon: CheckCircle, color: "text-green-600" },
    { label: "Declined", value: declinedRequests[0].count, icon: XCircle, color: "text-red-600" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight">Overview</h1>
          <p className="text-gray-600">Quick statistics and recent activities.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/transactions">
            <Button variant="outline">View All Transactions</Button>
          </Link>
          <Link href="/admin/users/add">
            <Button>Add Student</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-border p-6 flex items-center gap-4">
            <div className={`p-3 bg-gray-50 border border-border ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold uppercase border-l-4 border-primary pl-4">Recent Requests</h2>
        <div className="bg-white border border-border overflow-hidden">
          <RequestsTable requests={recentRequests as any} />
        </div>
      </div>
    </div>
  );
}
