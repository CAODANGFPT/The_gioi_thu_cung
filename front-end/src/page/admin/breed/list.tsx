import { Button, Popconfirm, Select, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TBreed } from "../../../schema/breed";
import {
  useGetAllBreedQuery,
  useRemoveBreedMutation,
} from "../../../services/breed";
import { useGetAllspeciesQuery } from "../../../services/species";
import { Tspecies } from "../../../schema/species";
import Search from "antd/es/input/Search";
const BreedAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [removeBreed] = useRemoveBreedMutation();
  const [dataBreed, setDataBreed] = useState<any | null>(null);
  const { data } = useGetAllBreedQuery();
  useEffect(() => {
    if (data) {
      setDataBreed(data);
    }
  }, [data]);

  const [filter, setFilter] = useState({ name: "", species: "" });
  const [openReset, setOpenReset] = useState<boolean>(false);


  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };
  const confirm = (id: number) => {
    removeBreed(id)
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

  const { data: speciesData } = useGetAllspeciesQuery<any | null>(); 

  const [species, setSpecies] = useState([]);

  useEffect(() => {
    if (speciesData) {
      setSpecies(speciesData);
    }
  }, [speciesData]);
  const columns: ColumnsType<TBreed> = [
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
      title: "Loài",
      dataIndex: "speciesName",
      key: "speciesName",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (data: TBreed) => (
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


  const [selectedSpecies, setSelectedSpecies] = useState<"all" | number>(
    "all"
  );
  useEffect(() => {
    if (filter.name === "" && filter.species === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name, filter.species]);

  useEffect(() => {
    let filteredData = data;

    if (filter.name !== "") {
      filteredData = filteredData?.filter((item) =>
        item.name?.toLowerCase().includes(filter.name.trim().toLowerCase())
      );
    }

    if (filter.species !== "all" && filter.species !== "") {
      filteredData = filteredData?.filter((item) =>
        item.speciesName
          ?.toLowerCase()
          .includes(filter.species.trim().toLowerCase())
      );
    }
    setDataBreed(filteredData);
  }, [data, filter]);

  const handleCategoryChange = (value: number | "all") => {
    setSelectedSpecies(value);

    if (value === "all") {
      setDataBreed(data);
    } else {
      const filteredProducts = data?.filter(
        (breed) => breed.species_id === value
      );
      setDataBreed(filteredProducts);
    }
  };
  return (
    <>
      <div
        className="btn-table"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm tên giống"
            value={filter?.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ name: "", species: "" })}
            danger
            disabled={!openReset}
          >
            Cài lại
          </Button>
          <Select
              style={{ width: 200, marginBottom: 10 }}
              placeholder="Chọn danh mục"
              value={selectedSpecies}
              onChange={(value) => handleCategoryChange(value)}
            >
              <Select.Option value="all">Tất cả</Select.Option>
              {species?.map((category: Tspecies) => (
                <Select.Option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </Select.Option>
              ))}
            </Select>
        </div>
      </div>
      <Button
        type="primary"
        onClick={() => navigate("add")}
        icon={<PlusOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        THÊM GIỐNG
      </Button>
      <TableAdmin columns={columns} data={dataBreed} />
    </>
  );
};

export default BreedAdmin;
