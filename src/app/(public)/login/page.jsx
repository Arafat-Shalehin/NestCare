// src/app/login/page.jsx
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login – NestCare",
  description:
    "Log in to NestCare to manage your bookings and request home care services.",
};

export default function LoginPage() {
  return <LoginForm />;
}
