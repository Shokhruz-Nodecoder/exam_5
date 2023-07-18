const conn = require("../models/connection");

const User = require("../models/users.schema");

const usersSubscription = async (req, res) => {
  const { chanel_name } = req.body;
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
  } catch (error) {}
};


module.exports = {
   usersSubscription,
   userBalanceFill
}
