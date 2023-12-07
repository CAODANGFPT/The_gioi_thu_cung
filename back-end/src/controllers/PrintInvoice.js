import IDInvoice from "../models/PrintInvoice";

export const getIDInvoices = async (req, res) => {
  try {
    const printInvoice = await IDInvoice.getIDInvoice(req.params.id);
    res.json({ printInvoice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { user_id, amount, paymentMethod, appointments_id } = req.body;
    const invoiceId = await IDInvoice.addInvoice(
      user_id,
      amount,
      paymentMethod,
      appointments_id
    );

    console.log("Appointment status success");
    res.json({ id: invoiceId, message: "thêm invoice thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateStatusCash = async (req, res) => {
  try {
    const { appointments_id } = req.body;
    const updateStatus = await IDInvoice.updateStatusCash(appointments_id);

    res.json({ id: updateStatus, message: "updateStatus thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
