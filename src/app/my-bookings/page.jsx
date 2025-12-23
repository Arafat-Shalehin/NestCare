import Link from "next/link";
import CancelBookingButton from "@/components/booking/CancelBookingButton";
import { getBookingsForUser } from "@/actions/server/bookings";
import BookingDetailsButton from "@/components/booking/BookingDetailsButton";

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

export const metadata = {
  title: "My Bookings – NestCare",
  description:
    "View and manage your NestCare bookings, including status, location, and estimated total cost.",
};

export default async function MyBookingsPage() {
  // TODO: When auth is ready, will pass the logged-in user's id here
  const bookings = await getBookingsForUser(null);

  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const confirmedCount = bookings.filter(
    (b) => b.status === "CONFIRMED"
  ).length;
  const completedCount = bookings.filter(
    (b) => b.status === "COMPLETED"
  ).length;

  return (
    <section className="bg-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
              My bookings
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-(--color-text-main)">
              Your NestCare bookings and status.
            </h1>
            <p className="text-sm md:text-base text-(--color-text-muted) max-w-2xl">
              Track each booking from pending to completed. You can review
              details, monitor status, and cancel a request before it starts.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) px-3 py-2">
              <p className="text-lg font-semibold text-(--color-text-main)">
                {totalCount}
              </p>
              <p className="text-(--color-text-soft)">Total</p>
            </div>
            <div className="rounded-2xl bg-(--color-warning-100) border border-(--color-border-subtle) px-3 py-2">
              <p className="text-lg font-semibold text-(--color-warning-500)">
                {pendingCount}
              </p>
              <p className="text-(--color-text-soft)">Pending</p>
            </div>
            <div className="rounded-2xl bg-(--color-primary-50) border border-(--color-border-subtle) px-3 py-2">
              <p className="text-lg font-semibold text-(--color-primary-600)">
                {confirmedCount}
              </p>
              <p className="text-(--color-text-soft)">Confirmed</p>
            </div>
            <div className="rounded-2xl bg-(--color-success-100) border border-(--color-border-subtle) px-3 py-2">
              <p className="text-lg font-semibold text-(--color-success-500)">
                {completedCount}
              </p>
              <p className="text-(--color-text-soft)">Completed</p>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-8 text-center space-y-4">
            <p className="text-sm md:text-base font-medium text-(--color-text-main)">
              You don&apos;t have any bookings yet.
            </p>
            <p className="text-xs md:text-sm text-(--color-text-muted)">
              When you book Baby Care, Elderly Care, or Sick Care, they will
              appear here with status, location, and total cost.
            </p>
            <Link
              href="/services"
              className="btn btn-sm md:btn-md border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm"
            >
              Browse services
            </Link>
          </div>
        ) : (
          // Bookings table / list
          <div className="rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-sm md:table-md">
                <thead className="bg-(--color-bg-soft)">
                  <tr className="text-[11px] uppercase tracking-[0.16em] text-(--color-text-soft)">
                    <th>Service</th>
                    <th className="hidden md:table-cell">Created</th>
                    <th>Duration</th>
                    <th className="hidden md:table-cell">Location</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs md:text-sm">
                  {bookings.map((booking) => {
                    const statusConfig = getStatusConfig(booking.status);
                    const location = booking.location || {};
                    const locationText = [
                      location.city,
                      location.area,
                      location.division,
                    ]
                      .filter(Boolean)
                      .join(", ");

                    return (
                      <tr
                        key={booking._id}
                        className="hover:bg-(--color-bg-soft)"
                      >
                        {/* Service */}
                        <td>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-(--color-text-main)">
                              {booking.serviceName || "Service"}
                            </span>
                            <span className="text-[11px] text-(--color-text-soft)">
                              {formatDateTime(booking.createdAt)}
                            </span>
                          </div>
                        </td>

                        {/* Created (on md+) */}
                        <td className="hidden md:table-cell text-(--color-text-muted)">
                          {formatDateTime(booking.createdAt)}
                        </td>

                        {/* Duration */}
                        <td>
                          <span className="text-(--color-text-main)">
                            {booking.durationValue}{" "}
                            {booking.durationUnit === "hour"
                              ? "hour(s)"
                              : "day(s)"}
                          </span>
                          <span className="block text-[11px] text-(--color-text-soft)">
                            {formatCurrency(
                              booking.perUnitRate,
                              booking.currency
                            )}{" "}
                            per {booking.durationUnit}
                          </span>
                        </td>

                        {/* Location */}
                        <td className="hidden md:table-cell">
                          <span className="block text-(--color-text-main)">
                            {locationText || "-"}
                          </span>
                          {location.address && (
                            <span className="block text-[11px] text-(--color-text-soft) truncate max-w-xs">
                              {location.address}
                            </span>
                          )}
                        </td>

                        {/* Total */}
                        <td className="font-medium text-(--color-primary-600)">
                          {formatCurrency(booking.totalCost, booking.currency)}
                        </td>

                        {/* Status */}
                        <td>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${statusConfig.badgeBg} ${statusConfig.badgeText}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-(--color-border-strong)" />
                            {statusConfig.label}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <BookingDetailsButton booking={booking} />
                            <CancelBookingButton
                              bookingId={booking._id}
                              disabled={
                                booking.status === "CANCELLED" ||
                                booking.status === "COMPLETED"
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
