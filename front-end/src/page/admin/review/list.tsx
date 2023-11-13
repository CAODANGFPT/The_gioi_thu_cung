import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import TableAdmin from "../../../components/table";
import { TStatus } from "../../../schema/status";
import {
  useReviewQuery,
  useUpdateBlockReviewMutation,
} from "../../../services/review";
import dayjs from "dayjs";
import { TBlockReview } from "../../../schema/review";

const ReviewAdmin: React.FC = () => {
  const { data, isLoading, refetch } = useReviewQuery();
  const [updateBlockReview] = useUpdateBlockReviewMutation();

  const confirmBlock = (review: TBlockReview) => {
    updateBlockReview({ id: review.id, is_delete: 1 });
    message.success("Khóa thành công.");
  };

  const confirm = (review: TBlockReview) => {
    updateBlockReview({ id: review.id, is_delete: 0 });
    message.success("Mở thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TStatus> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
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
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY (HH:mm)")}</div>,
      width: 150,
    },
    {
      title: "Thao tác",
      key: "id",
      width: 100,
      render: (review) => (
        <div>
          {review.is_delete ? (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn mở khóa không?"
              onConfirm={() => confirm(review)}
              onCancel={cancel}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Button type="primary" ghost>
                Mở khóa
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn khóa không?"
              onConfirm={() => confirmBlock(review)}
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

export default ReviewAdmin;
