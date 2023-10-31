import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TServices } from "../../../schema/services";
import { useServicesQuery } from "../../../services/services";

const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<TServices> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    fixed: "right",
    width: 150,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 150,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 150,
  },
  {
    title: "Thao tác",
    key: "action",
    dataIndex: "id",
    width: 100,
    render: (id) => (
      <div>
        <Link to={`edit/${id}`}>
          <Button className="btn-edit" style={{ marginRight: "1rem" }}>
            Sửa
          </Button> 
        </Link>
        <Popconfirm
          title="Xóa trạng thái."
          description="Bạn có muốn xóa không?"
          onConfirm={confirm}
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

const ServicesAdmin: React.FC = () => {
  const { data } = useServicesQuery();
  return (
    <>
      <TableAdmin columns={columns} data={data} link={"add"} />;
    </>
  );
};

export default ServicesAdmin;
