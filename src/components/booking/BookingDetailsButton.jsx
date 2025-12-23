"use client";

import { useRef } from "react";

function formatCurrency(amount, currency) {
  if (amount == null || isNaN(amount)) return "-";
  const symbol = currency === "BDT" ? "৳" : currency || "";
  return `${symbol} ${Number(amount).toLocaleString("en-BD")}`;
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  return date.toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getStatusConfig(status) {
  switch (status) {
    case "CONFIRMED":
      return {
        label: "Confirmed",
        badgeBg: "bg-(--color-primary-50)",
        badgeText: "text-(--color-primary-600)",
      };
    case "COMPLETED":
      return {
        label: "Completed",
        badgeBg: "bg-(--color-success-100)",
        badgeText: "text-(--color-success-500)",
      };
    case "CANCELLED":
      return {
        label: "Cancelled",
        badgeBg: "bg-(--color-error-100)",
        badgeText: "text-(--color-error-500)",
      };
    case "PENDING":
    default:
      return {
        label: "Pending",
        badgeBg: "bg-(--color-warning-100)",
        badgeText: "text-(--color-warning-500)",
      };
  }
}

export default function BookingDetailsButton({ booking }) {
  const dialogRef = useRef(null);

  const open = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const close = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const statusConfig = getStatusConfig(booking.status);
  const location = booking.location || {};
  const locationLine = [
    location.city,
    location.area,
    location.district,
    location.division,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="btn btn-xs btn-ghost text-(--color-text-muted) hover:bg-(--color-bg-soft)"
      >
        View
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-md bg-(--color-surface) border border-(--color-border-subtle)">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="space-y-1">
              <p className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
                Booking details
              </p>
              <h3 className="text-left text-sm md:text-base font-semibold text-(--color-text-main)">
                {booking.serviceName || "Service"}
              </h3>
              <p className="text-[11px] text-(--color-text-soft)">
                Created at {formatDateTime(booking.createdAt)}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="btn btn-xs btn-ghost text-(--color-text-soft) hover:bg-(--color-bg-soft)"
            >
              ✕
            </button>
          </div>

          {/* Status + total */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${statusConfig.badgeBg} ${statusConfig.badgeText}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-(--color-border-strong)" />
              {statusConfig.label}
            </span>
            <div className="text-right">
              <p className="text-[11px] text-(--color-text-soft)">
                Estimated total
              </p>
              <p className="text-base font-semibold text-(--color-primary-600)">
                {formatCurrency(booking.totalCost, booking.currency)}
              </p>
            </div>
          </div>

          {/* Main info */}
          <div className="space-y-4 text-xs md:text-sm">
            {/* Duration */}
            <div className="flex items-start justify-between gap-3">
              <div className="text-(--color-text-muted)">Duration</div>
              <div className="text-right">
                <p className="text-(--color-text-main)">
                  {booking.durationValue}{" "}
                  {booking.durationUnit === "hour" ? "hour(s)" : "day(s)"}
                </p>
                <p className="text-[11px] text-(--color-text-soft)">
                  {formatCurrency(booking.perUnitRate, booking.currency)} per{" "}
                  {booking.durationUnit}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start justify-between gap-3">
              <div className="text-(--color-text-muted)">Location</div>
              <div className="text-right max-w-[230px]">
                <p className="text-(--color-text-main)">
                  {locationLine || "-"}
                </p>
                {location.address && (
                  <p className="text-[11px] text-(--color-text-soft) mt-0.5">
                    {location.address}
                  </p>
                )}
              </div>
            </div>

            {/* IDs and timestamps */}
            <div className="border-t border-(--color-border-subtle) pt-3 space-y-1.5 text-[11px] text-(--color-text-soft)">
              <p>
                Booking ID:{" "}
                <span className="font-mono text-[10px] break-all">
                  {booking._id}
                </span>
              </p>
              {booking.serviceSlug && (
                <p>
                  Service:{" "}
                  <span className="font-mono text-[10px]">
                    /services/{booking.serviceSlug}
                  </span>
                </p>
              )}
              <p>Last updated: {formatDateTime(booking.updatedAt)}</p>
            </div>
          </div>

          <div className="modal-action mt-5">
            <form method="dialog">
              <button className="btn btn-sm border-none bg-(--color-bg-soft) text-(--color-text-muted) hover:bg-(--color-bg-soft)">
                Close
              </button>
            </form>
          </div>
        </div>

        {/* Click outside area */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
