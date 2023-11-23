import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TBreed } from "../../../schema/breed";
import { useBreedQuery, useRemoveBreedMutation } from "../../../services/breed";
const BreedAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [removeBreed] = useRemoveBreedMutation();
  const confirm = (id: number) => {
    removeBreed(id)
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

  const columns: ColumnsType<TBreed> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Giống",
      dataIndex: "nameSpecies",
      key: "nameSpecies",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (data: TBreed) => (
        <div>
          <Link to={`edit/${data.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              data.id !== undefined ? confirm(data.id) : undefined
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

  const { data } = useBreedQuery(1);
  return (
    <>
      <Button
        type="primary"
        onClick={() => navigate("add")}
        icon={<PlusOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        THÊM GIỐNG
      </Button>
      <TableAdmin columns={columns} data={data} />
    </>
  );
};

export default BreedAdmin;
