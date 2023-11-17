import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TContact } from "../../../schema/contact";
import { useNewsQuery, useRemoveNewsMutation } from "../../../services/news";
import { TNews } from "../../../schema/news";
import { PlusOutlined } from "@ant-design/icons";
const NewsAdmin: React.FC = () => {
  const [removeNews] = useRemoveNewsMutation();
  const confirm = (id: number) => {
    removeNews(id)
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

  const columns: ColumnsType<TContact> = [
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
      width: 130,
      render: (img) => <Image width={100} src={img} />,
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
      width: 150,
      render: (data: TNews) => (
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

  const { data } = useNewsQuery();

  return (
    <div>
      <Link to="/admin/news/add">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: "1rem" }}
        >
          THÊM BÀI ĐĂNG
        </Button>
      </Link>
      <TableAdmin columns={columns} data={data} />
    </div>
  );
};

export default NewsAdmin;
