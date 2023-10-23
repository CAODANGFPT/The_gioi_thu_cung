import React from "react";
import { Button, Popconfirm, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface StatusType {
  key: string;
  name: string;
}
const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<StatusType> = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Trạng thái",
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

const data: StatusType[] = [
  {
    key: "1",
    name: "Đã hoàn thành",
  },
  {
    key: "2",
    name: "Đang chờ xác nhận",
  },
  {
    key: "3",
    name: "Đang xử lý",
  },
  {
    key: "4",
    name: "Đang bảo trì",
  },
  {
    key: "5",
    name: "Đã hủy",
  },
];

const StatusAdmin: React.FC = () => (
  <Table columns={columns} dataSource={data} />
);

export default StatusAdmin;
