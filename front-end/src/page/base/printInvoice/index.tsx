import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { Result, Button, Modal } from "antd";
import { useParams } from "react-router-dom";
interface Invoice {
  id: number;
  nameInvoice: string;
  date: string;
  amount: number;
  paymentMethod: string;
  appointments_id: number;
}

const PrintInvoice = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/invoices/${id}`
        );

        setInvoices(response.data.printInvoice);
      } catch (error) {
        console.error("Error invoices:", error);
      }
    };

    getInvoices();
  }, [id]);

  const handlePDF = () => {
    if (invoices.length > 0) {
      const doc = new jsPDF();

      const columns = [
        "ID Invoice",
        "Name",
        "Date",
        "Amount",
        "Method",
        "ID Appointments",
      ];

      const data = invoices.map((invoice) => [
        invoice.id,
        invoice.nameInvoice,
        invoice.date,
        invoice.amount,
        invoice.paymentMethod,
        invoice.appointments_id.toString(),
      ]);

      (doc as any).autoTable({
        head: [columns],
        body: data,
        startY: 40,
      });

      setIsModalVisible(true);
      setPdfDataUri(doc.output("dataurlstring"));
    }
  };
  const redirectHome = () => {
    window.location.href = "/";
  };
  return (
    <div>
      <Result
        status="success"
        title="Hình Thức: Thanh Toán Tiền Mặt"
        extra={[
          <Button onClick={redirectHome} key="backToHome">
            Back to Home
          </Button>,
          <Button onClick={handlePDF} key="download">
            Xem Hóa Đơn
          </Button>,
        ]}
      ></Result>

      <Modal
        title="Hóa Đơn"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        className="invoice-modal"
      >
        <div className="invoice-header">
          {pdfDataUri && (
            <iframe src={pdfDataUri} width="100%" height="500px" />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PrintInvoice;
