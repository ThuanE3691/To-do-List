const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");



/// @POST REGISTER USER

router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	// Check if the user has fill username and password
	if (!username || !password) {
		return res.status(400).json({
			success: false,
			message: "Missing username or password",
		});
	}

	try {
		// Check the user has unique or not
		const user = await User.findOne({ username: username });
		if (user) {
			return res.status(400).json({
				success: false,
				message: "Your username already taken",
			});
		}

		// All good

		// Hashed the password that user has register

		const hashedPassword = await argon2.hash(password);

		const newUser = await User.create({
			username: username,
			password: hashedPassword,
		});

		await newUser.save();

		// Return token
		const accessToken = jwt.sign(
			{
				user_id: newUser._id,
			},
			process.env.ACCESS_TOKEN
		);

		res.status(200).json({
			success: true,
			message: "User registered successfully",
			accessToken: accessToken,
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: "Internal Server",
			error: error,
		});
	}
});

module.exports = router;
