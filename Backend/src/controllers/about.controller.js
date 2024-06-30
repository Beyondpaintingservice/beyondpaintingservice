import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AboutUs } from "../models/aboutUs.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Controller function to add information about the team
const addAbout = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!req.file.path) {
    throw new ApiError(500, "Image file is required");
  }
  const photo_url = await uploadOnCloudinary(req.file.path);

  const newAbout = await AboutUs.create({
    title,
    description,
    photo:
      photo_url?.secure_url ||
      "https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg",
  });

  if (!newAbout) {
    throw new ApiError(500, "Error adding about section");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newAbout, "About section added successfully"));
});
const getAbout = asyncHandler(async (req, res) => {
  try {
    // Fetch the latest about section from the database
    const about = await AboutUs.findOne().sort({ createdAt: -1 });

    if (!about) {
      throw new ApiError(404, "No about section found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, about, "About section fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Error fetching about section"));
  }
});
  

// Controller function to update information about the team
const updateAbout = asyncHandler(async (req, res) => {
	const { title, description } = req.body;

	if (!req.file.path) {
		throw new ApiError(500, "Image file is required");
	}

	const photo_url = await uploadOnCloudinary(req.file.path);

	const updatedAbout = await AboutUs.findOneAndUpdate(
		{},
		{
			title,
			description,
			photo:
				photo_url?.secure_url ||
				"https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg",
		},
		{ new: true }
	);

	if (!updatedAbout) {
		throw new ApiError(500, "Error updating about section");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, updatedAbout, "About section updated successfully"));
});

export { addAbout, getAbout, updateAbout };
