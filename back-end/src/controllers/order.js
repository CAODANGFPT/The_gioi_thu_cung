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
                      img: record.productImg,
                      price: record.productPrice,
                      quantity: record.quantity,
                    },
                  ],
                  address: {
                    id: record.addressId,
                    name: record.addressName,
                    phone: record.addressPhone,
                    address: record.address,
                  },
                  total: record.total,
                  time: record.time,
                  note: record.note,
                  status: {
                    id: record.status_id,
                    name: record.status_name,
                  },
                  paymentMethods: {
                    id: record.paymentMethods_id,
                    name: record.paymentMethods_name,
                    image: record.paymentMethods_image,
                  },
                  statusPayment: {
                    id: record.status_payment_id,
                    name: record.status_payment_name,
                  },
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
                    img: record.productImg,
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
                    img: record.productImg,
                    price: record.productPrice,
                    quantity: record.quantity,
                  },
                ],
                address: {
                  id: record.addressId,
                  name: record.addressName,
                  phone: record.addressPhone,
                  address: record.address,
                },
                total: record.total,
                time: record.time,
                note: record.note,
                status: {
                  id: record.status_id,
                  name: record.status_name,
                },
                paymentMethods: {
                  id: record.paymentMethods_id,
                  name: record.paymentMethods_name,
                  image: record.paymentMethods_image,
                },
                statusPayment: {
                  id: record.status_payment_id,
                  name: record.status_payment_name,
                },
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
                  img: record.productImg,
                  price: record.productPrice,
                  quantity: record.quantity,
                },
              ],
              address: {
                id: record.addressId,
                name: record.addressName,
                phone: record.addressPhone,
                address: record.address,
              },
              total: record.total,
              time: record.time,
              note: record.note,
              status: {
                id: record.status_id,
                name: record.status_name,
              },
              paymentMethods: {
                id: record.paymentMethods_id,
                name: record.paymentMethods_name,
                image: record.paymentMethods_image,
              },
              statusPayment: {
                id: record.status_payment_id,
                name: record.status_payment_name,
              },
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
                img: record.productImg,
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
                img: record.productImg,
                price: record.productPrice,
                quantity: record.quantity,
              },
            ],
            address: {
              id: record.addressId,
              name: record.addressName,
              phone: record.addressPhone,
              address: record.address,
            },
            total: record.total,
            time: record.time,
            note: record.note,
            status: {
              id: record.status_id,
              name: record.status_name,
            },
            paymentMethods: {
              id: record.paymentMethods_id,
              name: record.paymentMethods_name,
              image: record.paymentMethods_image,
            },
            statusPayment: {
              id: record.status_payment_id,
              name: record.status_payment_name,
            },
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
    const {
      user_id,
      products,
      total,
      note,
      paymentMethods_id,
      status_payment,
      address_id,
      status_id,
    } = req.body;
    const orderId = await Orders.createOrder(
      user_id,
      total,
      note,
      paymentMethods_id,
      status_payment,
      address_id,
      status_id
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

export const updateStatusOrder = async (req, res) => {
  try {
    const { id, status_id } = req.body;
    const orderId = await Orders.updateStatusOrder(id, status_id);
    res.json({ id: orderId, message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStatusPaymentOrder = async (req, res) => {
  try {
    const { id, status_payment  } = req.body;
    const orderId = await Orders.updateStatusOrder(id, status_payment);
    res.json({ id: orderId, message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const searchOrderAdmin = async (req, res) => {
  try {
    const { paymentMethods_id, status_payment, nameUser, time, status_id } =
      req.body;
    const orders = await Orders.searchOrderAdmin(
      paymentMethods_id,
      status_id,
      status_payment,
      nameUser,
      time
    );
    if (orders.length === 0) {
      return res.status(400).json({
        message: "Không có lịch nào phù hợp",
      });
    }

    const uniqueData = orders.reduce((result, record) => {
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
                  img: record.productImg,
                  price: record.productPrice,
                  quantity: record.quantity,
                },
              ],
              address: {
                id: record.addressId,
                name: record.addressName,
                phone: record.addressPhone,
                address: record.address,
              },
              total: record.total,
              time: record.time,
              note: record.note,
              status: {
                id: record.status_id,
                name: record.status_name,
              },
              paymentMethods: {
                id: record.paymentMethods_id,
                name: record.paymentMethods_name,
                image: record.paymentMethods_image,
              },
              statusPayment: {
                id: record.status_payment_id,
                name: record.status_payment_name,
              },
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
                img: record.productImg,
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
                img: record.productImg,
                price: record.productPrice,
                quantity: record.quantity,
              },
            ],
            address: {
              id: record.addressId,
              name: record.addressName,
              phone: record.addressPhone,
              address: record.address,
            },
            total: record.total,
            time: record.time,
            note: record.note,
            status: {
              id: record.status_id,
              name: record.status_name,
            },
            paymentMethods: {
              id: record.paymentMethods_id,
              name: record.paymentMethods_name,
              image: record.paymentMethods_image,
            },
            statusPayment: {
              id: record.status_payment_id,
              name: record.status_payment_name,
            },
          });
        }
      }
      return result;
    }, []);
    return res.status(200).json({
      uniqueData,
      message: "search thành công",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
