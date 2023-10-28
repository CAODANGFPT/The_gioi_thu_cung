import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TStaff } from "../../../schema/staff";
import { useStaffQuery } from "../../../services/staff";

const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<TStaff> = [
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

const StaffAdmin: React.FC = () => {
  const { data } = useStaffQuery();
  return <TableAdmin columns={columns} data={data} />;
};

export default StaffAdmin;
