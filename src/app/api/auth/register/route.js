// src/app/api/auth/register/route.js
import { NextResponse } from "next/server";
import { collections, dbConnect } from "@/lib/dbConnect";
import {
  validatePassword,
  hashPassword,
  findUserByEmailOrNid,
} from "@/lib/auth";

import { RegisterSchema } from "@/lib/schemas/auth";

export async function POST(req) {
  try {
    const body = await req.json();

    // 1) Validate with Zod
    const validation = RegisterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message, details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nid, name, email, contact, password } = validation.data;

    // 2) Check if user already exists
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
