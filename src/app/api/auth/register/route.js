// src/app/api/auth/register/route.js
import { NextResponse } from "next/server";
import { collections, dbConnect } from "@/lib/dbConnect";
import {
  validatePassword,
  hashPassword,
  findUserByEmailOrNid,
} from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();

    const { nid, name, email, contact, password } = body;

    if (!nid || !name || !email || !contact || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Password validation
    const passCheck = await validatePassword(password);
    if (!passCheck.ok) {
      return NextResponse.json(
        { error: passCheck.errors.join(" ") },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await findUserByEmailOrNid(email, nid);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email or NID already exists." },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    const usersCollection = await dbConnect(collections.USERS);
    const now = new Date();

    const doc = {
      nid,
      name,
      email,
      contact,
      passwordHash,
      role: "user",
      createdAt: now,
      updatedAt: now,
    };

    const result = await usersCollection.insertOne(doc);

    const user = {
      _id: result.insertedId.toString(),
      nid,
      name,
      email,
      contact,
      role: "user",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    // NOTE: I are NOT setting any session/cookie yet. That will be added later.
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("POST /api/auth/register error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
