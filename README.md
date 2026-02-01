# Clarity - Intelligent Mortgage Monitoring

A premium Next.js application for automated mortgage rate monitoring and refinancing alerts.

## 🚀 Live Demo

[View Live Demo](#) *(Add your Netlify URL here after deployment)*

## ✨ Features

- **24/7 Rate Surveillance**: Automated monitoring of mortgage rates
- **Real-time Alerts**: Get notified when rates hit your target threshold
- **Premium UI/UX**: Luxury fintech aesthetic with smooth animations
- **Supabase Authentication**: Secure user signup and signin
- **Responsive Design**: Optimized for all devices
- **Advanced Animations**: GSAP ScrollTrigger and Lenis smooth scrolling

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Supabase Auth
- **Animations**: GSAP, Framer Motion, Lenis
- **3D Graphics**: Three.js, React Three Fiber
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ratedropalert/larity-mortgage-intelligence.git
   cd larity-mortgage-intelligence
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌐 Deploy to Netlify

### Option 1: One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Ratedropalert/larity-mortgage-intelligence)

### Option 2: Manual Deploy

1. **Push to GitHub** (already done)

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select this repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
     - **Framework**: Next.js

3. **Add Environment Variables**
   In Netlify dashboard → Site settings → Environment variables, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy**
   Click "Deploy site" and wait for the build to complete

## 🔐 Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings → API
3. Enable Email authentication in Authentication → Providers
4. (Optional) Set up email templates for confirmation emails

## 📁 Project Structure

```
├── app/
│   ├── page.tsx           # Homepage
│   ├── signup/            # Signup page
│   ├── signin/            # Signin page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── sections/          # Page sections
│   │   ├── hero-section.tsx
│   │   ├── pinned-story.tsx
│   │   ├── trust-strip.tsx
│   │   ├── final-cta.tsx
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── motion/            # Animation components
│       ├── fade-in.tsx
│       └── rate-viz.tsx
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🎨 Design Features

- **Luxury Fintech Aesthetic**: Dark theme with high-contrast typography
- **Smooth Scrolling**: Lenis-powered smooth scroll experience
- **Scroll Animations**: GSAP ScrollTrigger for engaging storytelling
- **3D Visualizations**: Three.js rate visualization cards
- **Micro-interactions**: Subtle hover effects and transitions
- **Premium Typography**: Inter font with precise spacing

## 🔧 Configuration

### Tailwind CSS 4

This project uses Tailwind CSS 4 with custom theme configuration in `app/globals.css`:

```css
@theme {
  --color-brand-bg: #F9FAFB;
  --color-brand-text: #111827;
  --color-brand-muted: #4B5563;
  --color-brand-accent: #0D9488;
  --color-brand-border: #E5E7EB;
}
```

### Animation Libraries

- **GSAP**: For scroll-triggered animations
- **Framer Motion**: For page transitions and micro-interactions
- **Lenis**: For smooth scrolling

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🐛 Known Issues & Fixes

All major issues have been resolved:
- ✅ Supabase client SSR compatibility
- ✅ GSAP ScrollTrigger client-side rendering
- ✅ Lenis smooth scroll initialization
- ✅ Password field styling
- ✅ Form validation and error handling

## 📄 License

This project is private and proprietary.

## 🤝 Support

For questions or issues, please contact the development team.

---

**Built with ❤️ using Next.js and Supabase**
