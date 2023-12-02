import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import logo from "../../../assets/image/logo.png";
import { useGetAppointmentUserStatusQuery } from "../../../services/appointments";
import "../../../assets/scss/page/printInvoice.scss";

interface Invoice {
  id: number;
  nameInvoice: string;
  date: string;
  amount: number;
  paymentMethod: string;
  appointments_id: number;
}

const PrintInvoice = () => {
  const { data: listAppointment } = useGetAppointmentUserStatusQuery(2);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInvoices = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get(
            `http://127.0.0.1:8080/api/invoices/${id}`
          );

          setInvoices(response.data.printInvoice);
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error("Error invoices:", error);
      }
    };

    getInvoices();
  }, [id]);

  return (
    <Spin spinning={loading} tip="Loading...">
      <div className="invoice-container">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="invoice-details">
            <div className="invoice-header">
              <img src={logo} alt="Logo" className="logo" />
              <h2>Hóa Đơn Thanh Toán PetCare</h2>
            </div>
            <div className="invoice-body">
              <p>ID Hóa Đơn: {invoice.id}</p>
              <p>Người Đặt: {invoice.nameInvoice}</p>
              <p>Ngày: {dayjs(invoice.date).format("HH:mm DD-MM-YYYY")}</p>
              <p>Phương Thức Thanh Toán: {invoice.paymentMethod}</p>
            </div>
            <>
              {!loading ? (
                <div className="cancelledAppointment">
                  <div className="table-scroll">
                    <h3>Chi Tiết Hóa Đơn</h3>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>STT</th>
                          <th>Dịch vụ</th>
                          <th>Thú cưng</th>
                          <th>Ngày giờ đặt</th>
                          <th>Phòng</th>
                          <th>Tổng tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listAppointment &&
                          listAppointment.map((item, index) => {
                            return (
                              <tr key={item.id}>
                                <td style={{ textAlign: "center" }}>
                                  {index + 1}
                                </td>
                                <td>
                                  {item.services &&
                                    Array.isArray(item.services) &&
                                    item.services.map(
                                      (service, serviceIndex) => (
                                        <span key={serviceIndex}>
                                          {service.name}
                                          {serviceIndex <
                                          item.services.length - 1
                                            ? ", "
                                            : ""}
                                        </span>
                                      )
                                    )}
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
                                  {dayjs(item.start_time).format(
                                    "HH:mm DD-MM-YYYY"
                                  )}
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
            </>
            <div className="button-container">
              <button onClick={() => window.print()}>In Hóa Đơn</button>
            </div>
          </div>
        ))}
      </div>
    </Spin>
  );
};

export default PrintInvoice;
