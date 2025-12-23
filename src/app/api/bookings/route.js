import { NextResponse } from "next/server";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServiceBySlug } from "@/actions/server/services";

function computePerUnitRate(baseRate, baseUnit, durationUnit) {
  if (!baseRate) return 0;

  if (durationUnit === "hour") {
    if (baseUnit === "day") return baseRate / 24;
    return baseRate;
  }

  if (durationUnit === "day") {
    if (baseUnit === "hour") return baseRate * 24;
    return baseRate;
  }

  return baseRate;
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("POST BODY: ",body);

    const {
      serviceSlug,
      durationUnit,
      durationValue,
      division,
      district,
      city,
      area,
      address,
    } = body;

    // Basic validation
    if (
      !serviceSlug ||
      !durationUnit ||
      !durationValue ||
      !division ||
      !district ||
      !city ||
      !address
    ) {
      return NextResponse.json(
        { error: "Missing required fields for booking." },
        { status: 400 }
      );
    }

    // When auth is ready, derive userId from session instead of trusting body
    const userId = null; // placeholder (e.g. session.user.id)

    // Fetch service & pricing
    const service = await getServiceBySlug(serviceSlug);
    if (!service) {
      return NextResponse.json(
        { error: "Service not found." },
        { status: 404 }
      );
    }

    const pricing = service.pricing || {};
    const baseRate = Number(pricing.baseRate || 0);
    const baseUnit = pricing.unit || "hour";
    const currency = pricing.currency || "BDT";

    const perUnitRate = computePerUnitRate(baseRate, baseUnit, durationUnit);
    if (!perUnitRate || !durationValue || durationValue <= 0) {
      return NextResponse.json(
        { error: "Invalid duration or pricing configuration." },
        { status: 400 }
      );
    }

    const totalCost = durationValue * perUnitRate;

    const bookingsCollection = await dbConnect(collections.BOOKINGS);

    const now = new Date();

    const doc = {
      // relations
      userId: userId ? new ObjectId(userId) : null, // update when auth is ready
      serviceId: new ObjectId(service._id),
      serviceSlug: service.slug,
      serviceName: service.name,

      // duration & pricing
      durationUnit, // "hour" | "day"
      durationValue,
      perUnitRate,
      totalCost,
      currency,

      // location
      location: {
        division,
        district,
        city,
        area: area || "",
        address,
      },

      // status & timestamps
      status: "PENDING", // PENDING | CONFIRMED | COMPLETED | CANCELLED
      createdAt: now,
      updatedAt: now,
    };

    const result = await bookingsCollection.insertOne(doc);

    // Shape response for client
    const responseBooking = {
      _id: result.insertedId.toString(),
      ...doc,
      userId: doc.userId ? doc.userId.toString() : null,
      serviceId: doc.serviceId.toString(),
    };

    return NextResponse.json(responseBooking, { status: 201 });
  } catch (error) {
    console.error("POST /api/bookings error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

// GET /api/bookings (for My Bookings page later)
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userIdParam = searchParams.get("userId");

    const bookingsCollection = await dbConnect(collections.BOOKINGS);

    // TODO: when auth is implemented, use session.user.id instead,
    // and ignore userId from query for security reasons.
    const query = {};

    if (userIdParam && userIdParam.length === 24) {
      query.userId = new ObjectId(userIdParam);
    }

    const docs = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const bookings = docs.map((b) => ({
      ...b,
      _id: b._id.toString(),
      userId: b.userId ? b.userId.toString() : null,
      serviceId: b.serviceId.toString(),
    }));

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("GET /api/bookings error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
