import { Button, Table } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type TableAdminProps = {
  columns: ColumnsType<object>;
  data: object[] | undefined;
  link?: string
};

const TableAdmin: React.FC<TableAdminProps> = ({ columns, data, link }) => {
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
      <Button onClick={() => navigate(link || "")}>Add</Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableAdmin;
