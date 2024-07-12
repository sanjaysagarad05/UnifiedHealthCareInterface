const express = require("express");
const router = express.Router();
const User = require("./usermodel");
const bcrypt = require("bcrypt");

router.post("/userlogin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "loggedin successfully", user });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

module.exports = router;
