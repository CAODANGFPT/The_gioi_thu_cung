import React from "react";
import { message, Popconfirm, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface ServicesType {
  key: string;
  name: string;
  des: string;
  price: number;
}
const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<ServicesType> = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "name",
    key: "name",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Mô tả",
    dataIndex: "des",
    key: "des",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Vai trò",
    dataIndex: "name",
    key: "name",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Thao tác",
    key: "action",
    render: (text, record) => (
      <div>
        <Link to={`URL/${record.key}`}>
          <Button className="btn-edit" style={{ marginRight: "1rem" }}>
            Sửa
          </Button>
        </Link>
        <Popconfirm
          title="Xóa vai trò."
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

const ServicesAdmin: React.FC = () => (
  <>
    <h1 className="">Danh sách danh mục</h1>
    <div className="my-2 text-3xl font-semibold text-center md:ml-14 md:text-left"></div>
    <Table columns={columns} dataSource={data} />
  </>
);
export default ServicesAdmin;


const data: ServicesType[] = [
    {
      key: "1",
      name: "Tắm rửa",
      des: "Mô tả 1",
      price: 300,
    },
    {
      key: "2",
      name: "Tỉa Lông",
      des: "Mô tả 2",
      price: 400,
    },
    {
      key: "3",
      name: "Tỉa móng",
      des: "Mô tả 3",
      price: 400,
    },
  ];
  