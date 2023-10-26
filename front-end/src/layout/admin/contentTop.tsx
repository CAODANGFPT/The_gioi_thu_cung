import { Dropdown } from "antd";
import { useContext } from "react";
import "../../assets/scss/layout/contentAdmin/contentTop.scss";
import BellIcon from "../../assets/svg/belIIcon";
import MenuIcon from "../../assets/svg/menuIcon";
import SearchIcon from "../../assets/svg/searchIcon";
import { SidebarContext } from "../../context/sidebarContext";
import ModalUser from "./modal";

const ContentTop: React.FC = () => {
  const { toggleSidebar } = useContext<any>(SidebarContext);
  return (
    <div className="content-top">
      <div className="content-top-left">
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <MenuIcon />
        </button>
        <h3 className="content-top-title">Home</h3>
      </div>
      <div className="content-top-btn">
        <button type="button" className="search-btn content-top-btn">
          <SearchIcon />
        </button>
        <button className="notification-btn content-top-btn">
          <BellIcon />
          <span className="notification-btn-dot" />
        </button>
        <div >
          <Dropdown
            overlay={<ModalUser />}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <img
              src="https://sneat-vuetify-admin-template.vercel.app/assets/avatar-1-19a9226d.png"
              width="25px"
              height="25px"
              style={{ borderRadius: "50%", marginLeft: '18px' }}
              alt="avatar"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ContentTop;
