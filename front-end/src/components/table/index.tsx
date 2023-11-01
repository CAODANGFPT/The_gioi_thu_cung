import { Button, Table } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type TableAdminProps = {
  columns: ColumnsType<object>;
  data: object[] | undefined;
};

const TableAdmin: React.FC<TableAdminProps> = ({ columns, data }) => {
  const navigate = useNavigate();
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <div>
      <div className="btn-table">
        <Search
          placeholder="tìm kiếm"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableAdmin;
