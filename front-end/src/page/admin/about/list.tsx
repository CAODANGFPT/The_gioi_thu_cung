import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TAbout } from "../../../schema/about";
import { useAboutQuery } from "../../../services/about";
import { PlusOutlined } from "@ant-design/icons";

const AboutAdmin: React.FC = () => {
  const { data } = useAboutQuery();

  const confirm = () => {
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TAbout> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (image) => <Image width={100} src={image} />,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (about: TAbout) => (
        <div>
          <Link to={`edit/${about.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa about."
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

  return (
    <div>
      <Link to="/admin/about/add">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: "1rem" }}
        >
          THÊM ABOUT
        </Button>
      </Link>
      <TableAdmin columns={columns} data={data} />
    </div>
  );
};

export default AboutAdmin;
