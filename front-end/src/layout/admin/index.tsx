import "../../assets/scss/layout/admin/sidebar.scss";
import "../../assets/scss/layout/admin/index.scss";
import React, { FC } from "react";
import Sidebar from "./Sidebar";
import Content from "../Content/Content";
import "./index.scss";
type Props = {};

const LayoutAdmin: FC<Props> = (props) => {
  return (
    <div>
      <div className="app">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default LayoutAdmin;
