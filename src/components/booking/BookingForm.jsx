"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function formatCurrency(amount, currency) {
  if (!amount || isNaN(amount)) return "-";
  const symbol = currency === "BDT" ? "৳" : currency || "";
  return `${symbol} ${Number(amount).toLocaleString("en-BD")}`;
}

export default function BookingForm({ service }) {
  const router = useRouter();

  const pricing = service.pricing || {};
  const baseRate = Number(pricing.baseRate || 0);
  const baseUnit = pricing.unit || "hour"; // from DB: "hour" or "day"
  const currency = pricing.currency || "BDT";

  const [durationUnit, setDurationUnit] = useState(baseUnit); // "hour" | "day"
  const [durationValue, setDurationValue] = useState(4);

  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convert between hour/day
  const perUnitRate = useMemo(() => {
    if (!baseRate) return 0;

    if (durationUnit === "hour") {
      // If base is per day but user chooses hours: approximate / 24
      if (baseUnit === "day") return baseRate / 24;
      return baseRate;
    }

    if (durationUnit === "day") {
      // If base is per hour but user chooses days: 24 * baseRate
      if (baseUnit === "hour") return baseRate * 24;
      return baseRate;
    }

    return baseRate;
  }, [baseRate, baseUnit, durationUnit]);

  const totalCost = useMemo(() => {
    if (!durationValue || durationValue <= 0 || !perUnitRate) return 0;
    return durationValue * perUnitRate;
  }, [durationValue, perUnitRate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!durationValue || !division || !district || !city || !address) {
      alert("Please fill in duration and location details before confirming.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        serviceSlug: service.slug, // backend looks up service from slug
        serviceId: service._id, // optional; backend doesn’t need this now
        durationUnit,
        durationValue,
        division,
        district,
        city,
        area,
        address,
        estimatedTotal: totalCost, // optional; server recomputes anyway
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      // console.log(res);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create booking");
      }

      // alert("Success");
      Swal.fire("success", "Your Booking has been confirmed", "success")

      const data = await res.json();
      // console.log("Booking created:", data);

      // Redirect to My Bookings
      router.push("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      alert(
        error.message ||
          "Something went wrong while creating your booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start"
    >
      {/* Left: Form fields */}
      <div className="space-y-8">
        {/* Step 1: Duration */}
        <section className="rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
                Step 1
              </p>
              <h2 className="text-sm md:text-base font-semibold text-(--color-text-main)">
                Select duration
              </h2>
            </div>
            <span className="text-[11px] text-(--color-text-soft)">
              Pricing based on duration × base rate
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
            {/* Duration value */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-(--color-text-main)">
                Duration value
              </label>
              <input
                type="number"
                min={1}
                value={durationValue}
                onChange={(e) => setDurationValue(Number(e.target.value) || 0)}
                className="input input-sm md:input-md w-full border-(--color-border-subtle) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200) bg-(--color-surface)"
                placeholder="Enter duration"
                required
              />
              <p className="text-[11px] text-(--color-text-soft)">
                Enter how long you need this service (e.g. 4, 8, or 24).
              </p>
            </div>

            {/* Duration unit */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-(--color-text-main)">
                Duration unit
              </label>
              <div className="join join-vertical md:join-horizontal w-full">
                <button
                  type="button"
                  onClick={() => setDurationUnit("hour")}
                  className={`btn btn-sm md:btn-md join-item flex-1 ${
                    durationUnit === "hour"
                      ? "border-none bg-(--color-primary-600) text-(--color-text-invert)"
                      : "btn-ghost text-(--color-text-muted)"
                  }`}
                >
                  Hours
                </button>
                <button
                  type="button"
                  onClick={() => setDurationUnit("day")}
                  className={`btn btn-sm md:btn-md join-item flex-1 ${
                    durationUnit === "day"
                      ? "border-none bg-(--color-primary-600) text-(--color-text-invert)"
                      : "btn-ghost text-(--color-text-muted)"
                  }`}
                >
                  Days
                </button>
              </div>
              <p className="text-[11px] text-(--color-text-soft)">
                You can choose hours or full days — the rate adjusts
                automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Step 2: Location */}
        <section className="rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
                Step 2
              </p>
              <h2 className="text-sm md:text-base font-semibold text-(--color-text-main)">
                Add your location
              </h2>
            </div>
            <span className="text-[11px] text-(--color-text-soft)">
              Division, district, city, area, and address
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Division */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-(--color-text-main)">
                Division
              </label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="select select-sm md:select-md w-full border-(--color-border-subtle) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200) bg-(--color-surface)"
                required
              >
                <option value="" disabled>
                  Select division
                </option>
                <option>Dhaka</option>
                <option>Chattogram</option>
                <option>Khulna</option>
                <option>Rajshahi</option>
                <option>Sylhet</option>
                <option>Barishal</option>
                <option>Rangpur</option>
                <option>Mymensingh</option>
              </select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-(--color-text-main)">
                District
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="input input-sm md:input-md w-full border-(--color-border-subtle) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200) bg-(--color-surface)"
                placeholder="e.g. Dhaka District"
                required
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-(--color-text-main)">
                City / Town
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input input-sm md:input-md w-full border-(--color-border-subtle) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200) bg-(--color-surface)"
                placeholder="e.g. Dhaka, Chattogram"
                required
              />
            </div>

            {/* Area */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-(--color-text-main)">
                Area / Neighborhood
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="input input-sm md:input-md w-full border-(--color-border-subtle) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200) bg-(--color-surface)"
                placeholder="e.g. Banani, Agrabad"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-(--color-text-main)">
              Full address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="textarea textarea-sm md:textarea-md w-full border-(--color-border-subtle) focus:outline-none focus:ring-2 focus:ring-(--color-primary-200) bg-(--color-surface)"
              rows={3}
              placeholder="House, road, building name, or any additional directions."
              required
            />
          </div>
        </section>
      </div>

      {/* Right: Summary card */}
      <aside className="md:pl-4 lg:pl-8">
        <div className="rounded-2xl border border-(--color-border-subtle) bg-(--color-surface) shadow-lg shadow-black/5 p-5 md:p-6 space-y-5">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary-600)">
              Step 3
            </p>
            <h2 className="text-sm md:text-base font-semibold text-(--color-text-main)">
              Review and confirm
            </h2>
            <p className="text-xs text-(--color-text-muted)">
              Please review your duration and location before confirming your
              booking request.
            </p>
          </div>

          {/* Summary rows */}
          <div className="rounded-xl bg-(--color-bg-soft) border border-(--color-border-subtle) p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-(--color-text-muted)">Service</span>
              <span className="font-medium text-(--color-text-main)">
                {service.name}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-(--color-text-muted)">Duration</span>
              <span className="font-medium text-(--color-text-main)">
                {durationValue > 0 ? durationValue : "-"}{" "}
                {durationUnit === "hour" ? "hour(s)" : "day(s)"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-(--color-text-muted)">Rate</span>
              <span className="font-medium text-(--color-text-main)">
                {formatCurrency(perUnitRate, currency)} per{" "}
                {durationUnit === "hour" ? "hour" : "day"}
              </span>
            </div>
            <div className="border-t border-(--color-border-subtle) pt-3 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-(--color-text-main)">
                Estimated total
              </span>
              <span className="text-base font-semibold text-(--color-primary-600)">
                {formatCurrency(totalCost, currency)}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-(--color-text-soft)">
            This is an estimated total. Exact amount is confirmed when your
            booking is accepted. You can track status under{" "}
            <span className="font-medium text-(--color-text-main)">
              My Bookings
            </span>
            .
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-md w-full border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating booking..." : "Confirm booking request"}
          </button>
        </div>
      </aside>
    </form>
  );
}
