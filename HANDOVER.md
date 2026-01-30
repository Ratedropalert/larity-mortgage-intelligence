# Handover Checklist & Verification

This document outlines the final steps and verification points to ensure a successful project launch.

## 🛠️ Final Setup Checklist

- [ ] **Supabase Credentials**: Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correctly mapped in production.
- [ ] **RLS Policies**: Confirm the "Allow public inserts" policy is active in the Supabase Dashboard.
- [ ] **Domain Setup**: (If deploying to Vercel) Ensure the custom domain is connected and SSL is active.

## 🧪 Smoke Test List (Pre-Handover)

### 1. Visual & Interactive
- [ ] **GSAP Pinning**: Does the story area pin correctly as you scroll?
- [ ] **3D Integration**: Do the rate and payment numbers update smoothly during the scroll?
- [ ] **Theme Transitions**: Does the background gradient shift between sections (Slate/Indigo/Green)?
- [ ] **Navbar Transparency**: Does the glassmorphism blur activate on scroll?

### 2. Functional
- [ ] **Navigation**: Do links from Home → Signup and Signup → Home work correctly?
- [ ] **Signup Form**: 
    - [ ] Target rate slider works.
    - [ ] Validation prevents submission without email/zip/consent.
    - [ ] Error messages display on failed attempts.
- [ ] **Data Flow**: Does a test submission appear in the Supabase "leads" table?

### 3. Responsive
- [ ] **Mobile Experience**: Verify the storytelling sections stack correctly and the 3D canvas is centered.
- [ ] **Tablet Support**: Ensure the dual-column signup layout adapts gracefully.

---

## ✅ Client Verification Recommended

Please verify the following to sign off on the implementation:

1.  **Brand Tone**: Ensure all refined copy ("Clarity," "Quiet Confidence") aligns with your vision.
2.  **Alert Thresholds**: Confirm the 2.5% - 9.5% range on the signup slider meets your business needs.
3.  **Data Capture**: Verify that all fields (Home Type, Loan Balance, etc.) are being correctly recorded in your storage.
4.  **Performance**: Check that the 3D visuals feel "fast and light" on entry-level mobile devices.
