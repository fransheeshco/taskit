import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_KEY, { expiresIn: "3d" });
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const isUser = await User.findOne({ email });

    if (isUser) {
      throw Error("Email already in use");
    }

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id);
    res.status(200).json({ username ,email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = createToken(user._id);
    res.json({
      email: user.email,
      username: user.username,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token").send("Logged out successfully");
};

const userControllers = {
  signUp,
  login,
  logout,
};

export default userControllers;
