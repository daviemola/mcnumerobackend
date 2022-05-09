import asyncHandler from "express-async-handler";
import Message from "../models/message.js";

// @desc      Get single message
// @route     GET /api/v1/messages/:id
// @access    Private/Admin
const getMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: message,
  });
});

// @desc      Get all messages
// @route     GET /api/v1/messages
// @access    Private/Admin
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({});
  res.json(messages);
});

// @desc      Create message
// @route     POST /api/v1/messages
// @access    Private/Admin
const createMessage = asyncHandler(async (req, res) => {
  console.log("we are gettinghere");
  const { sender, content, chat, isClientChat } = req.body;

  const message = new Message({
    sender,
    isClientChat,
    content,
    chat,
  });

  const createdMessage = await message.save();
  res.status(201).json({
    success: true,
    data: createdMessage,
  });
});

// @desc      Update message
// @route     PUT /api/v1/messages/:id
// @access    Private/Admin
const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: message,
  });
});

// @desc      Delete message
// @route     DELETE /api/v1/messages/:id
// @access    Private/Admin
const deleteMessage = asyncHandler(async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});

export { getMessage, getMessages, createMessage, updateMessage, deleteMessage };
