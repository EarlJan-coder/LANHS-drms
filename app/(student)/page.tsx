import { db } from "@/lib/db";
import { documentTypes } from "@/lib/schema";
import { RequestForm } from "@/components/student/RequestForm";
import { eq } from "drizzle-orm";

export default async function LandingPage() {
  const docs = await db.query.documentTypes.findMany({
    where: eq(documentTypes.isActive, true),
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl font-black text-primary uppercase tracking-tighter">
          School Registrar
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Official Document Management & Request System. Submit your requests online and track their progress.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-primary pl-4 uppercase">
            Request a Document
          </h2>
          <p className="text-gray-600">
            Please fill out the form accurately. You will receive an email notification once your request is processed.
          </p>
          <div className="space-y-4">
            <h3 className="font-bold uppercase text-sm text-gray-400">Available Documents</h3>
            <ul className="space-y-2">
              {docs.map(doc => (
                <li key={doc.id} className="flex justify-between items-center p-3 bg-white border border-border">
                  <span className="font-medium">{doc.name}</span>
                  <span className="text-sm font-mono text-gray-500">PHP {doc.fee}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <RequestForm documentTypes={docs} />
        </div>
      </div>
    </div>
  );
}
