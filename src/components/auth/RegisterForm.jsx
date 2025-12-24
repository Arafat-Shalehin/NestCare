// src/components/auth/RegisterForm.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

function validatePasswordClient(password) {
  const errors = [];
  if (!password || password.length < 6) {
    errors.push("At least 6 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("1 uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("1 lowercase letter");
  }
  return errors;
}

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [nid, setNid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const passErrors = validatePasswordClient(password);
    if (passErrors.length > 0) {
      setErrorMsg("Password must have: " + passErrors.join(", ") + ".");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { nid, name, email, contact, password };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Registration failed. Please try again.");
      }

      setSuccessMsg("Registration successful. Redirecting...");

      const loginResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: redirect || "/",
      });

      if (!loginResult?.error) {
        router.push(loginResult?.url || redirect || "/");
      } else {
        // fallback: just send them to login page
        router.push(
          `/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMsg(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    await signIn("google", {
      callbackUrl: redirect || "/",
    });
  };

  return (
    <div className="min-h-[70vh] my-10 flex items-center justify-center bg-(--color-bg-base)">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
            Create account
          </p>
          <h1 className="text-xl md:text-2xl font-semibold text-(--color-text-main)">
            Join NestCare
          </h1>
          <p className="text-xs md:text-sm text-(--color-text-muted)">
            Create an account to request home care services and track your
            bookings.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) px-5 py-6 md:px-6 md:py-7 space-y-4 shadow-sm"
        >
          {errorMsg && (
            <div className="rounded-lg border border-(--color-error-500)/40 bg-(--color-error-100) px-3 py-2 text-xs text-(--color-error-500) mb-2">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="rounded-lg border border-(--color-success-500)/40 bg-(--color-success-100) px-3 py-2 text-xs text-(--color-success-500) mb-2">
              {successMsg}
            </div>
          )}

          {/* NID */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-(--color-text-main)">
              NID number
            </label>
            <input
              type="text"
              value={nid}
              onChange={(e) => setNid(e.target.value)}
              className="input input-sm md:input-md w-full border-(--color-border-subtle) bg-(--color-surface) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200)"
              placeholder="Enter your national ID number"
              required
            />
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-(--color-text-main)">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-sm md:input-md w-full border-(--color-border-subtle) bg-(--color-surface) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200)"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-(--color-text-main)">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-sm md:input-md w-full border-(--color-border-subtle) bg-(--color-surface) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200)"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Contact */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-(--color-text-main)">
              Contact number
            </label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="input input-sm md:input-md w-full border-(--color-border-subtle) bg-(--color-surface) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200)"
              placeholder="e.g. 01XXXXXXXXX"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-(--color-text-main)">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-sm md:input-md w-full border-(--color-border-subtle) bg-(--color-surface) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200)"
              placeholder="Create a password"
              required
            />
            <p className="text-[11px] text-(--color-text-soft)">
              At least 6 characters, including 1 uppercase and 1 lowercase
              letter.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-md w-full border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
          
          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-(--color-border-subtle)" />
            <span className="text-[11px] text-(--color-text-soft)">OR</span>
            <div className="h-px flex-1 bg-(--color-border-subtle)" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-md w-full border border-(--color-border-subtle) bg-(--color-surface) text-(--color-text-main) hover:bg-(--color-bg-soft)"
          >
            <span className="mr-2 text-lg">
              <FcGoogle size={25} />
            </span>
            Continue with Google
          </button>

          <p className="text-[11px] text-(--color-text-soft) text-center mt-3">
            By creating an account, you agree to NestCare&apos;s terms and
            privacy policy.
          </p>
        </form>

        <p className="mt-4 text-center text-xs text-(--color-text-muted)">
          Already have an account?{" "}
          <a
            href={`/login${
              redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""
            }`}
            className="text-(--color-primary-600) hover:text-(--color-primary-700) font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
