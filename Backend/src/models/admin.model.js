import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		avatar: {
			type: String, // cloudinary url
			required: false,
			default:
				"https://as2.ftcdn.net/v2/jpg/02/44/43/69/1000_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

adminSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
			fullName: this.fullName,
			isAdmin: this.isAdmin,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

adminSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			isAdmin: this.isAdmin,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};

export const Admin = mongoose.model("Admin", adminSchema);
