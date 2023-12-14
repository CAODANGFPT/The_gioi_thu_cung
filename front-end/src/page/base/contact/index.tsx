/* eslint-disable jsx-a11y/iframe-has-title */
import { useState } from "react";
import "../../../assets/scss/page/contact.scss";

const Contact = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [titleError, setTitleError] = useState("");

  const handleInputChange = (event: any, setState: any, setError: any) => {
    const value = event.target.value;
    setState(value);

    if (value.trim() === "") {
      setError("Vui lòng nhập dữ liệu!");
    } else {
      setError("");
    }
  };

  const handleTextareaChange = (event: any) => {
    setTextareaValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (name.trim() === "") {
      setNameError("Vui lòng nhập dữ liệu!");
      return;
    }

    if (phone.trim() === "") {
      setPhoneError("Vui lòng nhập dữ liệu!");
      return;
    }

    if (title.trim() === "") {
      setTitleError("Vui lòng nhập dữ liệu!");
      return;
    }
  };

  return (
    <div className="contact">
      <div className="contact_container">
        <div className="contact_main">
          <div className="contact_1">
            <h1>Liên hệ</h1>
            <div className="textwidget">GIỜ LÀM VIỆC</div>
            <div className="title">
              <p>
                Thứ 2 - thứ 7: 8h - 12h & 14h - 19h (Riêng ngày thứ 7 đóng cửa
                lúc 16h)
              </p>
              <p>Chủ nhật & Ngày lễ : 8h - 12h</p>
            </div>
            <div className="textwidget">THÔNG TIN TÀI KHOẢN NGÂN HÀNG</div>
            <div className="title">
              <p>Tên tài khoản: PetCare Shop</p>
              <p>
                Địa chỉ tài khoản: Số 57 Lý Thường Kiệt, phường Trần Hưng Đạo,
                quận Hoàn Kiếm, TP. Hà Nội.
              </p>
              <p>Số tài khoản: 0562 4975 901</p>
              <p>Ngân hàng: TP Bank</p>
            </div>
          </div>
          <div className="contact_2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4428.452844687378!2d105.74773981873967!3d21.03788212172185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1702574642264!5m2!1svi!2s"
              width="600"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <br />
        <hr />
        <br />

        <div className="contact_mail">
          <form action="" onSubmit={handleSubmit}>
            <h1>Gửi thông điệp đến Petcare</h1>
            <div className="controll">
              <label htmlFor="">Họ tên (*)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleInputChange(e, setName, setNameError)}
              />
              {nameError && <p style={{ color: "red" }}>{nameError}</p>}
            </div>

            <div className="controll">
              <label htmlFor="">Số Điện Thoại (*)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => handleInputChange(e, setPhone, setPhoneError)}
              />
              {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
            </div>
            <div className="controll">
              <label htmlFor="">Tiêu đề (*)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleInputChange(e, setTitle, setTitleError)}
              />
              {titleError && <p style={{ color: "red" }}>{titleError}</p>}
            </div>

            <div className="controll">
              <label htmlFor="">Nội dung</label>
              <textarea
                cols={30}
                rows={10}
                value={textareaValue}
                onChange={handleTextareaChange}
              ></textarea>
            </div>

            <button>Gửi Petcare</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
