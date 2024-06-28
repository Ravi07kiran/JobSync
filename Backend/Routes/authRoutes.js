const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/signups");
const Activity = require("../model/activity");
const session = require('express-session');

const verifyUser= require("../middleware/verifyUser");

const axios = require('./axiosConfig');

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

router.use(express.json());

const app = express();

app.use(session({
  secret: jwtSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 300000 }
}));

app.use((req, res, next) => {
if (req.session) {
    if (!req.session.startTime) {
        req.session.startTime = Date.now();
    } else if (Date.now() - req.session.startTime > 300000) { // 300000 milliseconds = 5 minutes
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            return res.status(440).send('Session expired');
        });
    }
}
next();
});



const logActivity = async (userId, username, action, details) => {
  try {
    const activity = new Activity({
      user: userId,
      name : username,
      action: action,
      details: details,
      timestamp: new Date(),
    });
    await activity.save();
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

router.get("/home", verifyUser, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const { password, ...others } = user._doc;
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "5m",
      });
      await logActivity(user._id, user.name, "Login", "User logged in.");
      return res.status(200).json({ others, token });
    } else {
      return res
        .status(401)
        .json({ error: "The password is incorrect. Try Again!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email is already registered. Please Login" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      };
      const createdUser = await userModel.create(newUser);
      res.json(createdUser);
      await logActivity(createdUser._id, createdUser.name, "Register", "User registered.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({ role: ["LC", "RM", "HR"] }, "_id name role email");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
    await logActivity(userId, user.name, "Delete User", `Deleted user ${userId}.`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update_user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ updatedUser });
    await logActivity(updatedUser._id, updatedUser.name, "Update User", `Updated user ${id}.`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in updating. Please try again." });
  }
});

router.get("/stock/:symbol", async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get('', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
