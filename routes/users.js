import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.route("/").post(createUser).get(protect, getUsers);
router
  .route("/:id")
  .get(protect, getUser)
  .delete(protect, deleteUser)
  .put(protect, updateUser);

export default router;
