import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendMail from "../utils/emailSending.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  console.log(userExists);

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      token: generateToken(user._id),
      user,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Forgot Password
// @route   Post /api/users/forgotpassword
// @access  Private/Admin
const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error("User with that email not found");
  }

  //get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  // console.log(user);

  try {
    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/resetpassword/${resetToken}`;
    // console.log(resetUrl);

    const message = `Kindly use this token to reset your password. ${resetUrl}`;
    await sendMail({
      email: "daviemola@gmail.com",
      subject: "Password Reset Request",
      message,
    })
      .then(() => {
        console.log("we sent the email successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    res.status(200).json({
      success: true,
      data: "Confirmation Email sent. Check your email.",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500);
    throw new Error("Email could not be sent.");
  }
});

// @desc    Reset Password
// @route   Post /api/vq/auth/resetpassword/:token
// @access  Private/Admin
const resetPassword = asyncHandler(async (req, res) => {
  try {
    console.log(req.params);
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    // console.log(resetPasswordToken);

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    console.log("User here " + user);

    if (!user) {
      res.status(500);
      throw new Error("Invalid token.");
    }

    // console.log(user);

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const message = `Your password has been reset successfully. Go ahead and login. `;
    await sendMail({
      email: "daviemola@gmail.com",
      subject: "Password Reset Successful",
      message,
    })
      .then(() => {
        console.log("we sent the email successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500);
    throw new Error("Password couldn't be changed.");
  }
});

export {
  registerUser,
  resetPassword,
  authUser,
  updateUserProfile,
  getUserProfile,
  forgotPassword,
};
