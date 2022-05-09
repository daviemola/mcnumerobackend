import asyncHandler from "express-async-handler";
import TaxReturns from "../models/TaxReturn.js";

// @desc      Get single taxretun
// @route     GET /api/v1/taxretuns/:id
// @access    Private/Admin
const getTaxReturn = asyncHandler(async (req, res) => {
  const taxReturns = await TaxReturns.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: taxReturns,
  });
});

// @desc      Get all taxReturnss
// @route     GET /api/v1/taxReturns
// @access    Private/Admin
const getTaxReturns = asyncHandler(async (req, res) => {
  const taxReturnss = await TaxReturns.find({});
  res.json(taxReturnss);
});

// @desc      Create taxReturns
// @route     POST /api/v1/taxReturns
// @access    Private/Admin
const createTaxReturn = asyncHandler(async (req, res) => {
  const taxReturns = await TaxReturns.create({
    user: req.user._id,
    isComplete: false,
  });

  res.status(201).json({
    success: true,
    data: taxReturns,
  });
});

// @desc    Add personal information to a tax return
// @route   POST /api/taxreturns/:id/personalinfo
// @access  Private
const addPersonalInfo = asyncHandler(async (req, res) => {
  // console.log(req.body);
  console.log("we are getting here");
  const {
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    phoneNumber,
    insuranceNumber,
  } = req.body;

  const taxfile = await TaxReturns.findById(req.params.id);

  if (taxfile) {
    if (taxfile.personalinformation.length !== 0) {
      res.status(404);
      throw new Error("Personal Information has already been filled");
    }

    const personalInfo = {
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      phoneNumber,
      insuranceNumber,
    };

    taxfile.personalinformation.push(personalInfo);
    console.log(taxfile);

    // await taxfile.save();
    res.status(201).json({ message: "Personal Info added" });
  } else {
    res.status(404);
    throw new Error("Tax File not found");
  }
});

// @desc     Add address to a tax return
// @route   POST /api/taxreturns/:id/address
// @access  Private
const addAddress = asyncHandler(async (req, res) => {
  // console.log(req.body);
  console.log("we are getting here");
  const {
    street_number,
    street_name,
    apartment_number,
    po_box,
    route_number,
    province,
    postal_code,
    in_care_of,
    telephone,
    change_in_address,
  } = req.body;

  const taxfile = await TaxReturns.findById(req.params.id);

  if (taxfile) {
    if (taxfile.personalinformation.length !== 0) {
      res.status(404);
      throw new Error("Address has already been added");
    }

    const addressInfo = {
      street_number,
      street_name,
      apartment_number,
      po_box,
      route_number,
      province,
      postal_code,
      in_care_of,
      telephone,
      change_in_address,
    };

    taxfile.address.push(addressInfo);
    console.log(taxfile);

    // await taxfile.save();
    res.status(201).json({ message: "Address information added" });
  } else {
    res.status(404);
    throw new Error("Tax File not found");
  }
});

// @desc     Add Current address to a tax return
// @route   POST /api/taxreturns/:id/currentaddress
// @access  Private
const addCurrentAddress = asyncHandler(async (req, res) => {
  // console.log(req.body);
  console.log("we are getting here");
  const {
    street_number,
    street_name,
    apartment_number,
    po_box,
    route_number,
    province,
    postal_code,
    in_care_of,
    telephone,
    change_in_address,
  } = req.body;

  const taxfile = await TaxReturns.findById(req.params.id);

  if (taxfile) {
    if (taxfile.personalinformation.length !== 0) {
      res.status(404);
      throw new Error("Address has already been added");
    }

    const addressInfo = {
      street_number,
      street_name,
      apartment_number,
      po_box,
      route_number,
      province,
      postal_code,
      in_care_of,
      telephone,
      change_in_address,
    };

    taxfile.currentAddress.push(addressInfo);
    console.log(taxfile);

    // await taxfile.save();
    res.status(201).json({ message: "Address information added" });
  } else {
    res.status(404);
    throw new Error("Tax File not found");
  }
});

// @desc     Add residence to a tax return
// @route   POST /api/taxreturns/:id/residence
// @access  Private
const addResidence = asyncHandler(async (req, res) => {
  // console.log(req.body);
  console.log("we are getting here");
  const {
    province_lived_in_year,
    province_changed,
    did_immigrate,
    is_canadian_citizen,
    authorize,
  } = req.body;

  const taxfile = await TaxReturns.findById(req.params.id);

  if (taxfile) {
    if (taxfile.personalinformation.length !== 0) {
      res.status(404);
      throw new Error("Residence has already been added");
    }

    const addressInfo = {
      province_lived_in_year,
      province_changed,
      did_immigrate,
      is_canadian_citizen,
      authorize,
    };

    taxfile.residence.push(addressInfo);
    console.log(taxfile);

    // await taxfile.save();
    res.status(201).json({ message: "Address information added" });
  } else {
    res.status(404);
    throw new Error("Tax File not found");
  }
});

// @desc     Add family information to a tax return
// @route   POST /api/taxreturns/:id/family
// @access  Private
const addFamily = asyncHandler(async (req, res) => {
  const { marital_status, change_marital_status, dependants } = req.body;
  const taxfile = await TaxReturns.findById(req.params.id);

  if (taxfile) {
    if (taxfile.personalinformation.length !== 0) {
      res.status(404);
      throw new Error("Family information has already been added");
    }

    const familyInfo = {
      marital_status,
      change_marital_status,
      dependants,
    };

    taxfile.family.push(familyInfo);
    console.log(taxfile);

    // await taxfile.save();
    res.status(201).json({ message: "Family information added" });
  } else {
    res.status(404);
    throw new Error("Tax File not found");
  }
});

// @desc     Add tax year to a tax return
// @route   POST /api/taxreturns/:id/taxyear
// @access  Private
const addTaxYear = asyncHandler(async (req, res) => {
  const { marital_status, change_marital_status, dependants } = req.body;
  const taxfile = await TaxReturns.findById(req.params.id);

  if (taxfile) {
    if (taxfile.personalinformation.length !== 0) {
      res.status(404);
      throw new Error("Tax Year info has already been added");
    }

    const taxYearInfo = {
      marital_status,
      change_marital_status,
      dependants,
    };

    taxfile.taxyear.push(taxYearInfo);
    console.log(taxfile);

    // await taxfile.save();
    res.status(201).json({ message: "Tax Year info added" });
  } else {
    res.status(404);
    throw new Error("Tax File not found");
  }
});

// @desc      Update taxReturns
// @route     PUT /api/v1/taxReturnss/:id
// @access    Private/Admin
const updateTaxReturn = asyncHandler(async (req, res) => {
  const taxReturns = await TaxReturns.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: taxReturns,
  });
});

// @desc      Delete taxReturns
// @route     DELETE /api/v1/taxReturnss/:id
// @access    Private/Admin
const deleteTaxReturn = asyncHandler(async (req, res) => {
  await TaxReturns.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

export {
  addPersonalInfo,
  addCurrentAddress,
  addResidence,
  addFamily,
  addAddress,
  addTaxYear,
  getTaxReturn,
  getTaxReturns,
  createTaxReturn,
  updateTaxReturn,
  deleteTaxReturn,
};
