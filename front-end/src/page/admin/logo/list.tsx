import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TLogo } from "../../../schema/logo";
import {
  useGetAllLogoQuery,
  useRemoveLogoMutation,
} from "../../../services/logo";

const LogoAdmin: React.FC = () => {
  const navigate = useNavigate();

  const { data } = useGetAllLogoQuery();

  const [removeLogo] = useRemoveLogoMutation();

  const confirm = (id: number) => {
    removeLogo(id)
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

  const columns: ColumnsType<TLogo> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Logo",
      dataIndex: "img",
      key: "img",
      width: 150,
      render: (logo) => <Image width={100} src={logo} />,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (logo: TLogo) => (
        <div>
          <Link to={`edit/${logo.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa logo."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              logo.id !== undefined ? confirm(logo.id) : undefined
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
    <>
      <Button
        onClick={() => navigate("add")}
        type="primary"
        style={{ marginBottom: "1rem" }}
      >
        THÊM LOGO
      </Button>
      <TableAdmin columns={columns} data={data} />
    </>
  );
};

export default LogoAdmin;
