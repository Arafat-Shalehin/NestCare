"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getServices = async () => {
  const services = await dbConnect(collections.SERVICES).find().toArray();

  return JSON.parse(JSON.stringify(services));
};

export const getSingleServices = async (id) => {
  console.log(id);
  if (id.length != 24) {
    return {};
  }

  const query = { _id: new ObjectId(id) };
  const services = await dbConnect(collections.SERVICES).findOne(query);
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
