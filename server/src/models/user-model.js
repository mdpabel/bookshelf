const mongoose = require("mongoose");
const validator = require("validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   minlength: [3, "Name must contains 3 or more characters"],
  //   maxlength: [10, "Name can not be more than 12 characters"],
  //   required: [true, "Name cannot be empty"],
  //   trim: true,
  // },
  email: {
    type: String,
    // unique: [true, "The email is already registered!"],
    minlength: [3, "Email must contains 5 or more characters"],
    maxlength: [40, "Email can not be more than 40 characters"],
    required: [true, "Email cannot be empty"],
    trim: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid Email`,
    },
  },

  password: {
    type: String,
    minlength: [5, "Password must contains 5 or more characters"],
    required: [true, "Name cannot be empty"],
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// remove tokens and password before sending response
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

// hashed password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hashed = await bcrypt.hash(user.password, 8);
    user.password = hashed;
  }

  next();
});

// Generate auth token method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const secrete = process.env.jwt_secrete;
  const token = jwt.sign({ id: user.id.toString() }, secrete);
  user.tokens = [...user.tokens, { token: token }];
  await user.save();
  return token;
};

// findCredentials

userSchema.statics.findByCredentials = async function (User, email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid login credential");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(user.password);
  if (!isMatch) {
    throw new Error("Password invalid");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
