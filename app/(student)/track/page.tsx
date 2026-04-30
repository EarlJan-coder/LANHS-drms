import { db } from "@/lib/db";
import { requests } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import { RequestCard } from "@/components/student/RequestCard";

export default async function TrackPage() {
  const { userId } = await auth();
  
  if (!userId) return null;

  const userRequests = await db.query.requests.findMany({
    where: eq(requests.studentId, userId),
    with: {
      documentType: true,
    },
    orderBy: [desc(requests.requestedAt)],
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-3xl font-black uppercase tracking-tight">Track Your Requests</h1>
        <p className="text-gray-600">View the status and progress of your document requests.</p>
      </div>

      {userRequests.length === 0 ? (
        <div className="text-center py-20 bg-white border border-border">
          <p className="text-gray-400">You haven't made any requests yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {userRequests.map((req) => (
            <RequestCard key={req.id} request={req as any} />
          ))}
        </div>
      )}
    </div>
  );
}
