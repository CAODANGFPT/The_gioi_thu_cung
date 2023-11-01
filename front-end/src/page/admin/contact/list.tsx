import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TContact } from "../../../schema/contact";
import { useContactQuery } from "../../../services/contact";

const ContactAdmin: React.FC = () => {
  const { data } = useContactQuery();


const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<TContact> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 150,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 150,
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
    width: 150,
  },
  {
    title: "User_id",
    dataIndex: "user_id",
    key: "user_id",
    width: 150,
  },
  {
    title: "Trạng thái",
    dataIndex: "statusName",
    key: "statusName",
    width: 150,
  },
  {
    title: "Thao tác",
    key: "action",
    width: 100,
    render: (contact) => (
      <div>
        <Link to={`edit/${contact.id}`}>
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

  return <TableAdmin columns={columns} data={data} />;
};

export default ContactAdmin;
