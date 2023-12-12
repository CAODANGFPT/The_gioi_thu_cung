import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TStatusOrder } from "../../../schema/status_order";
import {
  useGetAllstatusOrderQuery,
  useRemoveStatusOrderMutation,
} from "../../../services/status_order";
import { PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

const StatusOrderAdmin: React.FC = () => {
  const { data } = useGetAllstatusOrderQuery();

  const [filter, setFilter] = useState({ name: "" });
  const [listSttOrder, setListSttOrder] = useState<TStatusOrder[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const navigate = useNavigate();
  const [removeOrderContact] = useRemoveStatusOrderMutation();

  const confirm = async (id: number) => {
    try {
      await removeOrderContact(id);
      message.success("Xóa thành công.");
    } catch (error) {
      message.success("Xóa không thành công.");
    }
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TStatusOrder> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "action",
      width: 100,
      render: (id: number) => (
        <div>
          <Button
            onClick={() => navigate(`edit/${id}`)}
            className="btn-edit"
            style={{ marginRight: "1rem" }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button danger className="btn-delete">
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.name?.toLowerCase().includes(filter.name.trim().toLowerCase())
    );
    setListSttOrder(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name]);
  return (
    <div>
      <div className="btn-table">
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm Trạng Thái "
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
      <Link to="/admin/status_order/add">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: "1rem" }}
        >
          THÊM TRẠNG THÁI ĐẶT HÀNG
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listSttOrder} />
    </div>
  );
};

export default StatusOrderAdmin;
