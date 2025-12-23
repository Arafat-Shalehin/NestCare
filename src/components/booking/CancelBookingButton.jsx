"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function CancelBookingButton({ bookingId, disabled }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCancel = async () => {
    if (!bookingId) return;
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to cancel booking");
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Cancel booking error:", error);
      alert(
        error.message ||
          "Something went wrong while cancelling the booking. Please try again."
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={disabled || isPending}
      className="btn btn-xs border-none bg-(--color-error-100) text-(--color-error-500) hover:bg-(--color-error-500) hover:text-(--color-text-invert) disabled:opacity-60"
    >
      {isPending ? "Cancelling..." : "Cancel"}
    </button>
  );
}
