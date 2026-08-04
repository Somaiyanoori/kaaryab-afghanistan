# KaarYab Afghanistan

> Opportunity Finder Platform for Afghan Youth

A modern full-stack web application that connects Afghan youth with jobs, scholarships, internships, remote work opportunities, training programs, volunteer opportunities, and skill-building resources across Afghanistan.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=flat-square&logo=clerk)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)

---

## Overview

KaarYab Afghanistan is designed to make educational and career opportunities more accessible for Afghan youth. The platform allows users to discover opportunities, manage their applications, and create professional CVs within a modern and responsive web interface.

---

## Features

### Authentication

- Secure authentication using Clerk
- User registration and login
- Protected routes
- User profile management
- Theme-aware authentication pages

### Opportunities

- Browse jobs
- Scholarships
- Internships
- Remote opportunities
- Courses and training
- Volunteer opportunities
- Search by keyword
- Filter by category
- Filter by location
- Filter by work type
- Sort by newest
- Sort by deadline
- Save favorite opportunities
- Deadline countdown timer

### Dashboard

- Personal dashboard
- Opportunity statistics
- Analytics charts
- Recent activity
- Expiring opportunities

### CV Builder

- Four professional templates
- Live preview
- PDF export
- Sample data
- Sections for:
  - Personal Information
  - Experience
  - Education
  - Skills
  - Languages
  - Projects
  - Certifications

### User Experience

- Responsive design
- Dark mode
- Light mode
- Framer Motion animations
- Loading skeletons
- Empty states
- Error handling
- Accessible interface

---

## Tech Stack

| Category         | Technology                |
| ---------------- | ------------------------- |
| Framework        | Next.js 14 (App Router)   |
| UI Library       | React 19                  |
| Language         | JavaScript                |
| Styling          | Tailwind CSS              |
| Database         | Supabase (PostgreSQL)     |
| Authentication   | Clerk                     |
| State Management | Zustand                   |
| Forms            | React Hook Form + Zod     |
| Animations       | Framer Motion             |
| Charts           | Recharts                  |
| PDF Generation   | jsPDF + html2canvas       |
| Icons            | Lucide React, React Icons |
| Testing          | Vitest, Playwright        |
| Deployment       | Vercel                    |

---

## Screenshots

### Home Page

```text
public/screenshots/home.png
```

### Opportunities Page

```text
public/screenshots/opportunities.png
```

### Dashboard

```text
public/screenshots/dashboard.png
```

### CV Builder

```text
public/screenshots/cv-builder.png
```

## Sign-in

```text
public/screenshots/sign-in.png
```

## Saved

```text
public/screenshots/saved.png
```

## Details opportunity

```text
public/screenshots/details-opportunity.png

```

## About us

```text
public/screenshots/about-us.png
```

## Create Account

```text
public/screenshots/account.png
```

## Contact

```text
public/screenshots/contact.png
```

---

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js 18 or later
- npm or Yarn
- A Clerk account
- A Supabase account

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Somaiyanoori/kaaryab-afghanistan.git

cd kaaryab-afghanistan
```

### Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env.local` file in the project root.

```env
# Clerk

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key

CLERK_SECRET_KEY=your_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

4. **Set up Supabase database**

Run the SQL schema in Supabase SQL Editor:

```bash
# The full schema is in supabase/schema.sql
```

**Steps:**

1. Go to your Supabase project dashboard
2. Click "SQL Editor" in sidebar
3. Click "New query"
4. Copy content from `supabase/schema.sql`
5. Paste and click "Run"
6. Verify tables in "Table Editor"

7. **Seed the database (optional)**

Import sample opportunities to test the app:

```bash
npm run seed
```

This will add 12 sample opportunities to your database.

Visit:

```
http://localhost:3000
```

---

## Testing

Run unit tests:

```bash
npm run test:run
```

Run tests in UI mode:

```bash
npm run test:ui
```

Run end-to-end tests:

```bash
npm run test:e2e
```

---

## Security

This project includes:

- Clerk authentication
- Supabase Row Level Security (RLS)
- Protected routes
- Environment variables for secrets
- SQL injection protection through Supabase
- XSS protection through React

---

## Deployment

The application is deployed on Vercel with automatic deployment from the `main` branch.

**Live Demo**

```
[https://kaaryab-afghanistan.vercel.app](https://kaaryab-afghanistan-seven.vercel.app/)
```

---

## Future Improvements

- Multi-language support (Dari and Pashto)
- Email notifications
- Admin dashboard
- Role-based permissions
- Real-time updates with Supabase
- Mobile application
- AI-powered recommendations
- Application tracking
- User ratings and reviews

---

## Author

**Somaiya Noori**

GitHub

```
[https://github.com/Somaiyanoori](https://github.com/Somaiyanoori)
```

LinkedIn

```
[https://linkedin.com/in/somaiya-noori](https://www.linkedin.com/in/somaiya-noori-aa7b50346?utm_source=share_via&utm_content=profile&utm_medium=member_ios)
```

---

## License

This project is licensed under the MIT License.

It is free to use for educational, learning, and portfolio purposes.

---

## Acknowledgments

- Built to support Afghan youth in discovering educational and career opportunities.
- Icons provided by Lucide.
- Inspired by modern SaaS application design.

---

## Demo Notice

This application uses demo data for educational and portfolio purposes.

Some opportunities displayed may be fictional or sample records.
