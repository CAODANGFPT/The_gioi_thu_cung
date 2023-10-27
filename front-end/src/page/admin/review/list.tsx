import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import TableAdmin from "../../../components/table";
import { TStatus } from "../../../schema/status";
import { useReviewQuery } from "../../../services/review";
import dayjs from "dayjs";

const confirm = () => {
  message.success("Xóa thành công.");
};

const cancel = () => {
  message.error("Xóa không thành công.");
};

const columns: ColumnsType<TStatus> = [
  {
    title: "TT",
    dataIndex: "id",
    key: "id",
    width: 150,
  },
  {
    title: "Tên tài khoản",
    dataIndex: "user_name",
    key: "user_name",
    width: 150,
  },
  {
    title: "Xếp hạng",
    dataIndex: "rating",
    key: "rating",
    width: 150,
  },
  {
    title: "Bình luận",
    dataIndex: "comment",
    key: "comment",
    width: 150,
  },
  {
    title: "Thời gian",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => (
      <div>{dayjs(text).format("DD-MM-YYYY (HH:mm)")}</div>
    ),
    width: 150,
  },
  {
    title: "Thao tác",
    key: "action",
    width: 100,
    render: (id) => (
      <div>
        <Popconfirm
          title="Xóa trạng thái."
          description="Bạn có muốn xóa không?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger className="btn-delete">
            Khóa
          </Button>
        </Popconfirm>
      </div>
    ),
  },
];

const ReviewAdmin: React.FC = () => {
  const { data, isLoading, refetch } = useReviewQuery();
  return <TableAdmin columns={columns} data={data} />;
};

export default ReviewAdmin;
