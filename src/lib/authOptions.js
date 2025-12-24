// src/lib/authOptions.js
import { loginUser } from "@/lib/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // my own custom login page
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await loginUser(credentials);
          return user; // { id, name, email, role }
        } catch (error) {
          console.error("Credentials authorize error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // Runs on every sign-in (credentials + Google)
    async signIn({ user, account, profile }) {
      // Handle Google sign-in: store / sync user in my USERS collection
      if (account?.provider === "google") {
        const usersCollection = await dbConnect(collections.USERS);

        // Try to find user by email
        let existing = await usersCollection.findOne({ email: user.email });

        if (!existing) {
          const now = new Date();
          const doc = {
            provider: "google",
            providerAccountId: account.providerAccountId || profile?.sub,
            name: user.name || "",
            email: user.email,
            image: user.image || "",
            role: "user",
            createdAt: now,
            updatedAt: now,
          };

          const result = await usersCollection.insertOne(doc);
          existing = { ...doc, _id: result.insertedId };
        }

        // Attach DB info so jwt() receives it
        user.id = existing._id.toString();
        user.role = existing.role || "user";
      }

      // For credentials provider, loginUser already provided { id, role }
      return true;
    },

    async jwt({ token, user }) {
      // When user logs in, persist id & role into the token
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      // Make id & role available on session.user
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
