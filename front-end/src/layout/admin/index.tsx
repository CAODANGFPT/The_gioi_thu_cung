import { useEffect } from "react";
import "../../assets/scss/layout/admin/index.scss";
import "../../assets/scss/layout/admin/sidebar.scss";
import { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../services/user";
import Sidebar from "./Sidebar";
import Content from "./content";
type Props = {};

const LayoutAdmin: FC<Props> = (props) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserQuery();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/signin");
      console.log("1");
    }
    if (!isLoading) {
      if (!user) {
        navigate("/signin");
        console.log("2");
      } else if (Number(user?.role_id) !== 1 && !isLoading) {
        console.log("3");
        navigate("/");
      }
    }
  }, [isLoading, token, navigate, user]);
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
