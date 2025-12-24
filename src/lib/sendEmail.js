// src/lib/email.js
import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn(
      "EMAIL_USER or EMAIL_PASS is not set. Email sending is disabled."
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: true, // true for port 465
    auth: { user, pass },
  });

  return transporter;
}

export async function sendBookingInvoiceEmail({
  to,
  userName,
  booking,
  service,
}) {
  const t = getTransporter();
  if (!t) return;
  if (!to) {
    console.warn("No recipient email provided for invoice.");
    return;
  }

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  const serviceName =
    service?.name || booking.serviceName || "NestCare Service";
  const bookingId =
    (booking && booking._id && booking._id.toString
      ? booking._id.toString()
      : booking && booking._id
      ? String(booking._id)
      : "") || "";
  const location = booking.location || {};
  const locationLine = [
    location.city,
    location.area,
    location.district,
    location.division,
  ]
    .filter(Boolean)
    .join(", ");

  const durationText = `${booking.durationValue} ${
    booking.durationUnit === "hour" ? "hour(s)" : "day(s)"
  }`;

  const totalFormatted = formatCurrency(booking.totalCost, booking.currency);
  const rateFormatted = formatCurrency(booking.perUnitRate, booking.currency);

  const subject = `Booking invoice – ${serviceName} (Ref: ${bookingId.slice(
    -6
  )})`;

  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827; font-size: 14px; line-height: 1.5;">
      <h2 style="margin-bottom: 4px;">Thank you for your booking, ${escapeHtml(
        userName || "there"
      )}.</h2>
      <p style="margin-top: 0; color: #6B7280;">Here is your NestCare booking summary and invoice.</p>

      <div style="margin-top: 16px; padding: 12px 14px; border-radius: 12px; border: 1px solid #E5E7EB; background: #F9FAFB;">
        <h3 style="margin: 0 0 8px; font-size: 15px;">Booking details</h3>
        <p style="margin: 0;">
          <strong>Service:</strong> ${escapeHtml(serviceName)}<br/>
          <strong>Booking ID:</strong> <span style="font-family: monospace; font-size: 12px;">${escapeHtml(
            bookingId
          )}</span><br/>
          <strong>Status:</strong> ${escapeHtml(booking.status || "PENDING")}
        </p>
      </div>

      <div style="margin-top: 16px; padding: 12px 14px; border-radius: 12px; border: 1px solid #E5E7EB;">
        <h3 style="margin: 0 0 8px; font-size: 15px;">Time & pricing</h3>
        <p style="margin: 0;">
          <strong>Duration:</strong> ${escapeHtml(durationText)}<br/>
          <strong>Rate:</strong> ${escapeHtml(rateFormatted)} per ${
    booking.durationUnit === "hour" ? "hour" : "day"
  }<br/>
          <strong>Estimated total:</strong> ${escapeHtml(totalFormatted)}
        </p>
      </div>

      <div style="margin-top: 16px; padding: 12px 14px; border-radius: 12px; border: 1px solid #E5E7EB;">
        <h3 style="margin: 0 0 8px; font-size: 15px;">Location</h3>
        <p style="margin: 0;">
          <strong>Area:</strong> ${escapeHtml(locationLine || "-")}<br/>
          <strong>Address:</strong> ${escapeHtml(location.address || "-")}
        </p>
      </div>

      <p style="margin-top: 20px; color: #6B7280; font-size: 12px;">
        You can view and manage this booking any time from the <strong>My Bookings</strong> section inside NestCare.
      </p>

      <p style="margin-top: 8px; color: #9CA3AF; font-size: 11px;">
        This email was generated automatically by NestCare. If you did not make this booking, please contact support.
      </p>
    </div>
  `;

  const text = `
Thank you for your booking, ${userName || "there"}.

Service: ${serviceName}
Booking ID: ${bookingId}
Status: ${booking.status || "PENDING"}

Duration: ${durationText}
Rate: ${rateFormatted} per ${booking.durationUnit === "hour" ? "hour" : "day"}
Estimated total: ${totalFormatted}

Location:
  ${locationLine || "-"}
  ${location.address || "-"}

You can view and manage this booking from the "My Bookings" section in NestCare.
`;

  try {
    await t.sendMail({
      from,
      to,
      subject,
      html,
      text,
    });
    // console.log("Invoice email sent to:", to);
  } catch (error) {
    console.error("Error sending booking invoice email:", error);
  }
}

function formatCurrency(amount, currency) {
  if (amount == null || isNaN(amount)) return "-";
  const symbol = currency === "BDT" ? "৳" : currency || "";
  return `${symbol} ${Number(amount).toLocaleString("en-BD")}`;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
