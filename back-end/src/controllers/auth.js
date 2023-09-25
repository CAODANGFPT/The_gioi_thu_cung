import User from "../models/user";
import { signinSchema, signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role_id, phone, address } = req.body;
    const { error } = signupSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const checkEmail = await User.checkEmailExists(email);
    if (checkEmail) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser(name, email, hashedPassword, role_id, phone, address);
    const accessToken = jwt.sign({ id: userId }, "duantotnghiep", {
      expiresIn: "1d",
    });
    res.json({
      id: userId,
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.checkEmailExists(email);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }
    const accessToken = jwt.sign({ id: user.id }, "duantotnghiep", {
      expiresIn: "1d",
    });
    res.json({
      user,
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
