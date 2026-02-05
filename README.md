# NestCare – Home Care Booking Platform

![NestCare Banner](https://via.placeholder.com/1200x400?text=NestCare+Home+Care+Platform)

> A comprehensive web application for booking reliable home care services for children, the elderly, and sick family members. Built with modern web technologies for a seamless user experience.

---

## 🚀 Overview

**NestCare** is a full-stack booking platform designed to simplify the process of finding and scheduling professional home care. Whether it's a nanny for your child, a caregiver for an elderly parent, or specialized support for a sick relative, NestCare connects users with trusted services.

This project demonstrates a robust implementation of a service marketplace, featuring dynamic pricing, real-time booking management, and a responsive interface.

---

## 🛠 Tech Stack

### Client-Side
*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: JavaScript (ES6+)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **UI Components**: [DaisyUI](https://daisyui.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **State Management**: React Hooks

### Server-Side
*   **Runtime**: Node.js
*   **Database**: [MongoDB](https://www.mongodb.com/) (Native Driver)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **API**: Next.js API Routes

---

## ✨ Key Features

### 👤 User Experience
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
*   **Service Discovery**: Browse services by category (Baby Care, Elderly Care, etc.) with detailed descriptions and featured listings.
*   **Dynamic Booking System**: 
    *   Select custom durations (hours/days).
    *   Real-time cost calculation based on service rates.
    *   Detailed location and address input.
*   **Authentication**: Secure user registration and login (email/password & Social Auth).

### ⚙️ Dashboard & Management
*   **My Bookings**: 
    *   View all booking requests.
    *   Track status (Pending, Confirmed, Completed, Cancelled).
    *   Cancel bookings directly from the dashboard.
*   **Admin Panel** (Planned): Manage services and user bookings.

---

## 📂 Project Structure

```bash
nestcare/
├── src/
│   ├── app/
│   │   ├── api/            # API Routes (Auth, Bookings)
│   │   ├── services/       # Service Listing & Details
│   │   ├── booking/        # Booking Process
│   │   ├── my-bookings/    # User Dashboard
│   │   └── ...
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── home/           # Homepage Sections
│   │   └── booking/        # Booking Forms & UI
│   ├── lib/
│   │   └── dbConnect.js    # Database Connection
│   └── ...
├── public/                 # Static Assets
└── package.json            # Dependencies & Scripts
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher recommended)
*   MongoDB Instance (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/nestcare.git
    cd nestcare
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env.local` file in the root directory and add the following:

    ```env
    # Database
    MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/nestcare?retryWrites=true&w=majority
    MONGODB_DB=nestcare

    # Authentication
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_super_secret_key

    # OAuth (Optional)
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📝 License

This project is created for educational and portfolio purposes. All rights reserved by the creator.

---

*Made with ❤️ by [Arafat Shalehin]*
