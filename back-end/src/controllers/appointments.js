import Appointments from "../models/appointments";
import AppointmentsDetail from "../models/appointmentsDetail";
import User from "../models/user";
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
      await AppointmentsDetail.createAppointmentsServices(appointmentsId, item.service_id); 
    }
    for (const item of pet) {
      await AppointmentsDetail.createAppointmentsPet( appointmentsId, item.pet_id);
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
    await Appointments.updateAppointmentStatus(req.params.id, status_id);
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
