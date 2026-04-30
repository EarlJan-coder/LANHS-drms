import { Button } from "./Button";
import Link from "next/link";

export function Pagination({ page, totalPages, baseUrl }: { page: number, totalPages: number, baseUrl: string }) {
  if (totalPages <= 1) return null;

  const createUrl = (p: number) => {
    const url = new URL(baseUrl, "http://localhost"); // base doesn't matter for search params
    url.searchParams.set("page", p.toString());
    return url.search + url.hash;
  };

  return (
    <div className="flex justify-center items-center gap-4 py-6 border-t bg-gray-50/50">
      <Link href={createUrl(page - 1)} className={page <= 1 ? "pointer-events-none" : ""}>
        <Button variant="outline" size="sm" disabled={page <= 1}>Previous</Button>
      </Link>
      <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
        Page {page} of {totalPages}
      </div>
      <Link href={createUrl(page + 1)} className={page >= totalPages ? "pointer-events-none" : ""}>
        <Button variant="outline" size="sm" disabled={page >= totalPages}>Next</Button>
      </Link>
    </div>
  );
}
