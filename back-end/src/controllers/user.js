import bcrypt from "bcryptjs";
import User from "../models/user";


export const list = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listUsersRole = async (req, res) => {
  try {
    const users = await User.getAllUsersRole();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  try {
    bcrypt.compare(email, token, (err, result) => {
      console.log("compare", result);
      if (result == true) {
        bcrypt
          .hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
          .then(async (password) => {
            await User.resetPassword(email, password);
            res.status(200).json({
              message: "Đổi mật khẩu thành công",
            });
          });
      } else {
        res.status(400).json({
          message: "Đổi mật khẩu thất bại",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
export const updateRole = async (req, res) => {
  try {
    const { role_id } = req.body;
    await User.updateUserRole(req.params.id, role_id);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const usersItem = await User.getUserById(req.params.id);
    if (!usersItem) {
      res.status(404).json({ error: "UserItem not found" });
    } else {
      res.json(usersItem);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};