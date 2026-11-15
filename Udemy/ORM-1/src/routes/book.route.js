import express from "express";
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
} from "../controllers/book.controller.js";

const router = express.Router();

router.route('/')
    .get(getAllBooks)
    .post(createBook);

router.route('/:id')
    .get(getBookById)
    .patch(updateBookById)
    .delete(deleteBookById);


export default router;