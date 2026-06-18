const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signUp = async (req, res) => {
  
  console.log("Signup route hit");

  try {
 const { name, email, password } = req.body;

const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    message: "User already exists",
      });
    }

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
    });

res.status(201).json({
  message: "Signup Successful",
    user: {
   name: user.name,
    email: user.email,
  },

    });
  } catch (error) {
  res.status(500).json({
      message: error.message,
    });
  }
};


exports.logIn = async (req, res) => {
  try {
      const { email, password } = req.body;

const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

const match = await bcrypt.compare(
      password,
      user.password
    );

if (!match) {
   return res.status(400).json({
   message: "Wrong Password",
      });
    }

    const token = jwt.sign(
      {
    id: user._id,
      },
process.env.JWT_SECRET,
      {
     expiresIn: "1d",
      }
    );

    res.status(200).json({
   message: "Login Successful",
      token,
    });
  } catch (error) {
res.status(500).json({
   message: error.message,
    });
  }
};