import Breadcrumbs from "@mui/material/Breadcrumbs";
import Modal from "@mui/material/Modal";
import * as React from "react";
import "../../../assets/scss/page/listproduct.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Link } from "react-router-dom";
import FilterIcon from "../../../assets/svg/filterIcon";
import ListProductCard from "../../../components/listProduct";
import {
  ListFilterBrandData,
  ListFilterColorData,
  ListFilterPriceData,
  productData,
} from "./data";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const ListProduct: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (
    _event: any,
    page: React.SetStateAction<number>
  ) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productData.length / itemsPerPage);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="bg">
      {/* <div className="breadcrumbs" role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="underline-hover" color="inherit" to="/">
            Trang chủ
          </Link>
          <Link className="underline-hover" color="inherit" to="/listproduct">
            Danh sách sản phẩm
          </Link>
        </Breadcrumbs>
      </div> */}

      <div className="titleProduct">
        <h2>
          Phụ kiện thú cưng
          <span> (35)</span>
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
                <h3>Thương hiệu</h3>

                <ul>
                  {ListFilterBrandData.map((FilterCard) => {
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
                  {ListFilterColorData.map((FilterCard) => {
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

        <select>
          <option value="bestselling">Sản phẩm bán chạy</option>
          <option value="productNew">Sản phẩm mới</option>
        </select>
      </div>

      <div className="product">
        <div className="filter">
          <h3>bộ lọc</h3>

          <div className="brand">
            <div>
              <h3>Thương hiệu</h3>

              <ul>
                {ListFilterBrandData.map((FilterCard) => {
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
                {ListFilterColorData.map((FilterCard) => {
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

        <div className="list-pagination">
          <div className="product-list">
            {currentItems.map((productData) => {
              return (
                <ListProductCard
                  key={productData.id}
                  name={productData.name}
                  sold={productData.sold}
                  url={productData.imageUrl}
                  price={productData.price}
                />
              );
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
