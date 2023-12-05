import {
  createPaymentUrl,
  updateAppointmentStatusPayment,
} from "./../models/vnpayModel";
import qs from "qs";
import crypto from "crypto";
import { Buffer } from "buffer";

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
    console.log("vnp_ResponseCode:", vnp_ResponseCode);
    console.log("vnp_TxnRef:", vnp_TxnRef);
    console.log("vnp_OrderInfo:", vnp_OrderInfo);
    if (vnp_ResponseCode == "00") {
      const appointmentID = vnp_OrderInfo;

      await updateAppointmentStatusPayment(appointmentID);
      console.log("Appointment status success");
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
