import User from "../models/User.js"
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({message:"Email and password are required."})
    }
    const user = await User.findOne({
      email:email.toLowerCase()
    })
    if (!user) {
      return res.status(401).json({message:"Invalid email or password"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({message:"Invalid email or password"})
    }

    const token = generateToken(user._id);
    return res.status(200).json({
      message: "Login successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
     return res.status(500).json({
      message: `Login error: ${error}`
    });
  }
}