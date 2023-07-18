const { Schema, model,mongoose } = require("mongoose");

const Channel = new Schema(
  {
    name:{
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    admin_id :{
      type : mongoose.Types.ObjectId,
      ref: "Users"
    }
  }
);


module.exports = model("Channel", Channel)
