import React from "react";
import { Button, Popconfirm, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface breedType {
  key: string;
  name: string;
  species_id: number;
}
const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<breedType> = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Giống loài",
    dataIndex: "name",
    key: "name",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "ID động vật",
    dataIndex: "species_id",
    key: "species_id",
    render: (number) => <div>{number}</div>,
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
          title="Xóa giống loài."
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

const data: breedType[] = [
  {
    key: "1",
    name: "Chó Chihuahua",
    species_id: 1,
  },
  {
    key: "2",
    name: "Chó Poodle",
    species_id: 1,
  },
  {
    key: "3",
    name: "Mèo Anh lông ngắn",
    species_id: 2,
  },
  {
    key: "4",
    name: "Mèo Ba Tư",
    species_id: 2,
  },
  {
    key: "5",
    name: "Chó Pug",
    species_id: 1,
  },
];

const BreedAdmin: React.FC = () => (
  <Table columns={columns} dataSource={data} />
);

export default BreedAdmin;
