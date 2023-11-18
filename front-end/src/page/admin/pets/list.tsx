import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TPets } from "../../../schema/pets";
import {
  useGetAllPetsQuery,
  useRemovePetsMutation,
} from "../../../services/pets";
const PetsAdmin: React.FC = () => {
  const { data } = useGetAllPetsQuery();
  const [removePet] = useRemovePetsMutation();
  const confirm = (id: number) => {
    removePet(id)
      .then((response: any) => {
        if (response.error) {
          message.error("Bạn không thể xóa vì có liên quan khóa ngoại");
        } else {
          message.success("Xóa thành công.");
        }
      })
      .catch((error: any) => {
        message.error("Có lỗi xảy ra khi xóa.");
      });
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TPets> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      width: 150,
      render: (logo) => <Image width={100} src={logo} />,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
      width: 50,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      width: 100,
    },
    {
      title: "ID người dùng",
      dataIndex: "nameUser",
      key: "nameUser",
      width: 150,
    },
    {
      title: "ID Loài",
      dataIndex: "nameSpecies",
      key: "nameSpecies",
      width: 150,
    },
    {
      title: "ID Giống",
      dataIndex: "nameBreed",
      key: "nameBreed",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (pets: TPets) => (
        <div>
          <Link to="URL">
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              pets.id !== undefined ? confirm(pets.id) : undefined
            }
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

  return <TableAdmin columns={columns} data={data} />;
};

export default PetsAdmin;
