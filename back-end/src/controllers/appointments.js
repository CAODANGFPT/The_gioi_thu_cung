import Appointments from "../models/appointments";
import AppointmentsDetail from "../models/appointmentsDetail";
import Services from "../models/services";
import User from "../models/user";
import {
  appointmentsSchema,
  updateAppointmentStatusSchema,
} from "../schemas/appointments";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Pet from "../models/pet";

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
    const petNamesArray = [];
    const ServicesArray = [];
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
      const servicesDetails = await Services.getNameServicesById(item);
      if (servicesDetails && servicesDetails.length > 0) {
        const servicesName = servicesDetails[0].name;
        ServicesArray.push(servicesName);
      }
    }
    for (const item of pet) {
      await AppointmentsDetail.createAppointmentsPet(appointmentsId, item);
      const petDetails = await Pet.getNamePet(item);
      if (petDetails && petDetails.length > 0) {
        const petName = petDetails[0].name;
        petNamesArray.push(petName);
      }
    }
    const servicesNamesString =
      ServicesArray.length > 0
        ? ServicesArray.join(", ")
        : "No pet name available";
    const petNamesString =
      petNamesArray.length > 0
        ? petNamesArray.join(", ")
        : "No pet name available";
    const { email, name } = await User.getUser(user_id);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "hainv21123@gmail.com",
        pass: "yfaqudeffxnjptla",
      },
    });
    const formattedTotal = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(total);

    const mailOptions = {
      from: email,
      to: email,
      subject: "Thông tin đặt lịch chăm sóc",
      html: `  <div style="background-color: white; border: 5px solid #5ebdc2; width: 390px; padding: 30px 25px;">
      <div style="display: flex; align-items: center; justify-content: center;">
        <img style="width: 100%;" src="https://res.cloudinary.com/dksgvucji/image/upload/v1698334367/samples/logo2_bmcqc2.png" alt="">
      </div>
      <div style="margin-top: 30px;">
        <div style="font-weight: 600;">Chào ${name}</div>
        <div style="margin: 15px 0;">Cảm ơn bạn đặt lịch chăm sóc thú cưng ở cửa hàng chúng tôi</div>
        <div style="margin: 15px 0;">Đây là thông tin lịch đặt của bạn: </div>
        <div style="display: flex; gap: 5px; margin: 15px 0;">
          <span style="font-weight: 600;" >Tên người đặt:</span>
          <span  style="padding-left: 10px;">${name}</span>
        </div>
        <div style="display: flex; gap: 15px; margin: 15px 0;"><span style="font-weight: 600;">Dịch vụ: </span> <span sty  style="padding-left: 10px;">${servicesNamesString}</span></div>
        <div style="display: flex; gap: 15px; margin: 15px 0;"><span style="font-weight: 600;">Pet: </span> <span  style="padding-left: 10px;">${petNamesString}</span></div>
        <div style="display: flex; gap: 15px; margin: 15px 0;"><span style="font-weight: 600;">Thời gian bạn đặt: </span> <span  style="padding-left: 10px;">${day}</span></div>
        <div style="display: flex; gap: 15px; margin: 15px 0;"><span style="font-weight: 600;">Thời gian bắt đầu lịch: </span> <span  style="padding-left: 10px;">${start_time}</span></div>
        <div style="display: flex; gap: 15px; margin: 15px 0;"><span style="font-weight: 600;">Thời gian kết lịch: </span> <span  style="padding-left: 10px;">${end_time}</span></div>
        <div style="display: flex; gap: 15px; margin: 15px 0;"><span style="font-weight: 600;">Tổng tiền: </span> <span  style="padding-left: 10px;">${formattedTotal}    </span></div>
        <div>
          Nếu bạn có gì thắc mắc có thể liên hệ số điện thoại: <a href="tel:0917397543">0917397543</a> hoặc gửi email: hai20112030@gmail.com
        </div>
        <div>
          Thân mếm
        </div>
      </div>
    </div>`,
    };

    await transporter.sendMail(mailOptions);
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

export const getAppointmentUserStatus = async (req, res) => {
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
        const appointments = await Appointments.getAppointmentUserStatus(
          user.id,
          req.params.status_id
        );
        const uniqueData = appointments.reduce((result, record) => {
          if (record && record.id !== undefined) {
            if (Array.isArray(result) && result.length > 0) {
              const existingRecordIndex = result.findIndex(
                (r) => r.id === record.id
              );
              if (existingRecordIndex === -1) {
                result.push({
                  id: record.id,
                  day: record.day,
                  services: [
                    { id: record.serviceId, name: record.serviceName },
                  ],
                  pets: [{ id: record.petId, name: record.petName }],
                  total: record.total,
                  start_time: record.start_time,
                  end_time: record.end_time,
                  user_email: record.user_email,
                  pethouse_name: record.pethouse_name,
                  status_name: record.status_name,
                });
              } else {
                const existingPetIndex = result[
                  existingRecordIndex
                ].pets.findIndex((pet) => pet.id === record.petId);
                if (existingPetIndex === -1) {
                  result[existingRecordIndex].pets.push({
                    id: record.petId,
                    name: record.petName,
                  });
                }
                result[existingRecordIndex].services.push({
                  id: record.serviceId,
                  name: record.serviceName,
                });
              }
            } else {
              result.push({
                id: record.id,
                day: record.day,
                services: [{ id: record.serviceId, name: record.serviceName }],
                pets: [{ id: record.petId, name: record.petName }],
                total: record.total,
                start_time: record.start_time,
                end_time: record.end_time,
                user_email: record.user_email,
                pethouse_name: record.pethouse_name,
                status_name: record.status_name,
              });
            }
          }
          return result;
        }, []);

        res.json(uniqueData);
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

export const updateStatusCancelAppointment = async () => {
  try {
    const currentTime = new Date();
    const { updatedAppointmentIds } = await Appointments.updateStatusCancel(
      currentTime
    );
    console.log("Updated Appointment IDs:", updatedAppointmentIds);

    for (const appointmentId of updatedAppointmentIds) {
      const appointmentDetails = await Appointments.getAppointmentDetails(
        appointmentId
      );

      if (appointmentDetails) {
        const userEmails = await Appointments.getUserEmail(appointmentId);

        if (userEmails.length > 0) {
          const email = userEmails[0].user_email;
          console.log("User Email:", email);

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
            subject: "Lịch Hẹn Của Bạn Đã Bị Hủy",
            html: `<div style="background-color: white; border: 5px solid #5ebdc2; width: 390px; padding: 30px 25px;">
      <div style="display: flex; align-items: center; justify-content: center;">
        <img style="width: 100%;" src="https://res.cloudinary.com/dksgvucji/image/upload/v1698334367/samples/logo2_bmcqc2.png" alt="">
      </div>
      <div style="margin-top: 30px;">
        <div style="font-weight: 600;">Chào ${email}</div>
        <div style="margin: 15px 0;">Lịch Hẹn ID ${appointmentDetails.id} Của Bạn Đã Bị Hủy !</div>
        <div style="display: flex; gap: 15px; margin: 15px 0;"><span style="font-weight: 600;">Thời gian bạn đặt: </span> <span  style="padding-left: 10px;">${appointmentDetails.day}</span></div>
        <div style="display: flex; gap: 15px; margin: 15px 0;"><span style="font-weight: 600;">Thời gian bắt đầu lịch: </span> <span  style="padding-left: 10px;">${appointmentDetails.start_time}</span></div>
        <div style="display: flex; gap: 15px; margin: 15px 0;"><span style="font-weight: 600;">Thời gian kết lịch: </span> <span  style="padding-left: 10px;">${appointmentDetails.end_time}</span></div>
      
       <div style="display: flex; gap: 15px; margin: 15px 0;"><span style="font-weight: 600;">Trạng Thái </span> <span  style="padding: 10px;background:red; color:white;">Đã Hủy</span></div>
      
        <div>
          Thân mến
        </div>
      </div>
    </div>`,
          };

          await transporter.sendMail(mailOptions);
          console.log("Email sent successfully to:", email);
        } else {
          console.log("Không tìm thấy email cho appointmentId:", appointmentId);
        }
      } else {
        console.log(
          "Không tìm thấy chi tiết lịch hẹn cho appointmentId:",
          appointmentId
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
