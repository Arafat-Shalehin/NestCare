import { NextResponse } from "next/server";
import { collections, dbConnect } from "@/lib/dbConnect";
import { safeApi } from "@/lib/safeApi";
import { ApiError } from "@/lib/errors";
import logger from "@/lib/logger";

/**
 * GET /api/caregivers/nearby?lat=...&lng=...&radius=...
 * Finds caregivers within a specific radius using MongoDB $near.
 */
export const GET = safeApi(async (req) => {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));
  const radiusInMeters = parseFloat(searchParams.get("radius") || "5000"); // Default 5km

  if (isNaN(lat) || isNaN(lng)) {
    throw ApiError.badRequest("Latitude and Longitude are required.", "MISSING_COORDINATES");
  }

  logger.info("Nearby caregiver search", { lat, lng, radiusInMeters });

  const locationsCollection = await dbConnect(collections.LOCATIONS);

  // 1. Find nearby caregiver IDs
  const nearbyLocations = await locationsCollection.find({
    coordinates: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat], // [lng, lat] for 2dsphere
        },
        $maxDistance: radiusInMeters,
      },
    },
    status: "active",
  }).toArray();

  if (nearbyLocations.length === 0) {
    return NextResponse.json([]);
  }

  // 2. Fetch full caregiver details from users collection
  const caregiverIds = nearbyLocations.map(loc => loc.caregiverId);
  const usersCollection = await dbConnect(collections.USERS);
  
  const caregivers = await usersCollection.find({
    _id: { $in: caregiverIds },
    role: "caregiver", // Extra safety
  }).toArray();

  // 3. Merge location data with user data
  const result = nearbyLocations.map(loc => {
    const user = caregivers.find(u => u._id.toString() === loc.caregiverId.toString());
    if (!user) return null;

    return {
      id: user._id.toString(),
      name: user.name,
      type: user.caregiverType || "General Care",
      pos: [loc.coordinates[1], loc.coordinates[0]], 
      area: user.address?.city || "Dhaka", // Use city as area if available
      status: loc.status,
    };

  }).filter(Boolean);

  return NextResponse.json(result);
});
