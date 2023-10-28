import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TPets } from "../../../schema/pets";
import { useGetAllPetsQuery } from "../../../services/pets";

const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<TPets> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: "IMG",
    dataIndex: "img",
    key: "img",
    width: 150,
    render: (logo) => <Image width={100} src={logo} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 150,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 150,
  },
  {
    title: "User_id",
    dataIndex: "nameUser",
    key: "nameUser",
    width: 150,
  },
  {
    title: "Species_id",
    dataIndex: "nameSpecies",
    key: "nameSpecies",
    width: 150,
  },
  {
    title: "Breed_id",
    dataIndex: "nameBreed",
    key: "nameBreed",
    width: 150,
  },
  {
    title: "Thao tác",
    key: "action",
    width: 100,
    render: (id) => (
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

const PetsAdmin: React.FC = () => {
  const { data } = useGetAllPetsQuery();
  return <TableAdmin columns={columns} data={data} />;
};

export default PetsAdmin;
