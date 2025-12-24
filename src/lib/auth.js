// src/lib/auth.js
"use server";

import bcrypt from "bcryptjs";
import { collections, dbConnect } from "@/lib/dbConnect";

// validation logic
export async function validatePassword(password) {
  const errors = [];

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function findUserByEmailOrNid(email, nid) {
  const usersCollection = await dbConnect(collections.USERS);

  const user = await usersCollection.findOne({
    $or: [{ email }, { nid }],
  });

  return user;
}

// Optional helper – might be useful
export async function findUserByEmail(email) {
  const usersCollection = await dbConnect(collections.USERS);
  const user = await usersCollection.findOne({ email });
  return user;
}

// Used by NextAuth Credentials provider
export async function loginUser(credentials) {
  const { email, password } = credentials || {};

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const usersCollection = await dbConnect(collections.USERS);
  const user = await usersCollection.findOne({ email });

  // User not found or no passwordHash (e.g. Google-only account)
  if (!user || !user.passwordHash) {
    throw new Error("Invalid email or password.");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid email or password.");
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role || "user",
  };
}
