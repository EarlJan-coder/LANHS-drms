import { db } from "@/lib/db";
import { requests } from "@/lib/schema";
import { desc, eq, count } from "drizzle-orm";
import { RequestsTable } from "@/components/admin/RequestsTable";
import { Pagination } from "@/components/ui/Pagination";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const page = parseInt(params.page || "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  const whereClause = status ? eq(requests.status, status) : undefined;

  const allRequests = await db.query.requests.findMany({
    where: whereClause,
    with: {
      student: true,
      documentType: true,
    },
    orderBy: [desc(requests.requestedAt)],
    limit: limit,
    offset: offset,
  });

  const totalCountResult = await db.select({ value: count() }).from(requests).where(whereClause);
  const totalCount = totalCountResult[0].value;
  const totalPages = Math.ceil(totalCount / limit);

  const statuses = ["pending", "approved", "declined", "ready", "claimed"];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Transactions</h1>
          <p className="text-gray-600">Manage and process all document requests.</p>
        </div>
        <div className="flex flex-wrap gap-2">
           <Link 
             href="/admin/transactions"
             className={cn(
               "px-3 py-1 text-[10px] font-bold uppercase border border-border transition-colors",
               !status ? "bg-primary text-white" : "bg-white hover:bg-gray-50"
             )}
           >
             All
           </Link>
           {statuses.map(s => (
             <Link 
               key={s}
               href={`/admin/transactions?status=${s}`}
               className={cn(
                 "px-3 py-1 text-[10px] font-bold uppercase border border-border transition-colors",
                 status === s ? "bg-primary text-white" : "bg-white hover:bg-gray-50"
               )}
             >
               {s}
             </Link>
           ))}
        </div>
      </div>

      <div className="bg-white border border-border overflow-hidden">
        <RequestsTable requests={allRequests as any} />
        <Pagination page={page} totalPages={totalPages} baseUrl="/admin/transactions" />
      </div>
    </div>
  );
}
