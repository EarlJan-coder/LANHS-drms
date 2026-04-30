import { AddUserForm } from "@/components/admin/AddUserForm";

export default function AddUserPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-12">
        <h1 className="text-3xl font-black uppercase tracking-tight">Add Student</h1>
        <p className="text-gray-600">Invite a new student to the system.</p>
      </div>

      <div className="bg-white border border-border p-8">
        <AddUserForm />
      </div>
    </div>
  );
}
