const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user:{
        type: mongoose.ObjectId,
        ref:'Users',
        required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required:true
    },
    done:{
        type:Boolean,
        default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", taskSchema);
