import express from "express";
import {
  createMessage,
  getMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router({ mergeParams: true });

router.route("/").post(createMessage).get(protect, getMessages);
router
  .route("/:id")
  .get(protect, getMessage)
  .delete(protect, deleteMessage)
  .put(protect, updateMessage);

export default router;
