const path = require("path");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


const multer = require("multer");
// const upload = multer({ dest: 'uploads/' })

const customStorageProperty = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, './uploads');
          // later on we can do it like this './uploads/req.user._id'
     },
     filename: (req, file, cb) => {
          const fName = Date.now() + '-' + file.originalname;
          cb(null, fName);
     }
});

const upload = multer({ storage: customStorageProperty });


// using middleware to parse the urlencoded data from homepage.ejs
app.use(express.urlencoded({ extended: false }));


// route for rendering homepage
app.get("/", (req, res) => {
     return res.render("homepage");
});

// route for handling the post req of homepage.ejs
app.post("/profile", upload.single('profilePic') ,(req, res) => {
     return res.redirect("/");
})

app.listen( PORT, () => console.log(`backend is live on port ${PORT}`) );