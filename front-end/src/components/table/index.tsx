import { Table } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import type { ColumnsType } from "antd/es/table";
import React from "react";

type TableAdminProps = {
  columns: ColumnsType<object>;
  data: object[] | undefined;
};

const TableAdmin: React.FC<TableAdminProps> = ({ columns, data }) => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
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
