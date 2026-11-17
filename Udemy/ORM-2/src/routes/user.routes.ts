import express from "express";
import { Router } from "express";

import {
    getUserDetails,
    registerUser,
    loginUser,
    updateUserDetails
} from "../controller/user.controllers.ts";

import { authMiddleware } from "../middlware/auth.middleware.ts";


const router: Router = express.Router();

router.route("/signup").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me")
    .all(authMiddleware)
    .get(getUserDetails)
    .patch(updateUserDetails);


export default router;