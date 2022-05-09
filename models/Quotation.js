import mongoose from "mongoose";

const quotationSchema = mongoose.Schema(
  {
    payableFee: {
      type: Number,
      required: "Please enter a payable fee.",
    },
    estimatedTime: {
      type: Number,
      required: "Please enter an estimated time.",
    },
    totalFee: {
      type: Number,
      required: "Please enter the total fee.",
    },
    isVerified: {
      type: Boolean,
    },
    isPaid: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Quotations = mongoose.model("Quotations", quotationSchema);

export default Quotations;
