import 'dotenv/config';
import express from "express";
import userRoutes from "./routes/user.routes.ts";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});