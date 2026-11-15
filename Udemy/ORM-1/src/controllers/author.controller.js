import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { authorTable, bookTable } from "../models/index.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllAuthor = asyncHandler(
    async (req, res) => {
        try {
            const allAuthor = await db.select().from(authorTable);

            return res.status(200).json(
                new ApiResponse(200, allAuthor, "All Authors data fetched successfully")
            );
        } catch (err) {
            return res.status(500).json(
                new ApiResponse(500, null, "Something went wrong")
            );
        }
    }
);

export const getAuthorById = asyncHandler(
    async (req, res) => {
        const { id: authorId } = req.params;

        if (!authorId) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "Author Id is required"
                )
            );
        }

        try {
            const [author] = await db.select().from(authorTable)
                .where(table => eq(table.id, authorId))
                .limit(1);

            return res.status(200).json(
                new ApiResponse(200, author, "Author Data fetched successfully")
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

export const createAuthor = asyncHandler(
    async (req, res) => {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(404).json(
                new ApiResponse(400, null, "Name, email, and age are required fields")
            )
        }

        try {
            const [newAuthor] = await db.insert(authorTable).values({
                name,
                email,
                age
            }).returning({ id: authorTable.id });

            return res.status(201).json(
                new ApiResponse(
                    201,
                    { authorId: newAuthor.id },
                    "Author created successfully"
                )
            );
        } catch (err) {
            if (err.name === "DrizzleQueryError") {
                return res.status(404).json(
                    new ApiResponse(
                        404,
                        null,
                        err.cause?.message || "Invalid data types of the field provided"
                    )
                );
            }

            return res.status(500).json(
                new ApiResponse(500, null, "Something went wrong")
            );
        }
    }
);

export const updateAuthorById = asyncHandler(
    async (req, res) => {
        const { id: authorId } = req.params;

        if (!authorId) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "Author Id is required"
                )
            );
        }

        const { name = "", email = "", age = "" } = req?.body ?? {};

        if (!(name || email || age)) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "At least one of name, email, or age is required to update the author record"
                )
            );
        }

        try {
            const [updateAuthor] = await db.update(authorTable)
                .set({
                    ...req.body
                })
                .where(eq(authorTable.id, authorId))
                .returning({ id: authorTable.id });

            return res.status(200).json(
                new ApiResponse(
                    200,
                    updateAuthor,
                    "Successfully updated author details"
                )
            );
        } catch (err) {
            if (err.name === "DrizzleQueryError") {
                return res.status(404).json(
                    new ApiResponse(
                        404,
                        null,
                        err.cause?.message || "Invalid data types of the field provided"
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

export const getAuthorBooks = asyncHandler(
    async (req, res) => {
        const { id: authorId } = req.params;

        if (!authorId) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "Author Id is required"
                )
            );
        }

        try {
            const [authorBooks] = await db.select().from(bookTable)
                .where(eq(bookTable.authorId, req.params.id));

            return res.status(200).json(
                new ApiResponse(
                    200,
                    authorBooks,
                    "successfully fetched author Books"
                )
            );

        } catch (err) {
            
            try {
                const author = await db.select().from(authorTable)
                    .where(eq(authorTable.id, authorId));

                return res.status(200).json(
                    new ApiResponse(
                        200,
                        [],
                        "Author doesn't have any books published yet"
                    )
                );
            } catch (err) {
                
                if (err.name === "DrizzleQueryError") {
                    return res.status(404).json(
                        new ApiResponse(
                            404,
                            null,
                            "Invalid Author Id"
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
    }
);

// DELETE ROUTE => DELETE ALL BOOKS
// export const deleteAuthorById = asyncHandler(
//     async (req, res) => {
//         const { id: authorId } = req.params;

// if (!authorId) {
//     return res.status(400).json(
//         new ApiResponse(
//             400,
//             null,
//             "Author Id is required"
//         )
//     );
// }

//         try {
//             const deleteAuthor = await db.delete(authorTable)
//                 .where(eq(authorTable.id, authorId));

//             return res.status(200).json(
//                 new ApiResponse(200, null, "Successfully deleted author details")
//             );
//         } catch (err) {
//             if (err.name === "DrizzleQueryError") {
//                 return res.status(404).json(
//                     new ApiResponse(404, null, "Invalid Author Id")
//                 );
//             }

//             return res.status(500).json(
//                 new ApiResponse(
//                     500,
//                     null,
//                     "Something went wrong"
//                 )
//             );
//         }
//     }
// );
