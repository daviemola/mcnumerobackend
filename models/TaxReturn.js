import mongoose from "mongoose";

const personalInfo = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: Number, required: true },
    insuranceNumber: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const address = mongoose.Schema(
  {
    street_number: { type: String, required: true },
    street_name: { type: String, required: true },
    apartment_number: { type: String, required: true },
    po_box: { type: String, required: true },
    route_number: { type: String, required: true },
    province: { type: String, required: true },
    postal_code: { type: String, required: true },
    in_care_of: { type: String, required: true },
    telephone: { type: Number, required: true },
    change_in_address: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const currentAddress = mongoose.Schema(
  {
    street_number: { type: String, required: true },
    street_name: { type: String, required: true },
    city: { type: String, required: true },
    apartment_number: { type: String, required: true },
    po_box: { type: String, required: true },
    route_number: { type: String, required: true },
    province: { type: String, required: true },
    postal_code: { type: String, required: true },
    in_care_of: { type: String, required: true },
    telephone: { type: Number, required: true },
    change_in_address: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const residence = mongoose.Schema(
  {
    province_lived_in_year: { type: String, required: true },
    province_changed: { type: String, required: true },
    did_immigrate: { type: String, required: true },
    is_canadian_citizen: { type: String, required: true },
    authorize: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const family = mongoose.Schema(
  {
    marital_status: { type: Boolean, required: true },
    change_marital_status: { type: Boolean, required: true },
    dependants: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const taxYear = mongoose.Schema(
  {
    marital_status: { type: Boolean, required: true },
    change_marital_status: { type: Boolean, required: true },
    dependants: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const taxReturnSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    personalinformation: [personalInfo],
    address: { address },
    currentAddress: { currentAddress },
    residence: { residence },
    family: { family },
    taxyear: { taxYear },
    moreInformation: { type: String },
    isComplete: { type: Boolean, required: true, default: false },
    //add files uploaded
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("TaxFile", taxReturnSchema);

export default Product;
