const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const urlRoutes = require('./routes/url.js');
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/user.js');
const { connectMongoDB } = require('./connection.js');
const staticRoutes = require('./routes/staticRouter.js');
const { checkforAuthentication, checkforAuthorization } = require('./middlewares/auth.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve('./views/'));

connectMongoDB(`mongodb://127.0.0.1:27017/short-url`)
.then(() => console.log('Mongo DB connected successfully!!'))
.catch((err) => console.log("CONNECTION TO MONGODB FAILED!!!"));    


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(checkforAuthentication);

app.use("/url", checkforAuthorization(['USER', 'ADMIN']), urlRoutes);
app.use("/user", userRoutes);
app.use("/", staticRoutes);


app.listen(PORT, () => console.log(`Backend server is running on port: ${PORT}`));