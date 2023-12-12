import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TpetHouse } from "../../../schema/pethouse";
import {
  useGetAllpetHouseQuery,
  useRemovePetHouseMutation,
} from "../../../services/pethouse";
import { PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

const PetHouseAdmin: React.FC = () => {
  const [removePetHouse] = useRemovePetHouseMutation();
  const [dataPethouse, setDataPethouse] = useState<any | null>(null);
  const { data } = useGetAllpetHouseQuery();
  useEffect(() => {
    if (data) {
      setDataPethouse(data);
    }
  }, [data]);

  const [filter, setFilter] = useState({ name: "", price: "" });
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removePetHouse(id)
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

  const columns: ColumnsType<TpetHouse> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (room: TpetHouse) => (
        <div>
          <Link to={`edit/${room.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              room.id !== undefined ? confirm(room.id) : undefined
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

  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.name?.toLowerCase().includes(filter.name.trim().toLowerCase()) &&
      item.price?.toString().toLowerCase().includes(filter.price.trim().toLowerCase())
    );
    setDataPethouse(filteredData);
  }, [data, filter]);
  

  useEffect(() => {
    if (filter.name === "" && filter.price === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name, filter.price]);
  return (
    <div>
      <div
        className="btn-table"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm tên phòng"
            value={filter?.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Search
            placeholder="Tìm giá"
            value={filter?.price}
            onChange={(e) => handleFilterChange("price", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ name: "", price: "" })}
            danger
            disabled={!openReset}
          >
            Cài lại
          </Button>
        </div>
      </div>
      <Link to="/admin/pethouse/add">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: "1rem" }}
        >
          THÊM PHÒNG
        </Button>
      </Link>
      <TableAdmin columns={columns} data={dataPethouse} />
    </div>
  );
};

export default PetHouseAdmin;
