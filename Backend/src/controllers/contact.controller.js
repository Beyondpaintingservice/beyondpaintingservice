import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ContactUsUser } from "../models/contactUsUser.model.js";
import { ContactUsAdmin } from "../models/contactUsAdmin.model.js";

// user route
const submitContact = asyncHandler(async (req, res) => {
	const { fullName, email, phone, message } = req.body;

	if ([fullName, email, phone, message].some((field) => field?.trim() === "")) {
		throw new ApiError(400, "All fields are required");
	}

	const contactForm = await ContactUsUser.create({
		fullName,
		email,
		phone,
		message,
	});

	if (!contactForm) {
		throw new ApiError(500, "Something went wrong while submitting contact form");
	}
	return res
		.status(201)
		.json(new ApiResponse(201, contactForm, "Your query submitted successfully"));
});

// user route
const getAllContacts = asyncHandler(async (req, res) => {
	const admin = req.admin;

	if (!admin) {
		throw new ApiError(500, "Unauthorized request");
	}

	const contacts = await ContactUsUser.find({});

	return res.status(200).json(new ApiResponse(200, contacts, "Data fetched successfully"));
});

// Admin route
// Controller function to handle updating contact details
const updateWebContactDetails = asyncHandler(async (req, res) => {
	const { _id, address, firstPhoneNo, secondPhoneNo, mapLink, email } = req.body;

	const updatedContact = await ContactUsAdmin.findByIdAndUpdate(
		{ _id },
		{ address, firstPhoneNo, secondPhoneNo, mapLink, email },
		{ new: true }
	);

	if (!updatedContact) {
		throw new ApiError(500, "Error updating contact details");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, updatedContact, "Contact details updated successfully"));
});

const getAdminContact = asyncHandler(async (req, res) => {

	try {
		const contactDetails = await ContactUsAdmin.findOne();
		if (!contactDetails) {
			return res.status(404).json({ message: "Contact details not found" });
		}
		res.status(200).json(contactDetails);
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}

})

export { submitContact, getAllContacts, updateWebContactDetails, getAdminContact };
