import { eq } from "drizzle-orm";
import db from "../db/index.ts";
import { userSessions } from "../models/index.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import asyncHandler from "../utils/asyncHandler.ts";

type SessionUserId = typeof userSessions.$inferSelect["userId"];

declare global {
    namespace Express {
        interface Request {
            userId: SessionUserId;
        }
    }
}

export const authMiddleware = asyncHandler(
    async (req, res, next) => {
        const sessionId = req.headers['session-id'];

        if (!sessionId || typeof sessionId !== "string") {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "sessionId is not provided in headers"
                )
            );
        }

        const [user] = await db
            .select({
                id: userSessions.userId
            })
            .from(userSessions)
            .where(eq(userSessions.id, sessionId))

        if (!user) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    null,
                    "Session expired: Please Login Again"
                )
            );
        }

        req.userId = user.id;

        return next();
    }
);