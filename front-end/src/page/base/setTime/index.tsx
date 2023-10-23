import React from "react";
import { Button, Popconfirm, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface SetTimeType {
  key: string;
  name: string;
}
const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<SetTimeType> = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Ca (Thời gian)",
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
          title="Xóa Ca (Thời gian)."
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

const data: SetTimeType[] = [
  {
    key: "1",
    name: "Ca 1 (8h - 9h)",
  },
  {
    key: "2",
    name: "Ca 2 (9h10 - 10h10)",
  },
  {
    key: "3",
    name: "Ca 3 (10h20 - 11h20)",
  },
  {
    key: "4",
    name: "Ca 4 (11h30 - 12h30)",
  },
  {
    key: "5",
    name: "Ca 5 (12h40 - 13h40)",
  },
];

const SetTimeAdmin: React.FC = () => (
  <Table columns={columns} dataSource={data} />
);

export default SetTimeAdmin;
