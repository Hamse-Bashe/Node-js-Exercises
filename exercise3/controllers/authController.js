import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// Register
export const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    // email = email.toLowerCase();
    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: `This ${email} is already used` });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: `Invalid email or password` });

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

