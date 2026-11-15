import db from "../db/index.js";
import { authorTable, bookTable } from "../models/index.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { eq, ilike } from "drizzle-orm";

export const getAllBooks = asyncHandler(
    async (req, res) => {
        const { search } = req.query;

        try {
            if (search) {
                const allBooks = await db.select().from(bookTable)
                        .where(ilike(bookTable.title, `%${search}%`));

                return res.status(200).json(
                    new ApiResponse(200, allBooks, "All Books data fetched successfully")
                );
            }

            const allBooks = await db.select().from(bookTable);

            return res.status(200).json(
                new ApiResponse(200, allBooks, "All Books data fetched successfully")
            );
        } catch (err) {
            return res.status(500).json(
                new ApiResponse(500, null, "Something went wrong")
            );
        }
    }
);

export const getBookById = asyncHandler(
    async (req, res) => {
        const { id: bookId } = req.params;

        if (!bookId) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "Book Id is required"
                )
            );
        }

        try {
            const [book] = await db.select().from(bookTable)
                .where(eq(bookTable.id, bookId))
                .leftJoin(authorTable, eq(bookTable.authorId, authorTable.id))
                .limit(1);

            return res.status(200).json(
                new ApiResponse(200, book, "Book Data fetched successfully")
            );

        } catch (err) {
            if (err.name === "DrizzleQueryError") {
                return res.status(404).json(
                    new ApiResponse(404, null, "Invalid Book Id")
                );
            }

            return res.status(500).json(
                new ApiResponse(500, null, "Something went wrong")
            );
        }
    }
);

export const createBook = asyncHandler(
    async (req, res) => {
        const { title, description, authorId } = req.body;

        if (!title || !description || !authorId) {
            return res.status(404).json(
                new ApiResponse(400, null, "Title, description, and author ID are required fields")
            )
        }

        try {
            const [newBook] = await db.insert(bookTable).values({
                title,
                description,
                authorId
            }).returning({ id: bookTable.id });

            return res.status(201).json(
                new ApiResponse(
                    201,
                    { bookId: newBook.id },
                    "Book created successfully"
                )
            );

        } catch (err) {
            if (err.name === "DrizzleQueryError") {
                return res.status(404).json(
                    new ApiResponse(404, null, "Invalid Author Id")
                );
            }

            return res.status(500).json(
                new ApiResponse(500, null, "Something went wrong")
            );
        }
    }
);

export const updateBookById = asyncHandler(
    async (req, res) => {
        const { id: bookId } = req.params;

        if (!bookId) {
            return res.status(400).json({ message: "Book Id is required" });
        }

        const { title = "", description = "", authorId = "" } = req?.body ?? {};

        if (!(title || description || authorId)) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "At least one of title, description, or authorId is required to update the book record"
                )
            );
        }


        try {
            const [updateBook] = await db.update(bookTable)
                .set({
                    ...req.body
                })
                .where(eq(bookTable.id, bookId))
                .returning({ id: bookTable.id });

            return res.status(200).json(
                new ApiResponse(
                    200,
                    updateBook,
                    "Successfully updated book details"
                )
            );
        } catch (err) {
            if (err.name === "DrizzleQueryError") {
                let isBookId = String(err.cause?.message).replace(/"/g, "").split("uuid: ")[1] === bookId;

                return res.status(404).json(
                    new ApiResponse(
                        404,
                        null,
                        `Invalid ${isBookId ? "Book Id" : "Author Id"}`
                    )
                );
            }

            return res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    "Something went wrong"
                )
            );
        }
    }
);

export const deleteBookById = asyncHandler(
    async (req, res) => {
        const { id: bookId } = req.params;

        if (!bookId) {
            return res.status(400).json(
                new ApiResponse(400, null, "Book Id is required")
            );
        }

        try {
            const deleteBook = await db.delete(bookTable)
                .where(eq(bookTable.id, bookId));

            return res.status(200).json(
                new ApiResponse(200, null, "Successfully deleted book details")
            );
        } catch (err) {
            if (err.name === "DrizzleQueryError") {
                return res.status(404).json(
                    new ApiResponse(404, null, "Invalid Book Id")
                );
            }

            return res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    "Something went wrong"
                )
            );
        }
    }
);