import 'dotenv/config';
import express from "express";
import bookRouter from "./src/routes/book.route.js";
import authorRouter from "./src/routes/author.route.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/books', bookRouter);
app.use('/api/authors', authorRouter);

app.listen(PORT, () => console.log(`Server is live at port: ${PORT}`));