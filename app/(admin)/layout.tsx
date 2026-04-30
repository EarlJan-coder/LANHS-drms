import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  if (sessionClaims?.metadata?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Link href="/admin/dashboard" className="text-xl font-bold text-primary">
              Admin Dashboard
            </Link>
            <span className="bg-primary text-white text-[10px] px-2 py-0.5 font-bold">ADMIN</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="text-sm font-medium hover:text-primary">Overview</Link>
            <Link href="/admin/transactions" className="text-sm font-medium hover:text-primary">Transactions</Link>
            <Link href="/admin/users" className="text-sm font-medium hover:text-primary">Students</Link>
            <UserButton />
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
