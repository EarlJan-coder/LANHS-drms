import { pgTable, text, timestamp, uuid, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  studentId: text("student_id").unique(),
  course: text("course"),
  yearLevel: text("year_level"),
  role: text("role").notNull().default("student"), // "student" | "admin"
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  requests: many(requests),
}));

export const documentTypes = pgTable("document_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(), // e.g. "Transcript of Records", "Certificate of Enrollment"
  description: text("description"),
  processingDays: integer("processing_days").notNull().default(3),
  fee: numeric("fee").notNull().default("0"),
  isActive: boolean("is_active").notNull().default(true),
});

export const documentTypesRelations = relations(documentTypes, ({ many }) => ({
  requests: many(requests),
}));

export const requests = pgTable("requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  referenceCode: text("reference_code").notNull().unique(), // e.g. "REQ-2024-00042"
  studentId: text("student_id").references(() => users.id),
  documentTypeId: uuid("document_type_id").references(() => documentTypes.id),
  purpose: text("purpose").notNull(),
  copies: integer("copies").notNull().default(1),
  status: text("status").notNull().default("pending"), // "pending" | "approved" | "declined" | "ready" | "claimed"
  remarks: text("remarks"), // admin notes on decline or approval
  requestedAt: timestamp("requested_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const requestsRelations = relations(requests, ({ one }) => ({
  student: one(users, {
    fields: [requests.studentId],
    references: [users.id],
  }),
  documentType: one(documentTypes, {
    fields: [requests.documentTypeId],
    references: [documentTypes.id],
  }),
}));
