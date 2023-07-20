const conn = require("../models/connection");
const Channel = require("../models/channels.schema");
const Subscription = require("../models/subscp.schema");

const usersSchema = require("../models/users.schema");
const followersSchema = require("../models/followers.schema");

const usersSubscription = async (req, res) => {
  const { user_id, months, cost } = req.body;
  const { channel_id } = req.params;
  const session = await conn.startSession();

  const userBalance = await usersSchema.findById(user_id);
  const checkChannel = await Subscription.find({ channel_id: channel_id });
  // console.log(checkChannel);
  const checkUserFollow = await followersSchema.find({
    channel_id: channel_id,
  });
  console.log(checkUserFollow);

  if (checkUserFollow.length < 1) {
    const costMonth = checkChannel.some(
      (data) => data.months === months && data.cost === cost
    );

    const channelBalance = await Channel.findById(channel_id);
    const channelAdmin = await channelBalance.admin_id;
    const admin_id = await usersSchema.findById(channelAdmin);

    if (cost === undefined) {
      res
        .status(404)
        .json({ message: "Please provide a value for the channel payment" });

      if (userBalance.balance > cost || cost < 0) {
        return res.status(404).json({ message: "not enough balance" });
      }
    } else if (costMonth) {
      userBalance.status = "active";

      console.log(userBalance.status);

      userBalance.expirationDate = new Date(
        new Date().getTime() + months * 30 * 24 * 60 * 60 * 1000
      );

      userBalance.balance = userBalance.balance - cost;
      admin_id.balance = admin_id.balance + cost;

      const newFollower = new followersSchema({
        startDate: new Date(),
        endDate: userBalance.expirationDate,
        user_id,
        channel_id,
        status: userBalance.status,
        cost: cost,
        months,
      });

      await session.withTransaction(async () => {
        await userBalance.save();
        await newFollower.save();
        await admin_id.save();
      });

      session.endSession();

      return res.json({ message: "Successfully transaction finished" });
    }
  } else {
    res.status(402).json({ message: "You already subscribed" });
  }
};
const userBalanceFill = async (req, res) => {
  try {
    const { user_id, money } = req.body;

    const session = await conn.startSession();
    const userBalance = await User.findById(user_id);

    if (!userBalance) {
      return res.status(404).json({ message: "User not found" });
    }

    userBalance.balance += money;

    await session.withTransaction(async () => {
      await userBalance.save();
    });

    session.endSession();
    res.status(200).json({ message: "Balance successfully filled" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

const userStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await followersSchema.find({ user_id: id });
    if (user) {
      const channelId = user[0].channel_id;
      const channel = await followersSchema.find({ channel_id: channelId });
      const channelName = await Channel.find({ _id: channelId });
      return res.status(200).json({
        message: `User status: ${user[0].status}`,
        ChannelName: channelName[0].name,
        Channel: channel.length ? channel : "Not found",
      });
    } else {
      res.status(404).json({ message: "Not followed channels" });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = {
  usersSubscription,
  userBalanceFill,

  userStatus,
};
