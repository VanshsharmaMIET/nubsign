# NubSign

A polished, frontend-only signup wizard built with React + Vite. Originally built for a
frontend engineering assessment (signup wizard replication) — inspired by common mobile
signup patterns, with original branding and an original visual design.

## Description

NubSign walks a new user through account creation: a landing page, Terms & Conditions
acceptance, and a 4-step signup wizard (email → OTP verification → personal details →
additional details), ending on a success screen. Everything runs client-side — there is
no backend, no real network calls, and no real OTP delivery. All "network" behavior is
simulated with timeouts so the UI can demonstrate loading, error, and success states.

## Features

- Landing page with a clear primary CTA
- Terms & Conditions page with scrollable content and a required acceptance checkbox
- 4-step signup wizard with an animated progress indicator (Step X of 4)
- Step 1 — Email: format validation, trims whitespace, simulated "sending code" loading state
- Step 2 — OTP: 6 separate digit boxes, auto-advance, backspace-to-previous, paste-to-fill,
  numeric-only input, resend with a 30s cooldown countdown, demo code shown on screen
- Step 3 — Personal details: full name, age (18+ enforced), pronoun selector
- Step 4 — Additional details: state → city dependent dropdowns, college/institution,
  optional 10-digit phone number
- Success page with an animated checkmark
- Full backward navigation at every step, with all previously entered data preserved
- Field-level validation with contextual error messages (on blur and on submit)
- Toast notifications for key events (OTP verified, code resent)
- Reusable loading spinner baked into every async button
- Fully responsive: 360px phones up to desktop, centered card layout
- Keyboard accessible: labeled fields, visible focus states, numeric input modes, ARIA
  attributes on errors and live regions

## Tech stack

- React 18
- Vite 5
- Plain CSS (custom properties for theming, no CSS framework)
- No backend, no external API calls, no additional runtime dependencies

## Installation

```bash
npm install
```

## Running

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Demo OTP

The verification step accepts one fixed code for demo purposes:

```
123456
```

Any other 6-digit code shows: "Invalid verification code. Please try again."

## Project structure

```
src/
  components/       Reusable UI pieces (Button, Input, Select, OtpInput,
                     PronounSelect, ProgressIndicator, Toast, LoadingSpinner)
  context/           ToastContext — global toast notification state
  data/              locations.js — state → city map, pronoun options
  utils/             validation.js — all field validation logic
  pages/
    LandingPage.jsx
    TermsPage.jsx
    SignupWizard.jsx      wizard shell: header, progress bar, step routing
    SuccessPage.jsx
    steps/
      EmailStep.jsx
      OtpStep.jsx
      PersonalDetailsStep.jsx
      AdditionalDetailsStep.jsx
  App.jsx             top-level screen routing + centralized form state
  main.jsx            React entry point
```

## Validation behavior

- **Email** — required, valid format, whitespace trimmed, length-limited
- **OTP** — must be 6 numeric digits and match the demo code `123456`
- **Full name** — required, 2–50 characters, letters/spaces/hyphens/apostrophes only
- **Age** — required, whole number, must be 18 or older
- **Pronouns** — required selection
- **State** — required
- **City** — required, and only selectable once a state is chosen; resets whenever the
  state changes so an invalid city can never be submitted
- **College/Institution** — required, whitespace trimmed
- **Phone** — optional; if provided, must be exactly 10 digits

Form state is centralized in `App.jsx` and passed down, so navigating backward through
the wizard never loses anything the user has already typed.

## Responsive behavior

- Mobile-first layout; the signup card becomes nearly full-width below ~560px
- Landing page splits into a two-column layout on wider screens (≥900px) and stacks on
  mobile
- No horizontal scrolling at any tested width (360px, 390px, 414px, tablet, desktop)
- Buttons are full-width and easy to tap on small screens
- OTP boxes shrink gracefully on very small screens (≤380px)
