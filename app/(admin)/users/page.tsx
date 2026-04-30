import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { desc, eq, count } from "drizzle-orm";
import { UsersTable } from "@/components/admin/UsersTable";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Pagination } from "@/components/ui/Pagination";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  const students = await db.query.users.findMany({
    where: eq(users.role, "student"),
    orderBy: [desc(users.createdAt)],
    limit: limit,
    offset: offset,
  });

  const totalCountResult = await db.select({ value: count() }).from(users).where(eq(users.role, "student"));
  const totalCount = totalCountResult[0].value;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Students</h1>
          <p className="text-gray-600">List of all registered students in the system.</p>
        </div>
        <Link href="/admin/users/add">
          <Button>Add New Student</Button>
        </Link>
      </div>

      <div className="bg-white border border-border overflow-hidden">
        <UsersTable users={students as any} />
        <Pagination page={page} totalPages={totalPages} baseUrl="/admin/users" />
      </div>
    </div>
  );
}
