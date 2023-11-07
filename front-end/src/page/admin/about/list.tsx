import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TAbout } from "../../../schema/about";
import { useAboutQuery, useRemoveAboutMutation } from "../../../services/about";
import { PlusOutlined } from "@ant-design/icons";

const AboutAdmin: React.FC = () => {
  const { data } = useAboutQuery();

  const navigate = useNavigate();

  const [removeAbout] = useRemoveAboutMutation();

  const confirm = (id: number) => {
    removeAbout(id)
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

  const columns: ColumnsType<TAbout> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
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
      width: 150,
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
            onConfirm={() =>
              about.id !== undefined ? confirm(about.id) : undefined
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
