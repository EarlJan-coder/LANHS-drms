import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
     redirect("/sign-in");
  }

  if (sessionClaims?.metadata?.role === "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            Registrar Portal
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">Request</Link>
            <Link href="/track" className="text-sm font-medium hover:text-primary">Track</Link>
            <Link href="/profile" className="text-sm font-medium hover:text-primary">Profile</Link>
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
