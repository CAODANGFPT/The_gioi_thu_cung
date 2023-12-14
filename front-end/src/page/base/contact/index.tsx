import { useState } from "react";
import "../../../assets/scss/page/contact.scss";

const Contact = () => {
  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (event: any) => {
    setTextareaValue(event.target.value);
  };
  return (
    <div className="contact_container">
      <div className="contact_main">
        <div className="contact_1">
          <h1>Liên hệ</h1>
          <div className="textwidget">GIỜ LÀM VIỆC</div>
          <div className="title">
            <p>
              Thứ 2 - thứ 7: 8h - 12h & 14h - 19h (Riêng PetCare 3 đóng cửa lúc
              18h)
            </p>
            <p>Chủ nhật & Ngày lễ : 8h - 12h</p>
          </div>
          <div className="textwidget">THÔNG TIN TÀI KHOẢN NGÂN HÀNG</div>
          <div className="title">
            <p>Tên tài khoản: Công ty TNHH MTV Dịch Vụ Thú Y An Việt</p>
            <p>
              Địa chỉ tài khoản: 124A Xuân Thủy, phường Thảo Điền, quận 2, Tp.
              Hồ Chí Minh
            </p>
            <p>Số tài khoản: 101110 9779</p>
            <p>Ngân hàng: Vietcombank</p>
          </div>
        </div>
        <div className="contact_2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4428.452844687378!2d105.74773981873967!3d21.03788212172185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1702574642264!5m2!1svi!2s"
            width="600"
            height="450"
            style={{border: "0"}}
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div className="contact_mail">
        <form action="">
          <h1>Gửi thông điệp đến Petcare</h1>
          <div className="controll">
            <label htmlFor="">Họ tên (*)</label>
            <input type="text" />
          </div>
          <div className="controll">
            <label htmlFor="">Số Điện Thoại (*)</label>
            <input type="text" />
          </div>
          <div className="controll">
            <label htmlFor="">Tiêu đề (*)</label>
            <input type="text" />
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
  );
};

export default Contact;
