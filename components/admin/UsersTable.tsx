import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { formatDate } from "@/lib/utils";

interface User {
  id: string;
  studentId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  course: string | null;
  yearLevel: string | null;
  createdAt: Date | null;
}

export function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="uppercase font-bold text-[10px] tracking-widest">Student ID</TableHead>
          <TableHead className="uppercase font-bold text-[10px] tracking-widest">Full Name</TableHead>
          <TableHead className="uppercase font-bold text-[10px] tracking-widest">Email</TableHead>
          <TableHead className="uppercase font-bold text-[10px] tracking-widest">Course/Year</TableHead>
          <TableHead className="uppercase font-bold text-[10px] tracking-widest">Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-mono">{user.studentId || "N/A"}</TableCell>
            <TableCell className="font-bold">{user.firstName} {user.lastName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.course || "N/A"} - {user.yearLevel || "N/A"}</TableCell>
            <TableCell>{formatDate(user.createdAt)}</TableCell>
          </TableRow>
        ))}
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
              No students found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
