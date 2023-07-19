const Subscription = require("../models/subscp.schema");
const Channel = require("../models/channels.schema");
const User = require("../models/users.schema");
const create = async (req, res) => {
  try {
    const { channel_id } = req.params;

    const { admin_id, months, cost } = req.body;
    const channel = await Channel.findById(channel_id);

    const findMonths = (
      await Subscription.find({ channel_id: channel.id })
    ).some((values) => values.months === months && values.cost === cost);

    const name = channel.name;
    const IsAdmin = (await User.findById(channel.admin_id))._id;
    console.log(findMonths);

    if (IsAdmin == admin_id) {
      if (findMonths) {
        return res.status(405).json({ message: "This data already added" });
      } else {
        console.log("safasga");
        const data = await Subscription.create({
          admin_id,
          channel_id,
          channel_name: name,
          months,
          cost,
        });
        return res.status(200).json({ message: "Success", data: data });
      }
    }

    res.status(403).json({ message: error.message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { create };
