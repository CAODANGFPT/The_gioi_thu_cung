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
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 10,
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
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => (
        <div>
          <span>{new Intl.NumberFormat("vi-VN").format(total)}</span>
          <span>VNĐ</span>
        </div>
      ),
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
      width: 250,
      render: (data) => (
        <>
          <Button
            onClick={() => detailOrder(data)}
            className="btn-edit"
            style={{ marginRight: "1rem" }}
          >
            Chi tiết
          </Button>
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
      <h2
        style={{
          marginBottom: "1rem",
          fontSize: "25px",
          padding: "0.8rem",
          borderRadius: "3px",
          boxShadow: "0px 0px 5px #c3c3c3",
        }}
      >
        Quản lý thông tin đơn hàng
      </h2>
      <h2 style={{ color: "red", margin: "0.5rem" }}>Tìm kiếm</h2>
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
        </div>
      </Form>
      <TableAdmin columns={columns} data={dataOrder} />
    </>
  );
};

export default OrderAdmin;
