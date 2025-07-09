const { googleLogin } = require("../controllers/userController.js");

const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("Test pass");
});

router.get("/google", googleLogin);

module.exports = router;
