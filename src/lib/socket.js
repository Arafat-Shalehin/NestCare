import { Server } from "socket.io";
import logger from "./logger";

/**
 * Socket Event Constants
 * Use these throughout the app to ensure consistency
 */
export const SocketEvents = {
  // Caregiver tracking
  CAREGIVER_LOCATION_UPDATE: "caregiver:location:update",
  
  // Booking updates
  BOOKING_STATUS_UPDATE: "booking:status:update",
  
  // Connection events
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
};

/**
 * Global IO singleton instance
 */
let io = null;

/**
 * Initialize Socket.IO server
 * @param {import("http").Server} httpServer 
 */
export const initSocket = (httpServer) => {
  if (io) {
    logger.warn("Socket.IO already initialized. Skipping.");
    return io;
  }

  io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXTAUTH_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
    // Multi-instance scalability: This is where you'd add the Redis adapter
    // adapter: createAdapter(pubClient, subClient)
  });

  io.on(SocketEvents.CONNECTION, (socket) => {
    logger.info("New socket client connected", { socketId: socket.id });

    socket.on(SocketEvents.DISCONNECT, () => {
      logger.info("Socket client disconnected", { socketId: socket.id });
    });
  });

  logger.info("Socket.IO initialized successfully");
  return io;
};

/**
 * Access the IO instance from Server Actions or API routes
 * @returns {import("socket.io").Server | null}
 */
export const getIO = () => {
  if (!io) {
    // During build or in non-WS environments, this might be null
    // We should handle this gracefully in the caller
    return null;
  }
  return io;
};

/**
 * Helper to emit events safely from any backend context
 * @param {string} event 
 * @param {any} data 
 * @param {string} [room] 
 */
export const emitEvent = (event, data, room = null) => {
  const ioInstance = getIO();
  if (!ioInstance) {
    logger.warn("Socket.IO not initialized. Event skipped.", { event });
    return false;
  }

  if (room) {
    ioInstance.to(room).emit(event, data);
  } else {
    ioInstance.emit(event, data);
  }

  return true;
};
