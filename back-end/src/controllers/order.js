import User from "../models/user";
import Orders from "../models/order";
import jwt from "jsonwebtoken";
import { orderSchema } from "./../schemas/order";

export const getOrderUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Bạn chưa đăng nhập");
    }
    const decoded = jwt.verify(token, "duantotnghiep");
    const user = await User.getUser(decoded.id);
    if (!user) {
      res.status(404).json({ error: "" });
    } else {
      try {
        const Order = await Orders.getOrderUser(user?.id);
        res.json(Order);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};

export const createOrderUser = async (req, res) => {
  try {
    const { user_id, products, totalOrders, contact_information, note } =
      req.body;
    const { error } = orderSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const orderId = await Orders.createOrder(
      user_id,
      products,
      totalOrders,
      contact_information,
      note
    );
    res.json({ id: orderId, message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
