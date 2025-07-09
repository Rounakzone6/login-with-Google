const userModel = require("../models/userModel.js");
const { oauth2client } = require("../utils/googleConfig.js");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const { access_token } = googleRes.tokens; // ✅ Fix

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
    );

    const { email, name, picture } = userRes.data;

    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({ name, email, image: picture });
    }

    const { _id } = user;
    const token = jwt.sign({ id: _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    return res.status(200).json({
      success: true,
      message: "Success",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { googleLogin };
