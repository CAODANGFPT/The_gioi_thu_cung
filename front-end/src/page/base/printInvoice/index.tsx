import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useListPaymentAppointmentQuery } from "../../../services/appointments";
import "../../../assets/scss/page/printInvoice.scss";
import { useGetInvoicesQuery } from "../../../services/invoice";

const PrintInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const numberId = Number(id);
  const { data: listPaymentAppointment } =
    useListPaymentAppointmentQuery(numberId);
  console.log("datatrave", listPaymentAppointment);
  const { data: listInvoice } = useGetInvoicesQuery(numberId);

  return (
    <>
      <div className="invoice-container">
        {listInvoice && listInvoice.length > 0 ? (
          <div className="cancelledAppointment">
            <div className="table-scroll">
              <h3 style={{ textAlign: "center" }}>Chi Tiết Hóa Đơn</h3>
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>STT</th>
                    <th>Tên người đặt</th>
                    <th>Ngày Tạo</th>
                    <th>Số Tiền</th>
                    <th>Phương Thức Thanh Toán</th>
                    <th>mã Lịch Hẹn</th>
                  </tr>
                </thead>
                <tbody>
                  {listInvoice.map((invoice, index) => (
                    <tr key={invoice.id}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td>{invoice.nameInvoice}</td>
                      <td>{dayjs(invoice.date).format("HH:mm DD-MM-YYYY")}</td>
                      <td>{invoice.amount}</td>
                      <td>{invoice.paymentMethod}</td>
                      <td>{invoice.appointments_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        {listPaymentAppointment && listPaymentAppointment.length > 0 ? (
          <div className="cancelledAppointment">
            <div className="table-scroll">
              <h3 style={{ textAlign: "center" }}>Chi Tiết Hóa Đơn</h3>
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>STT</th>
                    <th>Dịch vụ</th>
                    <th>Tên thú cưng</th>
                    <th>Ngày-giờ đặt</th>
                    <th>Phòng</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {listPaymentAppointment &&
                    listPaymentAppointment.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td style={{ textAlign: "center" }}>{index + 1}</td>
                          <td>
                            {item.services &&
                              Array.isArray(item.services) &&
                              item.services.map((service, serviceIndex) => (
                                <span key={serviceIndex}>
                                  {service.name}
                                  {serviceIndex < item.services.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                          </td>
                          <td>
                            {item.pets &&
                              Array.isArray(item.pets) &&
                              item.pets.map((pet, serviceIndex) => (
                                <span key={serviceIndex}>
                                  {pet.name}
                                  {serviceIndex < item.pets.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                          </td>
                          <td>
                            {dayjs(item.start_time).format("HH:mm DD-MM-YYYY")}
                          </td>
                          <td>{item.pethouse_name}</td>
                          <td>{item.total}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        <div className="button-container">
          <button onClick={() => window.print()}>In Hóa Đơn</button>
        </div>
      </div>
    </>
  );
};

export default PrintInvoice;
