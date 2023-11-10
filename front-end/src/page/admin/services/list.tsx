import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TServices } from "../../../schema/services";
import {
  useServicesQuery,
  useUpdateBlockServicesMutation,
} from "../../../services/services";
import { TStatus } from "../../../schema/status";

const ServicesAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useServicesQuery();
  const [blockServices] = useUpdateBlockServicesMutation();

  const confirmBlock = (id: number) => {
    blockServices({ id: id, is_delete: 1 });
    message.success("khóa thành công");
  };

  const confirm = (id: number) => {
    blockServices({ id: id, is_delete: 0 });
    message.success("Mở thành công.");
  };

  const cancel = () => {
    message.error("khóa không thành công.");
  };

  const columns: ColumnsType<TStatus> = [
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
      key: "id",
      width: 100,
      render: (services: TServices) => (
        <div>
          <Link to={`edit/${services.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          {services.is_delete ? (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn mở khóa không?"
              onConfirm={() => confirm(services.id)}
              onCancel={cancel}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Button type="primary" ghost>
                Mở Khóa
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn khóa không?"
              onConfirm={() => confirmBlock(services.id)}
              onCancel={cancel}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Button danger className="btn-delete">
                Khóa
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <Button
        onClick={() => navigate("add")}
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        THÊM DỊCH VỤ
      </Button>
      <TableAdmin columns={columns} data={data} />
    </>
  );
};

export default ServicesAdmin;
