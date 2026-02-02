const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const { router } = require('./routes/url.js');
const { connectMongoDB } = require('./connection.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve('./views/'));

connectMongoDB(`mongodb://127.0.0.1:27017/short-url`)
.then(() => console.log('Mongo DB connected successfully!!'))
.catch((err) => console.log("CONNECTION TO MONGODB FAILED!!!"));    


app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use("/", router);


app.listen(PORT, () => console.log(`Backend server is running on port: ${PORT}`));