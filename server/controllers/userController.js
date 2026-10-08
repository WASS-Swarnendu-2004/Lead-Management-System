import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
       return res.status(400).json({
        message: "Name, email, password and role are required"
      });
    }
    if (!["admin", "manager", "sales"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: `Create User Error: ${error}`
    });
  }
}


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 })
    return res.status(200).json({
      count: users.length,
      users
    })
  } catch (error) {
    return res.status(500).json({message: `Get all error: ${error}`})
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    return res.status(200).json({user})
  } catch (error) {
     return res.status(500).json({
      message: `Get single user error : ${error}`
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    if (role && !["admin", "manager", "sales"].includes(role)) {
       return res.status(400).json({
        message: "Invalid role"
      })
    }

    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: {$ne : req.params.id}
      })

      if (existingUser) {
        return res.status(400).json({
          message: "Email already belongs to another user"
        })
      }
      user.email = email.toLowerCase().trim()
    }
    if (name) {
      user.name = name.trim();
    }
     if (role) {
      user.role = role;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt
      }
    })
  } catch (error) {
    return res.status(500).json({
      message: `update user error: ${error}`
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot delete your own account"
      })
    }
    if (user.role === "admin") {
      const adminCount = await User.countDocuments({
        role: "admin"
      });

      if (adminCount <= 1) {
        return res.status(400).json({
          message: "Cannot delete the last admin"
        });
      }
    }
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "User deleted successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: `Delete user error: ${error}`
    })
  }
}