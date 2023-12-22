import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Popconfirm,
  Select,
  Tag,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/scss/admin/appointments.scss";
import TableAdmin from "../../../components/table";
import {
  useGetAllOrderUserQuery,
  useSearchOrderAdminMutation,
  useUpdateOrderStatusMutation,
  useUpdateStatusPaymentOrderMutation,
} from "../../../services/order";
import { useGetAllStatusOrderQuery } from "../../../services/status_order";
import { TStatusOrder } from "../../../schema/status_order";
import { useGetAllStatusPaymentQuery } from "../../../services/statusPayment";
import { useGetAllPaymentMethodsQuery } from "../../../services/paymentMethods";
import * as XLSX from "xlsx";
import {
  useUpdatePaymentAppointmentMutation,
  useUpdateStatusAppointmentMutation,
} from "../../../services/appointments";

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
      width: 200,
      render: (paymentMethods) => (
        <div>{paymentMethods ? paymentMethods.name : ""}</div>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "statusPayment",
      key: "statusPayment",
      width: 150,
      render: (statusPayment) => (
        <Tag color={statusPayment.id === 1 ? "red" : "green"}>
          {statusPayment.name}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <Tag
          color={
            status.id === 1
              ? "blue"
              : status.id === 2
              ? "cyan"
              : status.id === 3
              ? "orange"
              : status.id === 4
              ? "green"
              : status.id === 5
              ? "red"
              : status.id === 6
              ? "purple"
              : ""
          }
        >
          {status.name}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 250,
      render: (data) => (
        <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              flexDirection: "column",
              rowGap: 10,
            }}
          >
            {(data.status.id === 1 ||
              data.status.id === 2 ||
              data.status.id === 3 ||
              (data.status.id === 4 && data.statusPayment.id === 1)) && (
              <>
                <ButtonSuccess data={data} />
                <ButtonCancel data={data} />
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              flexDirection: "column",
              rowGap: 10,
            }}
          >
            {data.status.id === 4 && <ButtonReturn data={data} />}
            <Button
              type="link"
              onClick={() => detailOrder(data)}
              className="btn-edit"
              style={{ marginRight: "1rem" }}
            >
              Chi tiết
            </Button>
          </div>
        </div>
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

  const [filter, setFilter] = useState({
    name: "",
    start_time: "",
    paymentMethods: "",
    pay: "",
    status: "",
  });
  const [openReset, setOpenReset] = useState<boolean>(false);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      handleFilterChange("start_time", dayjs(date).format("DD/MM/YYYY"));
    } else {
      handleFilterChange("start_time", "");
    }
  };

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  useEffect(() => {
    const filteredData = orderData?.filter(
      (item) =>
        item.userName
          ?.toLowerCase()
          .includes(filter.name.trim().toLowerCase()) &&
        dayjs(item.time)
          .format("DD/MM/YYYY")
          .toLowerCase()
          .includes(filter.start_time.trim().toLowerCase()) &&
        item.paymentMethods.id
          ?.toString()
          .toLowerCase()
          .includes(filter.paymentMethods) &&
        item.statusPayment.id?.toString().toLowerCase().includes(filter.pay) &&
        item.status.id?.toString().toLowerCase().includes(filter.status)
    );
    setDataOrder(filteredData);
  }, [
    filter.name,
    filter.paymentMethods,
    filter.start_time,
    filter.status,
    filter.pay,
    orderData,
  ]);

  useEffect(() => {
    if (
      filter.name === "" &&
      filter.paymentMethods === "" &&
      filter.start_time === "" &&
      filter.pay === "" &&
      filter.status === ""
    ) {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [
    filter.name,
    filter.paymentMethods,
    filter.start_time,
    filter.status,
    filter.pay,
  ]);

  useEffect(() => {
    if (!dataOrder) {
      setDataOrder(data);
    }
  }, [data, dataOrder]);

  return (
    <>
      <h2 className="title-appoiment">Quản lý thông tin đơn hàng</h2>
      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <div style={{ display: "flex", columnGap: 20, alignItems: "flex-end" }}>
        <div>
          <Input
            value={filter?.name}
            placeholder="Tên người đặt"
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <DatePicker
            style={{ width: 200 }}
            format="YYYY-MM-DD"
            placeholder="Ngày đặt"
            onChange={onChange}
          />
        </div>
        <div>
          <Select
            options={optionPaymentMethods}
            onChange={(value) => handleFilterChange("paymentMethods", value)}
            value={filter.paymentMethods || null}
            style={{ width: 200 }}
            placeholder="Hình thức thanh toán"
          />
        </div>
        <div>
          <Select
            options={optionStatusPayment}
            onChange={(value) => handleFilterChange("pay", value)}
            value={filter.pay || null}
            style={{ width: 200 }}
            placeholder="Trạng thái thanh toán"
          />
        </div>
        <div>
          <Select
            options={optionsStatusOrder}
            onChange={(value) => handleFilterChange("status", value)}
            value={filter.status || null}
            style={{ width: 200 }}
            placeholder="Trạng thái"
          />
        </div>
        <Button
          onClick={() =>
            setFilter({
              name: "",
              paymentMethods: "",
              start_time: "",
              pay: "",
              status: "",
            })
          }
          danger
          disabled={!openReset}
        >
          Cài lại
        </Button>
      </div>
      <TableAdmin columns={columns} data={dataOrder} />
    </>
  );
};

export default OrderAdmin;

const ButtonSuccess = ({ data }: { data: any }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [updateStatusOrder] = useUpdateOrderStatusMutation();
  const [updateStatusPaymentOrder] = useUpdateStatusPaymentOrderMutation();

  const redirectToAppointment = async (id: number, status_id: number) => {
    if (
      status_id === 1 ||
      status_id === 2 ||
      status_id === 3 ||
      data.status.id === 4
    ) {
      setLoading(true);
      const res = await updateStatusOrder({
        id: id,
        status_id: status_id + 1,
      });
      if ("data" in res) {
        message.success("Sửa trạng thái thành công");
        setLoading(false);
      } else {
        message.error("Sửa trạng thái không thành công");
        setLoading(false);
      }
    } else if (status_id === 4) {
      const res = await updateStatusPaymentOrder({
        id: id,
        status_payment: 2,
      });
      if ("data" in res) {
        message.success("Sửa trạng thái thanh toán thành công");
        setLoading(false);
      } else {
        message.error("Sửa trạng thái thanh toán không thành công");
        setLoading(false);
      }
    }
  };

  return (
    <Button
      type="primary"
      onClick={() => redirectToAppointment(data.id, data.status.id)}
      className="btn-edit"
      loading={loading}
    >
      {data.status.id === 1
        ? "Xác nhận"
        : data.status.id === 2
        ? "Giao hàng"
        : data.status.id === 3
        ? "Hoàn Thành"
        : data.status.id === 4 && data.statusPayment.id === 1
        ? "Thanh toán"
        : ""}
    </Button>
  );
};

const ButtonReturn = ({ data }: { data: any }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [updateStatusOrder] = useUpdateOrderStatusMutation();

  const redirectToAppointment = async (id: number) => {
    // if (data.statusPayment.id === 2) {
      setLoading(true);
      const res = await updateStatusOrder({
        id: id,
        status_id: 6,
      });
      if ("data" in res) {
        message.success("Sửa trạng thái thành công");
        setLoading(false);
      } else {
        message.error("Sửa trạng thái không thành công");
        setLoading(false);
      }
    // }
  };

  return (
    <Button
      type="primary"
      onClick={() => redirectToAppointment(data.id)}
      className="btn-edit"
      loading={loading}
    >
      Trả hàng
    </Button>
  );
};

const ButtonCancel = ({ data }: { data: any }) => {
  const [loadingCancel, setLoadingCancel] = useState<boolean>(false);

  const [updateStatusOrder] = useUpdateOrderStatusMutation();

  const confirm = async (id: number) => {
    setLoadingCancel(true);
    const res = await updateStatusOrder({ id: id, status_id: 5 });
    if ("data" in res) {
      message.success("Hủy lịch đặt thành công");
      setLoadingCancel(false);
    } else {
      message.error("Hủy lịch đặt không thành công");
      setLoadingCancel(false);
    }
  };

  return (
    <Popconfirm
      onConfirm={() => confirm(data.id)}
      title="Hủy lịch"
      description="Bạn có chắc chắn hủy lịch này không?"
    >
      <Button
        danger
        loading={loadingCancel}
        className="btn-delete"
        disabled={
          data.status.id === 4 || data.status.id === 5 || data.status.id === 6
        }
      >
        Hủy
      </Button>
    </Popconfirm>
  );
};
