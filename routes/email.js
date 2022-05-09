import express from "express";
import {
  getEmail,
  getEmails,
  createEmail,
  updateEmail,
  deleteEmail,
} from "../controllers/emailController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router({ mergeParams: true });

router.route("/").post(createEmail).get(protect, getEmails);
router
  .route("/:id")
  .get(protect, getEmail)
  .delete(protect, deleteEmail)
  .put(protect, updateEmail);

export default router;
