import express from "express";
import {
    getAllAuthor,
    createAuthor,
    getAuthorById,
    getAuthorBooks,
    updateAuthorById,
    // deleteAuthorById,
} from "../controllers/author.controller.js";

const router = express.Router();

router.route('/')
    .get(getAllAuthor)
    .post(createAuthor);

router.route('/:id')
    .get(getAuthorById)
    .patch(updateAuthorById);
    // .delete(deleteAuthorById);

router.route("/:id/books")
    .get(getAuthorBooks);


export default router;