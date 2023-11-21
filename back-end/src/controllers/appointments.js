import Appointments from "../models/appointments";
import AppointmentsDetail from "../models/appointmentsDetail";
import User from "../models/user";
import nodemailer from "nodemailer";

import {
  appointmentsSchema,
  updateAppointmentStatusSchema,
} from "../schemas/appointments";
import jwt from "jsonwebtoken";

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
      res.status(404).json({ error: "Không tìm thấy mục lịch hẹn" });
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
      pet,
      services,
      user_id,
      pethouse_id,
      start_time,
      end_time,
      total,
      status_id,
      is_delete,
    } = req.body;
    const appointmentsId = await Appointments.createAppointments(
      day,
      user_id,
      pethouse_id,
      start_time,
      end_time,
      total,
      status_id,
      is_delete
    );
    for (const item of services) {
      await AppointmentsDetail.createAppointmentsServices(appointmentsId, item);
    }
    for (const item of pet) {
      await AppointmentsDetail.createAppointmentsPet(appointmentsId, item);
    }
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
    res.json({ message: "Cập nhật lịch hẹn thành công" });
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
    const appointmentId = req.params.id;
    await Appointments.updateAppointmentStatus(appointmentId, status_id);
    const appointment = await Appointments.getAppointmentsById(appointmentId);
    const userId = appointment.user_id;
    const user = await User.getUserById(userId);
    if (user && user.email) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "hainv21123@gmail.com",
          pass: "yfaqudeffxnjptla",
        },
      });

      const mailOptions = {
        from: "hainv21123@gmail.com",
        to: user.email,
        subject: "Xác nhận đặt lịch thành công",
        html: `<div style="font-family: sans-serif; margin: 0 40px;">
          <img
            style="width: 200px"
            src="https://res.cloudinary.com/dksgvucji/image/upload/v1698334367/samples/logo2_bmcqc2.png"
            alt=""
          />
          <p>Chào <span style="font-weight: 600">${user.name},</span></p>
          <p>
            Chúc mừng bạn đã đặt lịch thành công tại
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
    }

    res.json({ message: "Cập nhật lịch hẹn thành công" });
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
      res.status(404).json({ error: "Không tìm thấy mục lịch hẹn" });
    } else {
      res.json(appointmentsTime);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
