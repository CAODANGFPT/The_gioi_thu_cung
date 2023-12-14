import React, { useState } from "react";
import imageNot from "../../../assets/image/notAppoiment.png";
import { Link } from "react-router-dom";
import { useGetOrderByIdUserAndIdStatusQuery } from "../../../services/order";
import {
  useAddToCartsMutation,
  useGetUserListCartsQuery,
  useUpdateQuantityCartsMutation,
} from "../../../services/shoppingCart";
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal, Rate } from "antd";
import { useCreateReviewMutation } from "../../../services/review";

const Completed: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>("");

  const { data } = useGetOrderByIdUserAndIdStatusQuery(4);
  const { data: dataCart } = useGetUserListCartsQuery();
  const [AddToCart] = useAddToCartsMutation();
  const [updateOrderMutation] = useUpdateQuantityCartsMutation();
  const [createReviewMutation] = useCreateReviewMutation();

  const resetCart = async (items: any[], userId: number) => {
    const updatedCart: any[] = [];

    for (const item of items) {
      const existingCartItem = dataCart?.find(
        (cartItem: any) => cartItem.productsId === item.id
      );

      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + item.quantity;
        const res = await updateOrderMutation({
          id: existingCartItem.id,
          quantity: updatedQuantity,
        });
        if ("data" in res) {
          navigate("/shoppingCart");
        }
      } else {
        const cartItem = {
          user_id: userId,
          products_id: item.id,
          quantity: item.quantity,
        };
        updatedCart.push(cartItem);
        const res = await AddToCart(cartItem);
        console.log("1");
        if ("data" in res) {
          navigate("/shoppingCart");
        }
      }
    }
  };

  const handleRateChange = (value: number) => {
    setRating(value);
  };

  const { TextArea } = Input;

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };

  const handleOk = async () => {
    console.log("submit ở đây này");
    // lấy đánh giá rating
    // lấy text
    // await createReviewMutation();
  };

  return (
    <>
      {data?.length ? (
        data.map((Item) => (
          <div key={Item.id} className="toShip">
            <div className="toShip-status">
              <div>{Item.paymentMethods.name}</div>
              <div className="toShip-status-name">{Item.status.name}</div>
            </div>
            <div className="toShip-box">
              {Item.products.map((item) => (
                <div key={item.id} className="toShip-box-top">
                  <Link to={`/account/detailOrder/${Item.id}`} state={Item}>
                    <div className="toShip-box-top-item">
                      <div className="toShip-box-top-item-img">
                        <img src={item.img} alt="" />
                      </div>
                      <div>
                        <div>{item.name}</div>
                        <div>x{item.quantity}</div>
                        <Button
                          className="review"
                          onClick={() => {
                            Modal.info({
                              title: "Đánh giá chất lượng dịch vụ",
                              content: (
                                <div style={{ marginLeft: -30 }}>
                                  <div style={{ marginBottom: 10 }}>
                                    Bạn cảm thấy chất lượng dịch vụ như thế nào?
                                  </div>
                                  <Rate
                                    style={{ fontSize: 30 }}
                                    allowHalf
                                    defaultValue={rating}
                                    onChange={handleRateChange}
                                  />
                                  <TextArea
                                    style={{ marginTop: 10 }}
                                    rows={4}
                                    onChange={handleTextAreaChange}
                                    placeholder="Hãy viết những góp ý của bạn vào đây"
                                  />
                                </div>
                              ),
                              footer: (_) => (
                                <Button onClick={() => handleOk()}>Gửi</Button>
                              ),
                            });
                          }}
                        >
                          Đánh giá sản phẩm
                        </Button>
                      </div>
                    </div>
                  </Link>
                  <div className="toShip-box-top-price">
                    {new Intl.NumberFormat("vi-VN").format(
                      item.quantity * item.price ?? 0
                    )}{" "}
                    VNĐ
                  </div>
                </div>
              ))}
              <div className="toShip-box-bottom">
                <div className="toShip-box-bottom-action">
                  <div
                    onClick={() => resetCart(Item.products, Item.userId)}
                    className="toShip-box-bottom-action-abort"
                  >
                    Đặt lại
                  </div>
                </div>
                <div className="toShip-box-bottom-total">
                  Thành tiền:{" "}
                  <span>
                    {new Intl.NumberFormat("vi-VN").format(Item.total)} VNĐ
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="notAppointment">
          <div>
            <img src={imageNot} alt="" />
          </div>
          <div>Chưa có đơn hàng</div>
        </div>
      )}
    </>
  );
};

export default Completed;
