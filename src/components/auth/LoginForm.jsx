// src/components/auth/LoginForm.jsx
"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const callbackUrl =
    searchParams.get("callbackUrl") || searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // If already logged in, redirect away from /login
  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (result?.error) {
        setErrorMsg("Invalid email or password.");
        setIsSubmitting(false);
        return;
      }

      // On success, result.url holds the callbackUrl
      router.push(result?.url || callbackUrl);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Login failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    await signIn("google", {
      callbackUrl,
    });
  };

  return (
    <div className="min-h-[70vh] my-10 flex items-center justify-center bg-(--color-bg-base)">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
            Welcome back
          </p>
          <h1 className="text-xl md:text-2xl font-semibold text-(--color-text-main)">
            Log in to NestCare
          </h1>
          <p className="text-xs md:text-sm text-(--color-text-muted)">
            Access your bookings and continue arranging care for your family.
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
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-md w-full border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "Signing you in..." : "Log in"}
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
        </form>

        <p className="mt-4 text-center text-xs text-(--color-text-muted)">
          New to NestCare?{" "}
          <a
            href={`/register${
              callbackUrl && callbackUrl !== "/"
                ? `?redirect=${encodeURIComponent(callbackUrl)}`
                : ""
            }`}
            className="text-(--color-primary-600) hover:text-(--color-primary-700) font-medium"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
