# Skill Bridge Frontend

Skill Bridge is a Tutor Booking Platform frontend built with Next.js, TypeScript, and Tailwind CSS.

---

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn UI, Radix UI
- **State Management:** Zustand
- **Form Handling:** TanStack React Form
- **Validation:** Zod
- **Notifications:** Sonner, SweetAlert2
- **Icons:** Lucide React, React Icons
- **HTTP:** Native Fetch API

---

## Project Structure

```
skill-bridge-frontend/
├── src/
│   ├── app/
│   │   ├── (commonLayout)/       # Shared layout pages
│   │   ├── dashboard/            # Dashboard pages
│   │   ├── profile/              # Profile pages
│   │   ├── public/               # Public pages
│   │   ├── tutors/
│   │   │   ├── [id]/             # Single tutor page
│   │   │   └── all/              # All tutors page
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── Bookings.tsx
│   │   │   ├── Categories.tsx
│   │   │   └── Users.tsx
│   │   ├── authentication/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── common/
│   │   │   ├── AboutUsPage.tsx
│   │   │   ├── Banner.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── GetAccessToday.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PrivacyPolicyPage.tsx
│   │   │   ├── TermsPage.tsx
│   │   │   └── UnlockPotential.tsx
│   │   ├── profile/
│   │   ├── Tutor/
│   │   │   ├── AllTutorsPage.tsx
│   │   │   ├── AvailabilitySection.tsx
│   │   │   ├── TutorCard.tsx
│   │   │   ├── TutorReviewsPage.tsx
│   │   │   ├── TutorSessions.tsx
│   │   │   └── TutorSidebar.tsx
│   │   ├── BookingForm.tsx
│   │   ├── CategoriesSection.tsx
│   │   ├── LogoutButton.tsx
│   │   ├── MyBookingsClient.tsx
│   │   ├── PrivateRoute.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── StudentSidebar.tsx
│   ├── lib/
│   ├── services/
│   │   ├── tutor.service.ts      # Tutor related API calls
│   │   └── user.service.ts       # User session management
│   ├── store/                    # Zustand store
│   ├── types/                    # TypeScript types
│   └── assets/
├── .env.local
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd skill-bridge-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local` file

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### 4. Start the dev server

```bash
npm run dev
```

App will run at `http://localhost:3000`.

---

## Authentication

JWT token is used for authentication.

### Token Storage

When a user logs in, the token is saved in two places:

```typescript
// For client-side usage
localStorage.setItem("token", data.data.token);

// For server-side (Next.js Server Components)
document.cookie = `token=${data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
```

### Logout

Both storages are cleared on logout:

```typescript
localStorage.removeItem("token");
document.cookie = "token=; path=/; max-age=0";
```

### Making Protected API Calls

```typescript
const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/some-endpoint`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

### Getting Session in Server Components

```typescript
import { userService } from "@/services/user.service";

const { data, error } = await userService.getSession();
const user = data; // { id, name, email, role, status, image, phone }
```

---

## User Roles

| Role | Dashboard | Description |
|------|-----------|-------------|
| `STUDENT` | `/dashboard/student` | Can book tutors and submit reviews |
| `TUTOR` | `/dashboard/tutor` | Can manage profile, availability, and sessions |
| `ADMIN` | `/dashboard/admin` | Can manage users, bookings, and categories |

---

## Pages

### Public Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/tutors/all` | Browse all tutors |
| `/tutors/[id]` | Single tutor profile |
| `/login` | Login page |
| `/register` | Register page |

### Student Dashboard

| Route | Description |
|-------|-------------|
| `/dashboard/student` | Student home |
| `/dashboard/student/my-booking` | My bookings |

### Tutor Dashboard

| Route | Description |
|-------|-------------|
| `/dashboard/tutor` | Tutor home |
| `/dashboard/tutor/sessions` | Sessions |
| `/dashboard/tutor/availability` | Manage availability |

### Admin Dashboard

| Route | Description |
|-------|-------------|
| `/dashboard/admin` | Admin home |
| `/dashboard/admin/users` | Manage all users |
| `/dashboard/admin/bookings` | View all bookings |
| `/dashboard/admin/categories` | Manage categories |

---

## Key Components

| Component | Description |
|-----------|-------------|
| `PrivateRoute.tsx` | Redirects to login if not authenticated |
| `ProtectedRoute.tsx` | Checks user role, blocks unauthorized access |
| `LogoutButton.tsx` | Clears token and logs the user out |
| `userService` | Fetches current user info using cookie (server-side) |
| `tutorService` | Handles tutor related API calls |

---

## Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```