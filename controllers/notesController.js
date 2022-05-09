import asyncHandler from "express-async-handler";
import Notes from "../models/notes.js";

// @desc      Get single notes
// @route     GET /api/v1/notes/:id
// @access    Private/Admin
const getNote = asyncHandler(async (req, res) => {
  const notes = await Notes.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: notes,
  });
});

// @desc      Get all notess
// @route     GET /api/v1/notes
// @access    Private/Admin
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.find({});
  res.json(notes);
});

// @desc      Create notes
// @route     POST /api/v1/notes
// @access    Private/Admin
const createNotes = asyncHandler(async (req, res) => {
  const { user, title, description, isWorkOrder } = req.body;

  const notes = new Notes({
    user,
    title,
    description,
    isWorkOrder,
  });

  const creatednotes = await notes.save();

  res.status(201).json({
    success: true,
    data: creatednotes,
  });
});

// @desc      Update notes
// @route     PUT /api/v1/notes/:id
// @access    Private/Admin
const updateNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: notes,
  });
});

// @desc      Delete notes
// @route     DELETE /api/v1/notes/:id
// @access    Private/Admin
const deleteNotes = asyncHandler(async (req, res) => {
  await Notes.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

export { getNote, getNotes, createNotes, updateNotes, deleteNotes };
