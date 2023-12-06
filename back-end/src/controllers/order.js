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
        const uniqueData = Order.reduce((result, record) => {
          if (record && record.id !== undefined) {
            if (Array.isArray(result) && result.length > 0) {
              const existingRecordIndex = result.findIndex(
                (r) => r.id === record.id
              );
              if (existingRecordIndex === -1) {
                result.push({
                  id: record.id,
                  userId: record.userId,
                  userName: record.userName,
                  products: [
                    {
                      id: record.productId,
                      name: record.productName,
                      price: record.productPrice,
                      quantity: record.quantity,
                    },
                  ],
                  total: record.total,
                  contact_information: record.contact_information,
                  time: record.time,
                  note: record.note,
                  status_name: record.status_name,
                });
              } else {
                const existingProductIndex = result[
                  existingRecordIndex
                ].products.findIndex(
                  (products) => products.id === record.productId
                );
                if (existingProductIndex === -1) {
                  result[existingRecordIndex].products.push({
                    id: record.productId,
                    name: record.productName,
                    price: record.productPrice,
                    quantity: record.quantity,
                  });
                }
              }
            } else {
              result.push({
                id: record.id,
                userId: record.userId,
                userName: record.userName,
                products: [
                  {
                    id: record.productId,
                    name: record.productName,
                    price: record.productPrice,
                    quantity: record.quantity,
                  },
                ],
                total: record.total,
                contact_information: record.contact_information,
                time: record.time,
                note: record.note,
                status_name: record.status_name,
              });
            }
          }
          return result;
        }, []);
        res.json(uniqueData);
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
              userId: record.userId,
              userName: record.userName,
              products: [
                {
                  id: record.productId,
                  name: record.productName,
                  price: record.productPrice,
                  quantity: record.quantity,
                },
              ],
              total: record.total,
              contact_information: record.contact_information,
              time: record.time,
              note: record.note,
              status_name: record.status_name,
            });
          } else {
            const existingProductIndex = result[
              existingRecordIndex
            ].products.findIndex(
              (products) => products.id === record.productId
            );
            if (existingProductIndex === -1) {
              result[existingRecordIndex].products.push({
                id: record.productId,
                name: record.productName,
                price: record.productPrice,
                quantity: record.quantity,
              });
            }
          }
        } else {
          result.push({
            id: record.id,
            userId: record.userId,
            userName: record.userName,
            products: [
              {
                id: record.productId,
                name: record.productName,
                price: record.productPrice,
                quantity: record.quantity,
              },
            ],
            total: record.total,
            contact_information: record.contact_information,
            time: record.time,
            note: record.note,
            status_name: record.status_name,
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
