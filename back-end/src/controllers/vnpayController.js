import { createPaymentUrl } from "./../models/vnpayModel";

export const createPayment = async (req, res) => {
  try {
    const paymentUrl = createPaymentUrl(req);
    res.json({ paymentUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
