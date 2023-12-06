import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Checkbox, Col, Select } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import * as React from "react";
import { useState } from "react";
import "../../../assets/scss/page/listproduct.scss";
import FilterIcon from "../../../assets/svg/filterIcon";
import ListProductCard from "../../../components/listProduct";
import { useGetAllcategoryQuery } from "../../../services/category";
import { useGetAllProductsQuery } from "../../../services/products";
import { ListFilterCategoryData, ListFilterPriceData } from "./data";

// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

const ListProduct: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsList } = useGetAllProductsQuery();
  const { data: categories } = useGetAllcategoryQuery();
  const handlePageChange = (
    _event: any,
    page: React.SetStateAction<number>
  ) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 8;
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = productsList?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((productsList?.length || 0) / itemsPerPage);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  return (
    <div className="bg">
      <div className="titleProduct">
        <h2>
          Phụ kiện thú cưng
          <span>({productsList?.length})</span>
        </h2>

        <div className="btn-filter" onClick={handleOpen}>
          <FilterIcon />
          <button>Tất cả</button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="filter-onclick">
            <h3>bộ lọc</h3>
            <div className="brand">
              <div>
                <h3>Giá</h3>
                <ul>
                  {ListFilterPriceData.map((FilterCard) => {
                    return (
                      <li key={FilterCard.id}>
                        <form action="">
                          <input
                            type="checkbox"
                            value={FilterCard.name}
                            name={FilterCard.name}
                          />
                          <label htmlFor="">{FilterCard.name}</label>
                        </form>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3>Màu sắc</h3>
                <ul>
                  {ListFilterCategoryData.map((FilterCard) => {
                    return (
                      <li key={FilterCard.id}>
                        <form action="">
                          <input
                            type="checkbox"
                            value={FilterCard.name}
                            name={FilterCard.name}
                          />
                          <label htmlFor="">{FilterCard.name}</label>
                        </form>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Modal>
        <Select
          defaultValue="1"
          style={{ width: 200 }}
          options={[
            { value: "1", label: "Sản phẩm bán chạy" },
            { value: "2", label: "Sản phẩm mới" },
          ]}
        />
      </div>

      <div className="product">
        <div className="filter">
          <h3>bộ lọc</h3>
          <div className="brand">
            <div>
              <h4>Danh mục sản phẩm</h4>
              <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                <Col>
                  {categories?.map((FilterCard) => (
                    <Col>
                      <Checkbox value={FilterCard.id}>
                        {FilterCard.name}
                      </Checkbox>
                    </Col>
                  ))}
                </Col>
              </Checkbox.Group>
            </div>
            <div>
              <h4>Giá</h4>
              <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                <Col>
                  {ListFilterPriceData.map((FilterCard) => (
                    <Col>
                      <Checkbox value={FilterCard.id}>
                        {FilterCard.name}
                      </Checkbox>
                    </Col>
                  ))}
                </Col>
              </Checkbox.Group>
            </div>
          </div>
        </div>
        <div className="list-pagination">
          <div className="product-list">
            {productsList?.map((item) => {
              return <ListProductCard key={item.id} item={item} />;
            })}
          </div>
          <div className="pagination">
            <Stack direction="row" spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                variant="outlined"
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
