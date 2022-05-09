import asyncHandler from "express-async-handler";
import Chat from "../models/chat.js";

// @desc      Get single chat
// @route     GET /api/v1/chats/:id
// @access    Private/Admin
const getChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: chat,
  });
});

// @desc      Get all chats
// @route     GET /api/v1/chats
// @access    Private/Admin
const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({});
  res.json(chats);
});

// @desc      Create chat
// @route     POST /api/v1/chats
// @access    Private/Admin
const createChat = asyncHandler(async (req, res) => {
  const { users, isClientChat, chatName } = req.body;

  users.push(req.user._id);
  const chat = new Chat({
    users,
    isClientChat,
    chatName,
  });
  const createdchat = await chat.save();
  res.status(201).json({
    success: true,
    data: createdchat,
  });
});

// @desc      Update chat
// @route     PUT /api/v1/chats/:id
// @access    Private/Admin
const updateChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: chat,
  });
});

// @desc      Delete chat
// @route     DELETE /api/v1/chats/:id
// @access    Private/Admin
const deleteChat = asyncHandler(async (req, res) => {
  await Chat.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});

export { createChat, updateChat, deleteChat, getChat, getChats };
