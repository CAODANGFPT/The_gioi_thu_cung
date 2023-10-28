import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import TableAdmin from "../../../components/table";
import { TStatus } from "../../../schema/status";
import {
  useUpdateBlockUserMutation,
  useUserQuery,
} from "../../../services/user";
import { TUser } from "../../../schema/user";
import { Link } from "react-router-dom";

const UserAdmin: React.FC = () => {
  const { data } = useUserQuery();

  const [removeProducts] = useUpdateBlockUserMutation();

  const confirm = (id: number) => {
    removeProducts({ id: id, is_delete: 0 });
    message.success("Mở khóa thành công.");
  };

  const confirmBlock = (id: number) => {
    removeProducts({ id: id, is_delete: 1 });
    message.success("Khóa thành công.");
  };

  const cancel = () => {
    message.error("Hủy thành công.");
  };

  const columns: ColumnsType<TStatus> = [
    {
      title: "TT",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      width: 150,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Vai trò",
      dataIndex: "nameRole",
      key: "nameRole",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "id",
      width: 200,
      render: (user: TUser) => (
        <div>
          <Link to={`edit/${user.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          {user.is_delete ? (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn mở khóa không?"
              onConfirm={() => confirm(user.id)}
              onCancel={cancel}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Button type="primary" ghost>
                Mở Khóa
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn khóa không?"
              onConfirm={() => confirmBlock(user.id)}
              onCancel={cancel}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Button danger className="btn-delete">
                Khóa
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];
  return <TableAdmin columns={columns} data={data} />;
};

export default UserAdmin;
