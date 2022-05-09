import express from "express";
import {
  getTaxReturn,
  getTaxReturns,
  createTaxReturn,
  updateTaxReturn,
  deleteTaxReturn,
  addPersonalInfo,
  addAddress,
  addCurrentAddress,
  addFamily,
  addTaxYear,
  addResidence,
} from "../controllers/taxReturnController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.route("/").post(protect, createTaxReturn).get(protect, getTaxReturns);
router.route("/:id/personalinfo").post(protect, addPersonalInfo);
router.route("/:id/address").post(protect, addAddress);
router.route("/:id/currentaddress").post(protect, addCurrentAddress);
router.route("/:id/family").post(protect, addFamily);
router.route("/:id/residence").post(protect, addResidence);
router.route("/:id/taxyear").post(protect, addTaxYear);
router
  .route("/:id")
  .get(protect, getTaxReturn)
  .delete(protect, deleteTaxReturn)
  .put(protect, updateTaxReturn);

export default router;
