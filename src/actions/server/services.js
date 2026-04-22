"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getServices = async () => {
  const collection = await dbConnect(collections.SERVICES);
  const services = await collection.find().toArray();

  return JSON.parse(JSON.stringify(services));
};

import { IdSchema } from "@/lib/schemas/common";

export const getSingleServices = async (id) => {
  const validation = IdSchema.safeParse(id);
  if (!validation.success) {
    return null;
  }


  const query = { _id: new ObjectId(id) };
  const collection = await dbConnect(collections.SERVICES);
  const services = await collection.findOne(query);
  if (!services) return null;

  return JSON.parse(
    JSON.stringify({
      ...services,
      _id: services._id.toString(),
    })
  );
};

export const getServiceBySlug = async (slug) => {
  if (!slug) return null;

  const collection = await dbConnect(collections.SERVICES);
  const service = await collection.findOne({ slug, status: "active" });
  if (!service) return null;

  return {
    ...service,
    _id: service._id.toString(),
  };
};
