# 🏥 NestCare – Next-Gen Home Care Platform

![NestCare Banner](/HomePage.png)

> **A state-of-the-art solution for booking and managing professional home care services.**  
> NestCare bridges the gap between families and caregivers using **AI-driven recommendations**, **real-time location tracking**, and **collaborative care timelines**.

---

## 🚀 Innovation Highlights

This project goes beyond standard e-commerce features to demonstrate advanced software engineering capabilities:

### 🤖 AI Care Match

- **Tech**: OpenAI API, Prompt Engineering, JSON Mode.
- **Function**: A conversational wizard that analyzes user needs (patient age, condition, schedule) and recommends the _exact_ best service package using LLM logic.
- **Why it matters**: Replaces static search with intelligent, context-aware decision support.

### 📍 Live Care Network Map

- **Tech**: Leaflet.js, React-Leaflet, Geospatial Data.
- **Function**: A real-time interactive map showing active caregivers in the vicinity. Features smooth "FlyTo" animations, auto-complete search for service areas (e.g., Banani, Gulshan), and glassmorphic UI overlays.
- **Why it matters**: Demonstrates mastery of interactive frontend libraries and geospatial visualization.

### 📅 Shared Care Timeline (SaaS Architecture)

- **Tech**: MongoDB Aggregations, Complex Data Modeling.
- **Function**: A live activity feed where families and caregivers collaborate.
  - **Dual-Role Simulation**: Toggle between "Family View" and "Caregiver View" to see real-time updates (e.g., "Medication Given," "Lunch Served").
- **Why it matters**: showcases ability to build complex, multi-user SaaS workflows with refined UX.

### 🛡️ Enterprise-Grade Admin Dashboard

- **Tech**: Next.js Server Actions, Role-Based Access Control (RBAC).
- **Function**: A secure command center for administrators.
  - **Overview Stats**: Real-time revenue and user growth charts.
  - **Booking Management**: Verify or cancel bookings with one click.
  - **Service Inventory**: Full CRUD system with meaningful pricing controls.
  - **User Authority**: Promote users to Admin or Caregiver roles securely.

---

## ✨ Core Features

- **Premium Service Discovery**: Modern, card-based UI displaying service slugs, care types, and dynamic pricing (৳/hr or ৳/day).
- **Smart Booking System**: comprehensive form capturing duration, location, and contact details (Name, Email, Phone) with automatic cost estimation.
- **Secure Authentication**: NextAuth.js integration for secure Email/Password and Social Login.
- **Responsive Design**: Mobile-first architecture using Tailwind CSS v4 and DaisyUI.

---

## 🛠 Technology Stack

### Frontend Strategy

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI 5](https://daisyui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Scroll reveal & micro-interactions)
- **Maps**: [Leaflet](https://leafletjs.com/) & React-Leaflet
- **Notifications**: [SweetAlert2](https://sweetalert2.github.io/)

### Backend Strategy

- **Database**: [MongoDB](https://www.mongodb.com/) (Native Driver for maximum control)
- **AI Engine**: [OpenAI API](https://openai.com/) (GPT-4o / GPT-3.5-turbo)
- **Auth**: [NextAuth.js v4](https://next-auth.js.org/)

---

## 📂 Project Structure

```bash
nestcare/
├── src/
│   ├── app/
│   │   ├── admin/          # 🛡️ Protected Admin Dashboard routes
│   │   ├── api/            # Server-side API endpoints
│   │   ├── live-map/       # 📍 Leaflet Map implementation
│   │   ├── find-match/     # 🤖 AI Wizard logic
│   │   ├── services/       # Service listing & Dynamic details
│   │   └── my-bookings/    # User Dashboard & Shared Timeline
│   ├── actions/            # Server Actions (Data mutations)
│   ├── components/         # Reusable UI Architecture
│   └── lib/                # Database & Auth utilities
├── public/                 # Static Assets
└── package.json            # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB URI (Local or Atlas)
- OpenAI API Key (Optional, for AI Match feature)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/nestcare.git
    cd nestcare
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file:

    ```env
    # Database
    MONGODB_URI=your_mongodb_connection_string
    MONGODB_DB=nestcare

    # Auth
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_auth_secret

    # AI (Optional)
    OPENAI_API_KEY=your_openai_key
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to see the app in action.

---

## 🔮 Future Roadmap

- **Biometric Clock-In**: WebCam-based verification for caregivers upon arrival.
- **AI Voice Reports**: Converting caregiver voice notes into medical summaries for families.
- **Payment Gateway**: SSLCommerz / Stripe integration for secure checkout.

---

## 🤝 Contributing / Contact

This project is a portfolio highlight by **Arafat Shalehin**.

- **LinkedIn**: [https://www.linkedin.com/in/md-arafat-shalehin/](https://www.linkedin.com/in/md-arafat-shalehin/)
- **Email**: [md.arafatshalehin@gmail.com](md.arafatshalehin@gmail.com)

---

_© 2026 NestCare. Built for excellence._
