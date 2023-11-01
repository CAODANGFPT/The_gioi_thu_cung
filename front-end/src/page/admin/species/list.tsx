import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";

import {
  useGetAllspeciesQuery,
  useRemoveSpeciesMutation,
} from "../../../services/species";
import { Tspecies } from "../../../schema/species";
import { PlusOutlined } from "@ant-design/icons";
const SpeciesAdmin: React.FC = () => {
  const [removeSpecies] = useRemoveSpeciesMutation();
  const confirm = (id: number) => {
    removeSpecies(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<Tspecies> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (species: Tspecies) => (
        <div>
          <Link to={`edit/${species.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              species.id !== undefined ? confirm(species.id) : undefined
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

  const { data } = useGetAllspeciesQuery();
  return (
    <div>
      <Link to="/admin/species/add">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: "1rem" }}
        >
          THÊM LOẠI
        </Button>
      </Link>
      <TableAdmin columns={columns} data={data} />
    </div>
  );
};

export default SpeciesAdmin;
