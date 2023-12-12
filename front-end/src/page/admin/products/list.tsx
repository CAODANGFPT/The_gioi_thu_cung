import { Button, Popconfirm, message, Image, Form, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TProduct } from "../../../schema/products";
import {
  useGetAllProductsQuery,
  useRemoveProductMutation,
  useSearchAddProductMutation,
} from "../../../services/products";
import { useGetAllcategoryQuery } from "../../../services/category";
import Search from "antd/es/input/Search";
import { Tcategory } from "../../../schema/category";
const ProductsAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [removeProduct] = useRemoveProductMutation();

  const [dataProduct, setDataProduct] = useState<any | null>(null);
  const { data } = useGetAllProductsQuery();
  useEffect(() => {
    if (data) {
      setDataProduct(data);
    }
  }, [data]);

  const [filter, setFilter] = useState({ name: "" });
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };
  const confirm = (id: number) => {
    removeProduct(id)
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

  const { data: category } = useGetAllcategoryQuery();

  const optionsCategory = category?.map((item: TProduct) => ({
    value: item.id,
    label: item.name,
    disabled: item.category_id === 1,
  }));

  const { data: categoryData } = useGetAllcategoryQuery<any | null>(); // Fetch categories data

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData); // Set categories state when data is available
    }
  }, [categoryData]);

  const [searchAddProduct] = useSearchAddProductMutation();

  const columns: ColumnsType<TProduct> = [
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
      width: 150,
      render: (logo) => <Image width={100} src={logo} />,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
    },
    {
      title: "Danh mục",
      dataIndex: "nameCategory",
      key: "nameCategory",
      width: 150,
    },

    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (product: TProduct) => (
        <div>
          <Link to={`edit/${product.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              product.id !== undefined ? confirm(product.id) : undefined
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

  const [selectedCategory, setSelectedCategory] = useState<"all" | number>(
    "all"
  );

  const handleCateButtonClick = async (cateId: "all" | number) => {
    setSelectedCategory(cateId);
    if (cateId === "all") {
      setDataProduct(data);
    } else {
      const filteredProducts = data?.filter(
        (product) => product.category_id === cateId
      );
      setDataProduct(filteredProducts);
    }
  };

  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.name?.toLowerCase().includes(filter.name.trim().toLowerCase())
    );
    setDataProduct(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name]);

  const onFinish = async (values: any) => {
    const {status_id } = values;

    const productDataz = {
      status_id,
    };

    try {
      const data: any = await searchAddProduct(productDataz).unwrap();
      setDataProduct(data);
    } catch (error) {
      message.error("Không tìm thấy sản phẩm nào phù hợp");
    }
  };
  return (
    <>
      <Form
        name="validateOnly"
        className="search-appointments"
        layout="vertical"
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ marginTop: 10 }}
      >
        <div
          className="btn-table"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", columnGap: 20 }}>
            <Search
              placeholder="Tìm kiếm tên"
              value={filter?.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              style={{ width: 200, marginBottom: 10 }}
            />
            <Button
              onClick={() => setFilter({ name: "" })}
              danger
              disabled={!openReset}
            >
              Cài lại
            </Button>
          </div>
        </div>
      </Form>
      <div></div>
      <Button
        onClick={() => navigate("add")}
        type="primary"
        style={{ marginBottom: "1rem" }}
      >
        THÊM PRODUCTS
      </Button>
      <div className="btn-status-appointment">
        <li>
          <Button
            type="primary"
            style={{ marginBottom: 20 }}
            onClick={() => handleCateButtonClick("all")}
            className={selectedCategory === "all" ? "selected" : ""}
          >
            Tất cả
          </Button>
        </li>
        {categories?.map((FilterCard: any) => (
          <li>
            <Button
              type="primary"
              style={{ marginBottom: 20 }}
              onClick={() => handleCateButtonClick(FilterCard.id)}
              className={selectedCategory === FilterCard.id ? "selected" : ""}
              value={FilterCard.id}
            >
              {FilterCard.name}
            </Button>
          </li>
        ))}
      </div>
      <TableAdmin columns={columns} data={dataProduct} />
    </>
  );
};

export default ProductsAdmin;
