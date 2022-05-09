import express from "express";
import {
  createChat,
  getChat,
  getChats,
  updateChat,
  deleteChat,
} from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router({ mergeParams: true });

router.route("/").post(protect, createChat).get(protect, getChats);
router
  .route("/:id")
  .get(protect, getChat)
  .delete(protect, deleteChat)
  .put(protect, updateChat);

export default router;
