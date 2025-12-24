# NestCare – Home Care Booking Platform

NestCare is a web application for booking reliable home care services for children, elderly, and sick family members.  
Users can explore services, view detailed information, and submit booking requests with clear duration, location, and pricing.

> Tech stack: **Next.js (App Router) + Tailwind CSS + DaisyUI + MongoDB (native driver)**

---

## ✨ Key Features

### Public-facing

- **Responsive UI**

  - Fully responsive layout (mobile, tablet, desktop)
  - Consistent design with custom color palette and typography

- **Homepage**

  - Hero section with clear call-to-action
  - About / mission section
  - Services overview (Baby Care, Elderly Care, Sick People Care)
  - Testimonials section with marquee animation

- **Services**
  - `/services`
    - Lists all active services from MongoDB
    - Each card shows:
      - Icon, name, label
      - Short tagline
      - Features (e.g. “Flexible hourly bookings”)
      - Starting price (from `pricing.baseRate`)
  - `/services/[slug]`
    - Detailed page for a single service (e.g. `/services/baby-care`)
    - Information includes:
      - Service name, label, icon
      - Tagline / overview
      - Features list
      - Pricing info (`unit`, `baseRate`, `currency`)
      - Booking steps explanation
    - Sticky booking summary card with:
      - Starting price
      - Duration-based pricing explanation
      - CTA: “Book this service” → `/booking/[slug]`

### Booking Flow

- **Booking Page**
  - `/booking/[slug]`
  - Uses service data from MongoDB based on `slug`
  - Step-by-step form:
    1. Select duration:
       - Duration value (e.g. 4, 8, 24)
       - Duration unit: `hours` or `days`
       - Automatic per-unit rate adjustment based on service `pricing.unit`
    2. Add location:
       - Division (select)
       - District
       - City
       - Area
       - Full address
    3. Review summary:
       - Service name
       - Duration and unit
       - Per-unit rate
       - Estimated total (duration × rate)
  - On submit:
    - Calls `POST /api/bookings`
    - Server re-calculates total cost and creates a booking with status `PENDING`
    - Redirects to **My Bookings** (currently without auth, later will be per-user)

### Bookings Management

- **My Bookings**
  - `/my-bookings`
  - Displays all bookings (later: filtered per authenticated user)
  - Overview cards:
    - Total bookings
    - Pending / Confirmed / Completed counts
  - Table view:
    - Service name
    - Created date/time
    - Duration & per-unit rate
    - Location summary
    - Total cost
    - Status (Pending, Confirmed, Completed, Cancelled)
    - Actions:
      - **View** – opens a modal with full booking details
      - **Cancel** – sets status to `CANCELLED` via `PATCH /api/bookings/[id]`
  - Uses server-side data fetching and `router.refresh()` to update UI after changes

### Other Pages & UX

- **Standalone About Page**

  - `/about`
  - Mission, values, how NestCare works, and process steps

- **Error & Loading States**
  - `app/error.jsx` – global error boundary with retry
  - `app/loading.jsx` – global loading state
  - `app/not-found.jsx` – custom 404 page
  - Route-level skeletons:
    - `/services` → `app/services/loading.jsx`
    - `/services/[slug]` → `app/services/[slug]/loading.jsx`
    - `/booking/[slug]` → `app/booking/[slug]/loading.jsx`

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router, `app/` directory, JS/JSX)
- **Styling:**
  - Tailwind CSS (v4-style with `@import "tailwindcss";`)
  - DaisyUI for components (`navbar`, `btn`, `modal`, `table`, etc.)
  - Custom design tokens via CSS variables (colors, etc.)
- **Database:** MongoDB with **native driver** (no Mongoose)
- **Animations:**
  - Framer Motion (for subtle section/hover animations)
  - Custom CSS keyframes for marquee and subtle float/fade transitions

> Authentication, email sending, and payments are planned but not fully implemented yet.

---

## 📁 Project Structure (important parts)

```text
src/
  app/
    layout.jsx              # Root layout (Navbar, Footer, global styles)
    page.jsx                # Homepage
    error.jsx               # Global error boundary
    loading.jsx             # Global loading state
    not-found.jsx           # Custom 404 page

    about/
      page.jsx              # About NestCare page

    services/
      page.jsx              # Services list page
      loading.jsx           # Skeleton for services list
      [slug]/
        page.jsx            # Service detail page (by slug)
        loading.jsx         # Skeleton for service detail

    booking/
      [slug]/
        page.jsx            # Booking page (by service slug)
        loading.jsx         # Booking skeleton

    my-bookings/
      page.jsx              # My Bookings page (bookings list & actions)

    api/
      bookings/
        route.js            # POST: create booking, GET: list bookings
      bookings/
        [id]/
          route.js          # PATCH: update booking status, GET: single booking

  components/
    layout/
      Navbar.jsx
      Footer.jsx

    home/
      HeroSection.jsx
      AboutSection.jsx
      ServicesOverview.jsx
      TestimonialsSection.jsx

    booking/
      BookingForm.jsx
      BookingDetailsButton.jsx
      CancelBookingButton.jsx

  lib/
    dbConnect.js            # MongoDB client + dbConnect(collectionName)
    services.js             # getServices, getServiceBySlug, etc.
    bookings.js             # getBookingsForUser, etc.
    mongodb.js (optional)   # if you have a generic clientPromise here

  app/globals.css           # Tailwind + DaisyUI theme + CSS variables
  ...

⚙️ Environment Variables
Create a .env.local file in the project root:

- MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
- MONGODB_DB=nestcare
Later (for auth, email, payments) you may add:

- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=your-secret

# Google OAuth
- GOOGLE_CLIENT_ID=...
- GOOGLE_CLIENT_SECRET=...

# Email provider (Resend, SMTP, etc.)
- RESEND_API_KEY=...

🚀 Getting Started: 

1. Install dependencies:
- npm install

If not already installed:

- npm install framer-motion daisyui mongodb
- Tailwind and Next are installed by create-next-app.

2. Configure Tailwind & DaisyUI:
Tailwind v4-style globals.css (already set up in this project) should start with:

CSS

@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default;
}
@plugin "daisyui/theme" {
  name: "light";
  default: true;

  /* Custom color variables here... */
}
Plus your color CSS variables and base styles.

3. Run the dev server:

- npm run dev
```
