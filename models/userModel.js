const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      unique: true,
      type: Number,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
