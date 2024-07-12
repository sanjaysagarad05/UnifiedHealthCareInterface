const express = require("express");
const router = express.Router();
const doctor = require("./doctormodel");
const bcrypt = require("bcrypt");

router.post("/doctorlogin", async (req, res) => {
  try {
    const doctor = await doctor.findOne({ email: req.body.email });
    if (!doctor) {
      return res
        .status(200)
        .send({ message: "doctor does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.email, doctor.email);

    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "email is not registered", success: false });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "loggedin successfully", doctor });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

module.exports = router;
