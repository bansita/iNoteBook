const express = require("express");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");
var router = express.Router();

const JWT_SECRET = "Prabisa";
//Rote:1 create a user using "/api/auth//createuser".No login required
router.post(
  "/createuser",
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    let success=false;
    // if there are errors ,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ success,errors: errors.array() });
    }
    // check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,errors: "Sorry! A user with this email already" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Some error occured");
    }
  }
);
//Route:2 Authenticate a user using post:"/api/auth/login".No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    // if there are error,then send bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(success,{ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ success,error: "please try to login using valid credentials " });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return  res
        .status(400)
        .json({ success,error: "please try to login using valid credentials " });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,authtoken})

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
//Route:3 loggedin user details using:post "/api/auth/getuser".login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Internal server error");
  }
});
module.exports = router;
