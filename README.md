# 🇦🇫 KaarYab Afghanistan

> **Opportunity Finder Platform for Afghan Youth**

A modern full-stack web application that connects Afghan youth with
jobs, scholarships, internships, remote work, training programs,
volunteer opportunities, and skill-building resources across
Afghanistan.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind
CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=flat-square&logo=clerk)](https://clerk.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-172_Passing-success?style=flat-square)](https://github.com/Somaiyanoori/kaaryab-afghanistan)

---

## Live Demo

> ### **[Visit KaarYab Afghanistan →](https://kaaryab-afghanistan-seven.vercel.app/)**

Try it now! Sign up with your email to explore all features.

---

## Overview

**KaarYab Afghanistan** is designed to make educational and career
opportunities more accessible for Afghan youth. The platform allows
users to discover opportunities, manage their applications, and create
professional CVs within a modern and responsive web interface.

### Problem It Solves

In Afghanistan, opportunities for education, employment, and skill
development are often scattered across multiple platforms in different
languages. Many young Afghans miss valuable chances simply because they
don't know where to look. KaarYab centralizes all these opportunities in
one beautiful, accessible platform.

### Target Users

- Afghan youth searching for jobs and internships
- Students looking for scholarships
- Professionals seeking remote work
- Organizations posting opportunities
- Anyone wanting to build a professional CV

---

## Features

### Authentication

- Secure authentication using **Clerk**
- Email/password registration and login
- Protected routes for authenticated users
- User profile management with avatar
- Theme-aware authentication pages
- Session management

### Opportunities Management

- Browse **7 categories** of opportunities:
  - Jobs
  - Scholarships
  - Internships
  - Remote Work
  - Online Courses
  - Training Programs
  - Volunteer Opportunities
- Advanced search with real-time results
- Filter by:
  - Category
  - Location (all Afghan provinces + Online)
  - Work type (Remote / On-site / Hybrid)
  - Deadline (This week / This month / Next 3 months)
- Sort by newest, oldest, deadline, or popularity
- Save favorite opportunities (synced across devices)
- Live deadline countdown timer
- Grid and List view modes

### Dashboard

- Personal analytics dashboard
- Real-time opportunity statistics
- Interactive charts (Recharts)
- Recent submissions timeline
- "Expiring Soon" alerts
- Manage your posted opportunities
- Edit and delete with confirmation

### CV Builder

- **4 professional templates**:
  - Modern (two-column with blue accents)
  - Classic (traditional serif)
  - Minimal (elegant with yellow accents)
  - Professional (dark sidebar)
- Live preview as you type
- Comprehensive sections:
  - Personal Information
  - Work Experience
  - Education
  - Skills (with levels)
  - Languages (with proficiency)
  - Projects
  - Certifications
- Sample data for quick start
- **Download as PDF** with one click
- Mobile-friendly with tab switching

### User Experience

- Fully responsive design (Mobile / Tablet / Desktop)
- Dark mode and Light mode
- Smooth animations with Framer Motion
- Loading skeletons for better UX
- Empty states with helpful messages
- Comprehensive error handling
- WCAG accessible interface
- Toast notifications for feedback

---

## Tech Stack

### Frontend

Category Technology

---

**Framework** Next.js 14 (App Router)
**UI Library** React 19
**Language** JavaScript
**Styling** Tailwind CSS 3
**Animations** Framer Motion
**Icons** Lucide React, React Icons
**Charts** Recharts

### Backend & Database

Category Technology

---

**Database** Supabase (PostgreSQL)
**Authentication** Clerk
**API** Supabase Client

### Development Tools

Category Technology

---

**State Management** Zustand
**Forms** React Hook Form + Zod
**PDF Generation** jsPDF + html2canvas
**Testing** Vitest, Playwright
**Deployment** Vercel

---

## Screenshots

### Home Page

![Home Page](./public/screenshots/home.png)

### Opportunities Page

![Opportunities Page](./public/screenshots/opportunity.png)

### Dashboard

![Dashboard](./public/screenshots/dashboard.png)

### CV Builder

![CV Builder](./public/screenshots/cv-builder.png)

### Sign In

![Sign In](./public/screenshots/sign-in.png)

### Create Account

![Create Account](./public/screenshots/account.png)

### Saved Opportunities

![Saved Opportunities](./public/screenshots/saved.png)

### Opportunity Details

![Opportunity Details](./public/screenshots/details-opportunity.png)

### ℹ About Us

![About Us](./public/screenshots/about-us.png)

### Contact

![Contact](./public/screenshots/contact.png)

---

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- **Node.js** 18 or later
- **npm** or **Yarn**
- A **Clerk** account (free) --- [Sign up](https://clerk.com/)
- A **Supabase** account (free) --- [Sign up](https://supabase.com/)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Somaiyanoori/kaaryab-afghanistan.git
cd kaaryab-afghanistan

2. Install dependencies

npm install

3. Set up environment variables

Create a .env.local file in the project root:

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

 See .env.example for a template.

4. Set up Supabase database

Run the SQL schema in Supabase SQL Editor:

Go to your Supabase project dashboard

Click SQL Editor in the sidebar

Click New query

Copy content from supabase/schema.sql

Paste and click Run

Verify tables in Table Editor

5. Seed the database (optional)

Import sample opportunities to test the app:

npm run seed

This will add 12 sample opportunities to your database.

6. Run the development server

npm run dev

Visit: http://localhost:3000

 Testing

The project includes 172+ passing tests covering unit, component, and E2E scenarios.

Run unit and component tests

npm run test:run

Run tests in UI mode

npm run test:ui

Run end-to-end tests

npm run test:e2e

Test Coverage

Type

Count

Status

Unit Tests

84

✅ All Passing

Component Tests

70

✅ All Passing

E2E Tests

18

✅ All Passing

Total

172

✅ 100% Pass Rate


 Design System

Color Palette

Primary: Yellow (#EAB308) — Energy, Opportunity, Hope

Secondary: Blue (#2563EB) — Trust, Professional, Knowledge

Success: Green (#22C55E) — Available, Remote, Success

Danger: Red (#EF4444) — Urgent, Deadlines

Typography

Sans: Plus Jakarta Sans (body text)

Display: Sora (headings)

Arabic: Noto Naskh Arabic (RTL support)

Category Colors

Category

Color

Job

Blue

Internship

Teal

Scholarship

Purple

Online Course

Indigo

Remote Work

Green

Training

Amber

Volunteer

Pink

 Security

This project includes:

 Clerk authentication with session management

 Supabase Row Level Security (RLS) on all tables

  Protected routes via middleware

 Environment variables for secrets

 SQL injection protection through Supabase client

 XSS protection through React's built-in escaping

 CSRF protection via Next.js

 Deployment

The application is deployed on Vercel with automatic deployment from the main branch.

Live Demo: https://kaaryab-afghanistan-seven.vercel.app/

 Roadmap

 Completed

User authentication

CRUD operations for opportunities

Advanced search and filtering

Save favorites (synced)

CV Builder with PDF export

Dashboard with analytics

Dark mode

Responsive design

172+ tests

 Planned
Multi-language support (Dari and Pashto)

Email notifications for deadlines

Admin dashboard

Role-based permissions

Real-time updates with Supabase

Application tracking

User ratings and reviews

AI-powered recommendations

Mobile application (React Native)

 Contributing

Contributions, issues, and feature requests are welcome!

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request


 Author

Somaiya Noori

 GitHub: @Somaiyanoori

 LinkedIn: Somaiya Noori

🇦🇫 Location: Afghanistan

 Available for opportunities

 Acknowledgments

Built with love for Afghan youth 🇦🇫

Inspired by the need for accessible opportunities in Afghanistan

Icons provided by Lucide

Design inspired by modern SaaS applications

Thanks to the open-source community

 License

This project is licensed under the MIT License.

It is free to use for educational, learning, and portfolio purposes.

See LICENSE file for details.

 Demo Notice

This application uses demo data for educational and portfolio purposes. Some opportunities displayed may be fictional or sample records. All authentication and data storage is fully functional and production-ready.

<div align="center">

 If you find this project helpful, please give it a star!

Made with ❤️ in Afghanistan for Afghan Youth

⬆ Back to Top

</div>
```
