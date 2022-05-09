import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
// import findOrCreate from "mongoose-findorcreate";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: "Please enter an email",
      unique: true,
    },
    password: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.plugin(findOrCreate);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  console.log("we r get reset token");
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hash the token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model("Users", userSchema);

export default Users;
