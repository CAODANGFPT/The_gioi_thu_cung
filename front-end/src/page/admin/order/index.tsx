import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TOrderAdminSchema } from "../../../schema/order";
import { useGetAllOrderUserQuery } from "../../../services/order";
import * as XLSX from "xlsx";
import Search from "antd/es/input/Search";

const OrderAdmin: React.FC = () => {
  const navigate = useNavigate();
  const orderNameFile: string = "Đơn hàng";

  const [dataOrder, setDataOrder] = useState<any | null>(null);
  const { data } = useGetAllOrderUserQuery();
  useEffect(() => {
    if (data) {
      setDataOrder(data);
    }
  }, [data]);
  const [filter, setFilter] = useState({ name: "" });
  const [openReset, setOpenReset] = useState<boolean>(false);

  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.userName?.toLowerCase().includes(filter.name.trim().toLowerCase())
    );
    setDataOrder(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name]);
  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };
  const detailOrder = (item: any) => {
    navigate("detail", {
      state: {
        ...item,
      },
    });
  };
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
  const columns: ColumnsType<TOrderAdminSchema> = [
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
  return (
    <>
      <Button
        style={{ marginTop: 20, marginBottom: 20 }}
        className="btn"
        onClick={() => exportToExcel()}
      >
        Xuất excel
      </Button>
      <div
        className="btn-table"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tên người mua"
            value={filter?.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ name: "" })}
            danger
            disabled={!openReset}
          >
            Cài lại
          </Button>
        </div>
      </div>
      <TableAdmin columns={columns} data={dataOrder || []} />;
    </>
  );
};

export default OrderAdmin;
