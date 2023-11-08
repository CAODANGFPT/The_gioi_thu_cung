import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TProduct } from "../../../schema/products";
import {
  useGetAllProductsQuery,
  useRemoveProductMutation,
} from "../../../services/products";
const ProductsAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useGetAllProductsQuery();
  const [removeProduct] = useRemoveProductMutation();
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

  const columns: ColumnsType<TProduct> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "IMG",
      dataIndex: "img",
      key: "img",
      width: 150,
      render: (logo) => <Image width={100} src={logo} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Category",
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

  return (
    <>
      <Button
        onClick={() => navigate("add")}
        type="primary"
        style={{ marginBottom: "1rem" }}
      >
        THÊM PRODUCTS
      </Button>
      <TableAdmin columns={columns} data={data} />
    </>
  );
};

export default ProductsAdmin;
