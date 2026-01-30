# Clarity — Premium Mortgage Intelligence

Clarity is a modern, trust-first financial tool designed to provide homeowners with absolute clarity on their mortgage refinancing opportunities. It features a cinematic, storytelling-driven homepage and a focused, high-conversion signup experience.

## ✨ Key Features

### 1. Storytelling Homepage (`/`)
*   **Cinematic Pinned Scroll**: Sections are pinned to the viewport, creating a guided narrative flow as the user scrolls.
*   **3D Rate Visualization**: A persistent React Three Fiber (Three.js) element that updates in real-time as the user explores the story (Interest Rate and Estimated Payments).
*   **Dynamic Backgrounds**: Subtle radial gradient shifts (Indigo → Rose → Green) to reflect the emotional tone of the financial journey.
*   **Smooth Motion**: Powered by GSAP and ScrollTrigger for institutional-grade performance.

### 2. Modern Conversion Page (`/signup`)
*   **Target Rate Selector**: An interactive slider (0.125% increments) for users to set their alert threshold.
*   **Lead Capture Form**: Securely collects borrower details (Email, ZIP, Current Rate, Balance, Home Type).
*   **Instant Success State**: Immediate feedback with clear next steps after successful submission.
*   **Supabase Integrated**: Real-time storage of leads in a professional-grade PostgreSQL database.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 15+ (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS 4
*   **Animation**: GSAP + ScrollTrigger, Framer Motion
*   **3D Visuals**: React Three Fiber, Three.js, Drei
*   **Database**: Supabase (PostgreSQL)
*   **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js 18.20.4 or higher
*   npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup (Supabase)
Run the following SQL in the Supabase SQL Editor:
```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  zip text not null,
  target_rate float8 not null,
  current_rate float8,
  balance_range text,
  home_type text,
  consent boolean not null default false
);

alter table leads enable row level security;

create policy "Allow public inserts"
on leads for insert
to anon
with check (true);
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🌍 Deployment to Vercel

1.  Push your code to a **GitHub** repository.
2.  Connect the repository to **Vercel**.
3.  Add the **Environment Variables** (from `.env.local`) in the Vercel Project Settings.
4.  Deploy.

---

## 📝 Customization Guide

### Editing Copy & Content
*   **Homepage**: Edit `app/page.tsx` for all storytelling text and sections.
*   **Signup**: Edit `app/signup/page.tsx` for form labels, helper text, and success messages.
*   **Global Elements**: Update `components/sections/navbar.tsx` and `footer.tsx`.

### Controlling Animations
*   **GSAP Logic**: Scoping and timelines are defined in the `useGSAP` hook within `app/page.tsx`.
*   **Transition Speeds**: Adjusted via the `scrub` value (currently `1` for smoothness).

### 3D Settings & Performance
*   **3D Component**: Located in `components/motion/rate-viz.tsx`.
*   **Performance Knobs**:
    *   `dpr={[1, 1.5]}`: Limits resolution on high-density screens.
    *   `ssr: false`: Ensures the 3D canvas only loads on the client.
    *   `Float`: Control the speed and intensity of the card's movement.

---

## 🔍 Troubleshooting
*   **3D not displaying**: Ensure `ssr: false` is used when importing `RateViz`. Verify WebGL is enabled in your browser.
*   **Scroll pinning issues**: Check that no parent elements have `overflow: hidden` or `scroll-snap-type` which might conflict with GSAP's pinning.
*   **Supabase Errors**: Verify credentials in `.env.local` and ensure RLS policies allow anonymous inserts.
