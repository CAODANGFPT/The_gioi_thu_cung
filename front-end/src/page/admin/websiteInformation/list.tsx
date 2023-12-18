import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TWebsiteInformation } from "../../../schema/websiteInformation";
import {
  useGetAllWebsiteInformationQuery,
  useRemoveWebsiteInformationMutation,
} from "../../../services/websiteInformation";

const WebsiteInformationAdmin: React.FC = () => {
  const { data } = useGetAllWebsiteInformationQuery();
  const [removeWebsiteInformation] = useRemoveWebsiteInformationMutation();
  const confirm = (id: number) => {
    removeWebsiteInformation(id)
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

  const columns: ColumnsType<TWebsiteInformation> = [
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
      dataIndex: "logo",
      key: "logo",
      width: 150,
      render: (logo) => <Image width={100} src={logo} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      render: (phone) => <span>{phone ? `0${phone}` : ""}</span>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 150,
    },
    {
      title: "Link FB",
      dataIndex: "fb",
      key: "fb",
      width: 150,
    },
    {
      title: "Link Zalo",
      dataIndex: "zalo",
      key: "zalo",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (websiteInformation: TWebsiteInformation) => (
        <div>
          <Link to={`edit/${websiteInformation.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa website information."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              websiteInformation.id !== undefined
                ? confirm(websiteInformation.id)
                : undefined
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
      <TableAdmin columns={columns} data={data} />
    </>
  );
};

export default WebsiteInformationAdmin;
