import { eq } from "drizzle-orm";
import db from "../db/index.ts";
import userTable from "../models/users.model.ts";
import type { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.ts";
import asyncHandler from "../utils/asyncHandler.ts";
import userSessions from "../models/userSessions.model.ts";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {

        const { name, email, password } = req.body;

        if (!(name && email && password)) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "name, email & password are required fields"
                )
            );
        }

        const [existingUser] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email));

        if (existingUser) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    { email },
                    "Email already registered"
                )
            );
        }

        const salt = randomBytes(32).toString('hex');

        const hashedPass = createHmac('sha256', salt).update(password).digest('hex');

        const [newUser] = await db
            .insert(userTable)
            .values({
                name,
                email,
                password: hashedPass,
                salt
            })
            .returning({ id: userTable.id });

        if (!newUser) {
            return res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    "Failed to create user"
                )
            );
        }

        return res.status(201).json(
            new ApiResponse(
                201,
                { id: newUser.id },
                "successfully created new user"
            )
        );
    }
);

export const loginUser = asyncHandler(
    async (req: Request, res: Response) => {

        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "email & password are required fields"
                )
            );
        }

        const [userData] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email))

        if (!userData) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User does not exist: Invalid email"
                )
            );
        }

        const hashedPass = createHmac('sha256', userData.salt).update(password).digest('hex');
        const providedPassBuffer = Buffer.from(hashedPass, "hex");
        const storedPassBuffer = Buffer.from(userData.password, "hex");

        if (
            providedPassBuffer.length !== storedPassBuffer.length ||
            !timingSafeEqual(providedPassBuffer, storedPassBuffer)
        ) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Invalid Password"
                )
            );
        }

        // create a session
        const [newSession] = await db
            .insert(userSessions)
            .values({
                userId: userData.id
            })
            .returning({ id: userSessions.id });

        if (!newSession) {
            return res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    "Failed to create session"
                )
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    sessionId: newSession.id
                },
                "successfully created new user"
            )
        );
    }
);

export const getUserDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req;

        const [userDetails] = await db
            .select({
                userId: userTable.id,
                name: userTable.name,
                email: userTable.email,
            })
            .from(userTable)
            .where(eq(userTable.id, userId))

        if (!userDetails) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    null,
                    "Session expired: Please Login Again"
                )
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                userDetails,
                "successfully fetched user details"
            )
        );
    }
);

export const updateUserDetails = asyncHandler(
    async (req, res) => {
        const { userId } = req;

        const { name, email } = req.body;

        if (!name) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "name is a required field to update user details"
                )
            );
        }

        const [updatedUser] = await db
            .update(userTable)
            .set({ name })
            .where(eq(userTable.id, userId))
            .returning({
                userId: userTable.id,
                name: userTable.name,
                email: userTable.email,
            });

        if (!updatedUser) {
            return res.status(404).json(
                new ApiResponse(404, null, "User not found")
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedUser,
                "successfully updated user details"
            )
        );
    }
);