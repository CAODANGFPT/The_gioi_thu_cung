import React from "react";
import { Button, Popconfirm, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface PetType {
  key: string;
  name: string;
}
const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<PetType> = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Loại thú cưng",
    dataIndex: "name",
    key: "name",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Thao tác",
    key: "action",
    render: (text) => (
      <div>
        <Link to="URL">
          <Button className="btn-edit" style={{ marginRight: "1rem" }}>
            Edit
          </Button>
        </Link>
        <Popconfirm
          title="Xóa loại thú cưng"
          description="Bạn có muốn xóa không?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger className="btn-delete">
            Delete
          </Button>
        </Popconfirm>
      </div>
    ),
  },
];

const data: PetType[] = [
  {
    key: "1",
    name: "Mèo",
  },
  {
    key: "2",
    name: "Chó",
  },
  {
    key: "3",
    name: "Mèo",
  },
  {
    key: "4",
    name: "Chó",
  },
];

const PetTypeAdmin: React.FC = () => (
  <Table columns={columns} dataSource={data} />
);

export default PetTypeAdmin;
