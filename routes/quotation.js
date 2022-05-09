import express from "express";
import {
  getQuotations,
  getQuotation,
  createQuotation,
  updateQuotation,
  deleteQuotation,
  updateQuotationToPaid,
  updateQuotationToVerified,
} from "../controllers/quotationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.route("/").post(createQuotation).get(protect, getQuotations);
router
  .route("/:id")
  .get(protect, getQuotation)
  .delete(protect, deleteQuotation)
  .put(protect, updateQuotation);
router.route("/:id/pay").put(protect, updateQuotationToPaid);
router.route("/:id/verify").put(protect, updateQuotationToVerified);

export default router;
