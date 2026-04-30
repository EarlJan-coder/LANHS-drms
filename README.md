# School Registrar Document Management and Request System

A full-stack web application for managing school document requests.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Neon (PostgreSQL)
- **ORM**: Drizzle ORM
- **Auth**: Clerk (Role-based: Student & Admin)
- **Email**: Resend with React Email
- **Styling**: Tailwind CSS v4

## Features
- **Students**:
  - Submit document requests with purpose and number of copies.
  - Track request status and progress via a timeline.
  - Update student profile (Student ID, Course, Year Level).
  - Receive email notifications on request receipt, approval, or decline.
- **Admins**:
  - Dashboard with statistics (Total, Pending, Approved, Declined).
  - Manage all transactions (Approve/Decline/Mark Ready/Mark Claimed).
  - Add students manually via Clerk invitations.
  - Search and filter students and requests.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file based on `.env.example`.

3. **Database Migration**:
   ```bash
   npm run db:push
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

## Design System
- **Primary Color**: Cherry Red (#CC0000)
- **Accent Color**: Deep Red (#990000)
- **Background**: White (#FFFFFF)
- **Typography**: Geist Sans and Geist Mono
