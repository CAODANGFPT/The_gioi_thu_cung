import {
  createPaymentUrl,
  updateAppointmentStatusPayment,
  updateOrderStatusPayment,
} from "./../models/vnpayModel";
import Appointments from "../models/appointments";
import qs from "qs";
import crypto from "crypto";
import { Buffer } from "buffer";
import nodemailer from "nodemailer";
export const createPayment = async (req, res) => {
  try {
    const paymentUrl = createPaymentUrl(req);
    res.json({ paymentUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const handleVnPayCallback = async (req, res) => {
  try {
    const { vnp_ResponseCode, vnp_TxnRef, vnp_OrderInfo } = req.body;
    if (vnp_ResponseCode == "00") {
      const reqID = vnp_OrderInfo;
      let onlyID;

      if (reqID.startsWith("AP")) {
        onlyID = reqID.substr(2);
        await updateAppointmentStatusPayment(onlyID);

        const userEmails = await Appointments.getUserEmail(onlyID);
        const email = userEmails[0].user_email;
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "hainv21123@gmail.com",
            pass: "yfaqudeffxnjptla",
          },
        });
        const mailOptions = {
          from: email,
          to: email,
          subject: "Thanh Toán Thành Công",
          html: ` <div style="font-family: sans-serif; margin: 0 40px;">
          <img
            style="width: 200px"
            src="https://res.cloudinary.com/dksgvucji/image/upload/v1698334367/samples/logo2_bmcqc2.png"
            alt=""
          />
          <p>Chào <span style="font-weight: 600">${email},</span></p>
          <p>
            Cảm ơn bạn đã thanh toán lịch hẹn ${onlyID} chăm sóc thú cưng thành công tại
            <span style="font-weight: 600">Website Đặt lịch chăm sóc thú cưng PetCare</span>
          </p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <p style="width: 100%;height: 1px; background-color: #00575C;"></p>
          <div style="text-align: right;">
            <p>Nếu bạn có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại</p>
            <p>Trân trọng,</p>
            <p style="font-weight: 600;">Ban quản trị Website Đặt lịch chăm sóc thú cưng PetCare</p>
          </div>
        </div>`,
        };

        await transporter.sendMail(mailOptions);

        console.log("Appointment status updated success");
      } else if (reqID.startsWith("OD")) {
        onlyID = reqID.substr(2);
        await updateOrderStatusPayment(onlyID);

        const userEmails = await Appointments.getUserEmail(onlyID);
        const email = userEmails[0].user_email;
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "hainv21123@gmail.com",
            pass: "yfaqudeffxnjptla",
          },
        });
        const mailOptions = {
          from: email,
          to: email,
          subject: "Thanh Toán Thành Công",
          html: ` <div style="font-family: sans-serif; margin: 0 40px;">
          <img
            style="width: 200px"
            src="https://res.cloudinary.com/dksgvucji/image/upload/v1698334367/samples/logo2_bmcqc2.png"
            alt=""
          />
          <p>Chào <span style="font-weight: 600">${email},</span></p>
          <p>
          Cảm ơn bạn đã thanh toán đơn hàng ${onlyID}thành công tại
            <span style="font-weight: 600">Website Đặt lịch chăm sóc thú cưng PetCare</span>
          </p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <p style="width: 100%;height: 1px; background-color: #00575C;"></p>
          <div style="text-align: right;">
            <p>Nếu bạn có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại</p>
            <p>Trân trọng,</p>
            <p style="font-weight: 600;">Ban quản trị Website Đặt lịch chăm sóc thú cưng PetCare</p>
          </div>
        </div>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Order status updated success");
      }
    }
    res.status(200).json({
      vnp_ResponseCode: vnp_ResponseCode,
      vnp_TxnRef: vnp_TxnRef,
      vnp_OrderInfo: vnp_OrderInfo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi ");
  }
};

export const handleVnPayReturnURL = async (req, res) => {
  try {
    const vnp_Params = req.query;

    const secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    const sortedParams = sortObject(vnp_Params);

    const secretKey = "WGKMVOVSQGJHRFGIGXNGXMEANKJBMRTH";

    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      const responseCode = vnp_Params["vnp_ResponseCode"] || "N/A";
      res.json({ success: responseCode === "00", responseCode });
    } else {
      res.status(400).json({ success: false, error: "Chữ Ký Không Hợp Lệ !" });
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).send("Lỗi ");
  }
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
