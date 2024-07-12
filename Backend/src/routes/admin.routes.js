import { Router } from "express";
const router = Router();

import {
	loginAdmin,
	logoutAdmin,
	registerAdmin,
	refreshAccessToken,
	changeCurrentPassword,
	getCurrentAdmin,
	updateAdminAvatar,
	updateAccountDetails,
	getAllAdmins,
} from "../controllers/admin.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/register").post(upload.single("avatar"), registerAdmin);

router.route("/login").post(loginAdmin);

// Temporary Route for dev
router.route("/getallAdmins").get(getAllAdmins);

//secured routes
router.route("/logout").post(verifyJWT, logoutAdmin);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-admin").get(verifyJWT, getCurrentAdmin);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);


router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateAdminAvatar);

export default router;
