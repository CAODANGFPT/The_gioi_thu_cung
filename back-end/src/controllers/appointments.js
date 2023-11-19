import Appointments from "../models/appointments";
import User from "../models/user";
import {
  appointmentsSchema,
  updateAppointmentStatusSchema,
} from "../schemas/appointments";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const list = async (req, res) => {
  try {
    const appointments = await Appointments.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listAppointmentData = async (req, res) => {
  try {
    const appointments = await Appointments.getAppointmentsData();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const show = async (req, res) => {
  try {
    const appointmentsItem = await Appointments.getAppointmentsById(
      req.params.id
    );
    if (!appointmentsItem) {
      res.status(404).json({ error: "AppointmentsItem not found" });
    } else {
      res.json(appointmentsItem);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const {
      day,
      pet_id,
      services_id,
      user_id,
      pethouse_id,
      start_time,
      end_time,
      total,
      status_id,
      is_delete,
    } = req.body;
    const { error } = appointmentsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const appointmentsId = await Appointments.createAppointments(
      day,
      pet_id,
      services_id,
      user_id,
      pethouse_id,
      start_time,
      end_time,
      total,
      status_id,
      is_delete
    );
    res.json({ id: appointmentsId, message: "Gửi thành công rồi !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { day, pet_id, services_id, user_id, pethouse_id, time_id } =
      req.body;
    const { error } = appointmentsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Appointments.updateAppointments(
      req.params.id,
      day,
      pet_id,
      services_id,
      user_id,
      pethouse_id,
      time_id
    );
    res.json({ message: "Appointments updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status_id } = req.body;
    const { error } = updateAppointmentStatusSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Appointments.updateAppointmentStatus(req.params.id, status_id);
    res.json({ message: "Appointments updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentUser = async (req, res) => {
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
        const appointments = await Appointments.getAppointmentUser(user?.id);
        res.json(appointments);
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

export const cancelHistoryAppointment = async (req, res) => {
  try {
    const { id } = req.body;
    await Appointments.cancelHistoryAppointment(id);
    res.json({ message: "Hủy đặt hàng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentTime = async (req, res) => {
  try {
    const { pethouse_id } = req.body;
    const appointmentsTime = await Appointments.getAppointmentTime(pethouse_id);
    if (!appointmentsTime) {
      res.status(404).json({ error: "AppointmentsItem not found" });
    } else {
      res.json(appointmentsTime);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hainv21123@gmail.com",
      pass: "yfaqudeffxnjptla",
    },
  });

  const mailOptions = {
    from: "hainv21123@gmail.com",
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

export const updateStatusCancelAppointment = async () => {
  try {
    const currentTime = new Date();
    await Appointments.updateStatusCancel(currentTime);
    const appointments = await Appointments.getUserEmail();
    if (appointments.length > 0) {
      const email = appointments[0].user_email;
      console.log("User Email:", email);
      const subject = "Lich Hẹn Của Bạn Đã Bị Hủy";
      const text = "đặt còn hủy vl =))";
      await sendEmail(email, subject, text);
      console.log("Email sent successfully to:", email);
    } else {
      console.log("Lỗi");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
