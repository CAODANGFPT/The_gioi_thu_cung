import User from "../models/user";
import Orders from "../models/order";
import OrderDetail from "../models/detailOrder";
import Carts from "../models/carts";

import jwt from "jsonwebtoken";

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
export const getAllOrder = async (req, res) => {
  try {
    const Order = await Orders.getAllOrder();
    const uniqueData = Order.reduce((result, record) => {
      if (record && record.id !== undefined) {
        if (Array.isArray(result) && result.length > 0) {
          const existingRecordIndex = result.findIndex(
            (r) => r.id === record.id
          );
          if (existingRecordIndex === -1) {
            result.push({
              id: record.id,
              day: record.day,
              services: [{ id: record.serviceId, name: record.serviceName }],
              pets: [{ id: record.petId, name: record.petName }],
              total: record.total,
              start_time: record.start_time,
              end_time: record.end_time,
              user_email: record.user_email,
              user_name: record.user_name,
              pethouse_name: record.pethouse_name,
              pethouse_id: record.pethouse_id,
              status_name: record.status_name,
              status_id: record.status_id,
              statusPaymentId: record.statusPaymentId,
              statusPaymentName: record.statusPaymentName,
            });
          } else {
            const existingProductIndex = result[
              existingRecordIndex
            ].products.findIndex(
              (services) => services.id === record.serviceId
            );
            if (existingProductIndex === -1) {
              result[existingRecordIndex].services.push({
                id: record.serviceId,
                name: record.serviceName,
              });
            }
          }
        } else {
          result.push({
            id: record.id,
            day: record.day,
            services: [{ id: record.serviceId, name: record.serviceName }],
            pets: [{ id: record.petId, name: record.petName }],
            total: record.total,
            start_time: record.start_time,
            end_time: record.end_time,
            user_email: record.user_email,
            user_name: record.user_name,
            pethouse_name: record.pethouse_name,
            pethouse_id: record.pethouse_id,
            status_id: record.status_id,
            status_name: record.status_name,
            statusPaymentId: record.statusPaymentId,
            statusPaymentName: record.statusPaymentName,
          });
        }
      }
      return result;
    }, []);
    res.json(uniqueData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createOrderUser = async (req, res) => {
  try {
    const { user_id, products, total, contact_information, note } = req.body;
    const orderId = await Orders.createOrder(
      user_id,
      total,
      contact_information,
      note
    );
    for (const item of products) {
      await Carts.deleteCartsByProductId(user_id, item.id);

      await OrderDetail.createDetailOrder(
        orderId,
        item.id,
        item.quantity,
        item.price
      );
    }
    res.json({ id: orderId, message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
