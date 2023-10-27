import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TContact } from "../../../schema/contact";
import { useContactQuery } from "../../../services/contact";

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
    width: 50,
  },
  {
    title: "Ảnh",
    dataIndex: "logo",
    key: "logo",
    width: 130,
    render: (logo) => <Image width={100} src={logo} />,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 150,
  },
  {
    title: "Created_At",
    dataIndex: "created_at",
    key: "created_at",
    width: 150,
  },
  {
    title: "User_ID",
    dataIndex: "nameUser",
    key: "nameUser",
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

const NewsAdmin: React.FC = () => {
  const { data, isLoading, refetch } = useContactQuery();
  return <TableAdmin columns={columns} data={data} />;
};

export default NewsAdmin;