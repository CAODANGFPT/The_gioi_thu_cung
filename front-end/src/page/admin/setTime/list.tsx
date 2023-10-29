import { Button, Popconfirm, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TSetTime, TSetTimeAdd } from "../../../schema/setTime";
import {
  useRemoveSetTimeMutation,
  useSetTimeQuery,
} from "../../../services/setTime";
import dayjs from "dayjs";

const SetTimeAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useSetTimeQuery();

  const [removeSetTime] = useRemoveSetTimeMutation();

  const confirm = (id: number) => {
    removeSetTime(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TSetTime> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Ca",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Thời gian",
      key: "time",
      width: 150,
      render: (setTime) => (
        <>
          {setTime.start_time && setTime.end_time ? (
            <div>
              ({dayjs(setTime.start_time, "HH:mm:ss").format("HH:mm")} -{" "}
              {dayjs(setTime.end_time, "HH:mm:ss").format("HH:mm")})
            </div>
          ) : (
            <div>null</div>
          )}
        </>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
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
            onConfirm={() => confirm(id)}
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
        type="primary"
        onClick={() => navigate("add")}
        icon={<PlusOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        THÊM THỜI GIAN
      </Button>
      <TableAdmin columns={columns} data={data} />
    </>
  );
};

export default SetTimeAdmin;
