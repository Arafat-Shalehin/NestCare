// src/app/register/page.jsx
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register – NestCare",
  description:
    "Create a NestCare account to book baby care, elderly care, and sick care services at home.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}