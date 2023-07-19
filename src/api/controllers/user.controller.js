const conn = require("../models/connection");
const Channel = require("../models/channels.schema");
const Subscription = require("../models/subscp.schema");

const User = require("../models/users.schema");

const usersSubscription = async (req, res) => {
  try {
    const { user_id, months, cost } = req.body;
    const { channel_id } = req.params;
    const userBalance = await User.findById(user_id);
    const channel = await Channel.findById(channel_id);
    const adminBalance = await User.findById(channel.admin_id);

    const findMonths = (
      await Subscription.find({ channel_id: channel.id })
    ).some((values) => values.months === months && values.cost === cost);

    if (findMonths) {
      const session = await conn.startSession();

      if (!userBalance) {
        return res.status(404).json({ message: "User not found" });
      } else if (userBalance.balance < cost || cost < 0) {
        return res.status(404).json({ message: "Balance not enough" });
      }

      userBalance.balance = userBalance.balance - cost;
      adminBalance.balance = adminBalance.balance + cost;

      await session.withTransaction(async () => {
        await userBalance.save();
        await adminBalance.save();
      });


      
      session.endSession();

      res.status(200).json({ message: "Payment successfully finished" });
    } else {
      return res
        .status(404)
        .json({ message: "This Subscription is not authorized" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
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

module.exports = {
  usersSubscription,
  userBalanceFill,
};
