const Channel = require("../models/channels.schema");

const create = async (req, res) => {
  try {
    const { name, admin_id } = req.body;
    console.log(req.body);

    await Channel.create({ name, admin_id });

    res.status(200).json({ message: "Successfully created channel" });
  } catch (error) {
    res.status(500).json({ message: "Error creating channel" });
  }
};

const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find();
    res.status(200).json({ message : "Success", channels: channels });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, getAllChannels };
