const { Schema, model, mongoose } = require("mongoose");

const Subscription = new Schema({
  //   admin_id :{
  //   type : mongoose.Types.ObjectId,
  //   ref: "Users"
  // },
  admin_id: {
    type: String,
    required: true,
  },
  channel_id: {
    type: String,
    required: true,
  },
  months: {
    type: Number,
    required: true,
  },
  channel_name :{
    type : String,
    required : true
  },

  cost: {
    type: Number,
    required: true,
  },
});

module.exports = model("Subscription", Subscription);
