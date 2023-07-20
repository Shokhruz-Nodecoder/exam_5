const Channel = require("../models/channels.schema");
const followersSchema = require("../models/followers.schema");

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
    res.status(200).json({ message: "Success", channels: channels });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const showFollowers = async (req, res) => {
  try {
    const { channel_id } = req.params;
    const { admin_id } = req.body;

    const followers = await followersSchema.find({ channel_id: channel_id });
    const channel = await Channel.find({ _id: channel_id });
    const channelAdmin = channel[0].admin_id;
    if (channelAdmin == admin_id) {
      res.status(200).json({ message: "Your channel followers: ", followers });
    } else {
      res.status(402).json({ message: "Not allowed for you" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "incorrect user_id or channel_id",
        error: error.message,
      });
  }
};

module.exports = { create, getAllChannels, showFollowers };
