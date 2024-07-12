import { Router } from "express";
const router = Router();
import { verifyAdmin } from "../middlewares/auth.middleware.js";

import {
	submitContact,
	getAllContacts,
	updateWebContactDetails,
	getAdminContact
} from "../controllers/contact.controller.js";

// Contact us Routes
// User route
router.route("/submit-contact").post(submitContact);

// Admin Routes
router.route("/get-contacts").get(verifyAdmin, getAllContacts);
router.route("/get-contactdetails").get(getAdminContact)
router.route("/update-web-contact").patch(verifyAdmin, updateWebContactDetails);

export default router;
