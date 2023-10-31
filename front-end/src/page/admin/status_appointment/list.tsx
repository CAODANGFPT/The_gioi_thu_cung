import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TStatus } from "../../../schema/status";
import {
  useRemoveStatusAppointmentMutation,
  useStatusQuery,
} from "../../../services/status_appointment";

const StatusAdmin: React.FC = () => {
  const navigator = useNavigate();
  const { data } = useStatusQuery();
  const [removeStatusAppointment] = useRemoveStatusAppointmentMutation();
  const confirm = async(id: number) => {
    try {
      await removeStatusAppointment(id);
      message.success("Xóa thành công.");
    } catch (error) {
      message.success("Xóa không thành công.");
    }
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TStatus> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "action",
      width: 100,
      render: (id: number) => (
        <div>
          <Link to={`edit/${id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(id)}
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

  return (
    <div>
      <Button
        onClick={() => navigator("add")}
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        THÊM TRẠNG THÁI
      </Button>
      <TableAdmin columns={columns} data={data} />
    </div>
  );
};

export default StatusAdmin;
