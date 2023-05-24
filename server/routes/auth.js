const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const verifyToken = require("../middleware/auth.js");

router.get("/", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user_id).select("-password");
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User not found",
			});
		}

		res
			.status(200)
			.json({ success: true, message: "User has logged", user: user });
	} catch (error) {
		console.log(error);
		res.status(404).json({
			success: false,
			message: "Internal Server",
			error: error.message,
		});
	}
});

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
				message: "Your username already in use",
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
			process.env.ACCESS_TOKEN_SECRET
		);

		res.status(200).json({
			success: true,
			message: "User registered successfully",
			accessToken: accessToken,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			success: false,
			message: "Internal Server",
			error: error.message,
		});
	}
});

///@POST LOGIN

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	// Check if the user has fill username and password
	if (!username || !password) {
		return res.status(400).json({
			success: false,
			message: "Missing username or password",
		});
	}

	try {
		// Find the user
		const user = await User.findOne({ username: username });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "Your username or password is incorrect",
			});
		}

		// User founded
		const passwordValid = await argon2.verify(user.password, password);
		if (!passwordValid) {
			return res.status(404).json({
				success: false,
				message: "Your username or password is incorrect",
			});
		}

		const accessToken = jwt.sign(
			{ user_id: user._id },
			process.env.ACCESS_TOKEN_SECRET
		);
		res.json({
			success: true,
			message: "User logged in successfully",
			accessToken: accessToken,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			success: false,
			message: "Internal Server",
			error: error.message,
		});
	}
});

module.exports = router;
