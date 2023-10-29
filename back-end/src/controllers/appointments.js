import Appointments from "../models/appointments";
import { appointmentsSchema } from "../schemas/appointments";

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
    const { day, pet_id, services_id, user_id, pethouse_id, time_id } =
      req.body;
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
      time_id
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
export const destroy = async (req, res) => {
  try {
    await Appointments.deleteAppointments(req.params.id);
    res.json({ message: "Appointments deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
