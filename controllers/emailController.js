import asyncHandler from "express-async-handler";
import Email from "../models/email.js";

// @desc      Get single email
// @route     GET /api/v1/emails/:id
// @access    Private/Admin
const getEmail = asyncHandler(async (req, res) => {
  const email = await Email.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: email,
  });
});

// @desc      Get all emails
// @route     GET /api/v1/emails
// @access    Private/Admin
const getEmails = asyncHandler(async (req, res) => {
  const emails = await Email.find({});
  res.json(emails);
});

// @desc      Create email
// @route     POST /api/v1/emails
// @access    Private/Admin
const createEmail = asyncHandler(async (req, res) => {
  const { to, from, title, message } = req.body;

  const email = new Email({
    to,
    from,
    title,
    message,
  });

  const createdemail = await email.save();

  res.status(201).json({
    success: true,
    data: createdemail,
  });
});

// @desc      Update email
// @route     PUT /api/v1/emails/:id
// @access    Private/Admin
const updateEmail = asyncHandler(async (req, res) => {
  const email = await Email.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: email,
  });
});

// @desc      Delete email
// @route     DELETE /api/v1/emails/:id
// @access    Private/Admin
const deleteEmail = asyncHandler(async (req, res) => {
  await Email.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

export { getEmail, getEmails, createEmail, updateEmail, deleteEmail };
