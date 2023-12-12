import { Button, DatePicker, Form, Input, Select, message } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import {
  useGetAllOrderUserQuery,
  useSearchOrderAdminMutation,
} from "../../../services/order";
import { useGetAllStatusOrderQuery } from "../../../services/status_order";
import { TStatusOrder } from "../../../schema/status_order";
import { useGetAllStatusPaymentQuery } from "../../../services/statusPayment";
import { useGetAllPaymentMethodsQuery } from "../../../services/paymentMethods";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const OrderAdmin: React.FC = () => {
  const { data: orderData } = useGetAllOrderUserQuery();
  const { data: statusOrder } = useGetAllStatusOrderQuery();
  const { data: statusPayment } = useGetAllStatusPaymentQuery();
  const { data: paymentMethods } = useGetAllPaymentMethodsQuery();
  const [SearchOrderAdmin] = useSearchOrderAdminMutation();
  const [dataOrder, setDataOrder] = useState<any | null>(null);
  useEffect(() => {
    if (orderData) {
      setDataOrder(orderData);
    }
  }, [orderData]);
  const navigate = useNavigate();
  const orderNameFile: string = "Đơn hàng";
  const { data } = useGetAllOrderUserQuery();
  useEffect(() => {
    if (data) {
      setDataOrder(data);
    }
  }, [data]);
  const detailOrder = (item: any) => {
    navigate("detail", {
      state: {
        ...item,
      },
    });
  };
  const optionsStatusOrder = statusOrder?.map((item: TStatusOrder) => ({
    value: item.id,
    label: item.name,
  }));
  const optionStatusPayment = statusPayment?.map((item: TStatusOrder) => ({
    value: item.id,
    label: item.name,
  }));
  const optionPaymentMethods = paymentMethods?.map((item: TStatusOrder) => ({
    value: item.id,
    label: item.name,
  }));
  const exportToExcel = () => {
    const flattenData = dataOrder
      ? dataOrder.map((item: any) => ({
          Id: item.id,
          "Tên tài khoản": item.userName,
          "Tên người đặt hàng": item.address.name,
          "Sản phẩm":
            item.products && item.products.length > 0
              ? item.products
                  .map((products: { name: string }) => products.name)
                  .join(", ")
              : "",
          "Thời gian": dayjs(item.time).format("DD-MM-YYYY HH:mm"),
          "Địa chỉ": item.address.address,
          "Số điện thoại": item.address.phone,
          "Thành tiền": item.total,
          "Phương thức thanh toán": item.paymentMethods.name,
          "Trạng thái đơn hàng": item.status.name,
          "Trạng thái thanh toán": item.statusPayment.name,
          "Ghi chú": item.note,
        }))
      : [];
    const ws = XLSX.utils.json_to_sheet(flattenData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Đơn hàng");
    XLSX.writeFile(wb, `${orderNameFile}.xlsx`);
  };

  const exportToPdf = () => {
    const unit = "pt";
    const size = "A2"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.addFont("times", "Times New Roman", "normal");

    doc.setFont("Times New Roman");

    doc.setFontSize(20);

    const title = "Danh sách đơn hàng";
    const headers = [
      [
        "ID",
        "Tên tài khoản",
        "Tên người đặt hàng",
        "Sản phẩm",
        "Thời gian",
        "Địa chỉ",
        "Số điện thoại",
        "Thành tiền",
        "Phương thức thanh toán",
        "Trạng thái đơn hàng",
        "Trạng thái thanh toán",
        "Ghi chú",
      ],
    ];

    const data = dataOrder
      ? dataOrder.map((customer: any) => [
          customer.id,
          customer.userName,
          customer.address.name,
          customer.products && customer.products.length > 0
            ? customer.products
                .map((products: { name: string }) => products.name)
                .join(", ")
            : "",
          customer.time,
          customer.address.address,
          customer.address.phone,
          customer.total,
          customer.paymentMethods.name,
          customer.status.name,
          customer.statusPayment.name,
          customer.note,
        ])
      : [];

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Order.pdf");
  };

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 20,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Người mua",
      dataIndex: "userName",
      key: "userName",
      width: 100,
    },
    {
      title: "Ngày đặt",
      dataIndex: "time",
      key: "day",
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
      width: 100,
    },
    {
      title: "Hình thức",
      dataIndex: "paymentMethods",
      key: "paymentMethods",
      width: 100,
      render: (paymentMethods) => (
        <div>{paymentMethods ? paymentMethods.name : ""}</div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <>
          <div>{status ? status.name : ""}</div>
        </>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "statusPayment",
      key: "statusPayment",
      width: 100,
      render: (statusPayment) => (
        <>
          <div>{statusPayment ? statusPayment.name : ""}</div>
        </>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (data) => (
        <>
          <Button
            onClick={() => detailOrder(data)}
            className="btn-edit"
            style={{ marginRight: "1rem" }}
          >
            Chi tiết
          </Button>
          <Button className="btn-edit" style={{ marginRight: "1rem" }}>
            Xác nhận đơn
          </Button>
          {data && (data.status.id === 2 || data.status.id === 1) && (
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Hủy đơn
            </Button>
          )}
        </>
      ),
    },
  ];

  const onFinish = async (values: any) => {
    if (values.time) {
      values.time = dayjs(values.time).format("YYYY-MM-DD");
    }
    const { nameUser, paymentMethods_id, time, status_id, status_payment } =
      values;

    console.log(values);

    const servicesData = {
      nameUser,
      paymentMethods_id,
      time: time,
      status_id,
      status_payment,
    };

    try {
      const data: any = await SearchOrderAdmin(servicesData).unwrap();
      setDataOrder(data.uniqueData);
    } catch (error) {
      console.log(error);
      message.error("Không tìm thấy bài nào phù hợp");
    }
  };
  return (
    <>
      <Form
        name="validateOnly"
        className="search-appointments"
        layout="vertical"
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ marginTop: 10 }}
      >
        <div className="search-appointments-form">
          <Form.Item name="nameUser">
            <Input placeholder="Tên người đặt" />
          </Form.Item>

          <Form.Item name="time" style={{ width: "100%" }}>
            <DatePicker
              placeholder="Ngày"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              showNow={false}
            />
          </Form.Item>
          <Form.Item name="status_id">
            <Select options={optionsStatusOrder} placeholder="Trạng thái" />
          </Form.Item>
          <Form.Item name="paymentMethods_id">
            <Select
              options={optionPaymentMethods}
              placeholder="Phương thức thanh toán"
            />
          </Form.Item>
          <Form.Item name="status_payment" label="">
            <Select
              options={optionStatusPayment}
              placeholder="Trạng thái thanh toán"
            />
          </Form.Item>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button htmlType="submit">Tìm kiếm</Button>
          <Button className="btn" onClick={() => exportToExcel()}>
            Xuất excel
          </Button>

          <Button className="btn" onClick={() => exportToPdf()}>
            Xuất PDF
          </Button>
        </div>
      </Form>
      <TableAdmin columns={columns} data={dataOrder} />;
    </>
  );
};

export default OrderAdmin;
