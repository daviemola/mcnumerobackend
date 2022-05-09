import asyncHandler from "express-async-handler";
import Quotation from "../models/quotation.js";

// @desc      Get single quotation
// @route     GET /api/v1/quotations/:id
// @access    Private/Admin
const getQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: quotation,
  });
});

// @desc      Get all quotations
// @route     GET /api/v1/quotations
// @access    Private/Admin
const getQuotations = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find({});
  res.json(quotations);
});

// @desc      Create quotation
// @route     POST /api/v1/quotations
// @access    Private/Admin
const createQuotation = asyncHandler(async (req, res) => {
  console.log("we getting here");
  const { payableFee, estimatedTime, totalFee, isVerified, isPaid } = req.body;
  console.log(req.body);

  const quotation = new Quotation({
    payableFee,
    estimatedTime,
    totalFee,
    isVerified,
    isPaid,
  });

  const createdquotation = await quotation.save();

  res.status(201).json({
    success: true,
    data: createdquotation,
  });
});

// @desc      Update quotation
// @route     PUT /api/v1/quotations/:id
// @access    Private/Admin
const updateQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: quotation,
  });
});

// @desc    Update quotation to paid
// @route   GET /api/quotations/:id/pay
// @access  Private
const updateQuotationToPaid = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  if (quotation) {
    quotation.isPaid = true;
    quotation.paidAt = Date.now();
    quotation.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedquotation = await quotation.save();
    res.json(updatedquotation);
  } else {
    res.status(404);
    throw new Error("quotation not found");
  }
});

// @desc    Update quotation to delivered
// @route   GET /api/quotations/:id/deliver
// @access  Private/Admin
const updateQuotationToVerified = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  if (quotation) {
    quotation.isVerified = true;
    quotation.verifiedAt = Date.now();

    const updatedquotation = await quotation.save();

    res.json(updatedquotation);
  } else {
    res.status(404);
    throw new Error("quotation not found");
  }
});

// @desc      Delete quotation
// @route     DELETE /api/v1/quotations/:id
// @access    Private/Admin
const deleteQuotation = asyncHandler(async (req, res) => {
  await Quotation.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

export {
  getQuotation,
  getQuotations,
  createQuotation,
  updateQuotation,
  deleteQuotation,
  updateQuotationToPaid,
  updateQuotationToVerified,
};
