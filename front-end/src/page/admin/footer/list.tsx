import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TFooter } from "../../../schema/footer";
import {
  useGetAllFooterQuery,
  useRemoveFooterMutation,
} from "../../../services/footer";

const FooterAdmin: React.FC = () => {
  const { data } = useGetAllFooterQuery();
  const [removeFooter] = useRemoveFooterMutation();
  const confirm = (id: number) => {
    removeFooter(id)
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

  const renderContentColumn = (content: string) => {
    // Giới hạn hiển thị chỉ khoảng 100 ký tự
    const truncatedContent =
      content.length > 100 ? `${content.substring(0, 100)}...` : content;

    return <span title={content}>{truncatedContent}</span>;
  };

  const columns: ColumnsType<TFooter> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Slogan",
      dataIndex: "slogan",
      key: "slogan",
      width: 150,
    },
    {
      title: "Nội dung trái",
      dataIndex: "content_left",
      key: "content_left",
      width: 150,
      render: (content_left) => renderContentColumn(content_left),
    },

    {
      title: "Nội dung phải",
      dataIndex: "content_right",
      key: "content_right",
      width: 150,
      render: (content_right) => renderContentColumn(content_right),
    },
    {
      title: "Bản quyền",
      dataIndex: "license",
      key: "license",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (footer: TFooter) => (
        <div>
          <Link to={`edit/${footer.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa Footer."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              footer.id !== undefined ? confirm(footer.id) : undefined
            }
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button danger className="btn-delete" disabled>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <h1 style={{ marginBottom: "1rem" }}>Quản lý Footer website.</h1>
      </div>
      <TableAdmin columns={columns} data={data} />
      <div>
        <p
          style={{ fontSize: "17px", fontWeight: "bold", fontStyle: "italic" }}
        >
          Ghi chú:
          <span
            style={{ color: "red", fontWeight: "500", fontStyle: "normal" }}
          >
            Phần quản lý Footer website chỉ có thể cập nhật không thể thêm và
            xóa!
          </span>
        </p>
      </div>
    </>
  );
};

export default FooterAdmin;
