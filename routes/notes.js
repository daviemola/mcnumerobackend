import express from "express";
import {
  getNote,
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
} from "../controllers/notesController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router({ mergeParams: true });

router.route("/").post(createNotes).get(protect, getNotes);
router
  .route("/:id")
  .get(protect, getNote)
  .delete(protect, deleteNotes)
  .put(protect, updateNotes);

export default router;
