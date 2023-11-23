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
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
      } else if (!isLoading) {
        if (!user) {
          navigate("/signin");
        } else if (Number(user?.role_id) !== 1) {
          navigate("/");
        }
      }
    };

    checkAuthentication();
  }, [isLoading, user, navigate]);
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
