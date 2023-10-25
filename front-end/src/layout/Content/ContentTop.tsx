import MenuIcon from  "../../assets/svg/menuIcon";
import SearchIcon from  "../../assets/svg/searchIcon";
import BellIcon from  "../../assets/svg/belIIcon";

import "../../assets/scss/layout/contentAdmin/contentTop.scss";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";

const ContentTop: React.FC = () => {
  const { toggleSidebar } = useContext<any>(SidebarContext);
  return (
    <div className="content-top">
      <div className="content-top-left">
        <button type="button" className="sidebar-toggler" onClick={() => toggleSidebar()}>
          <MenuIcon />
        </button>
        <h3 className="content-top-title">Home</h3>
      </div>
      <div className="content-top-btn">
        <button type="button" className="search-btn content-top-btn">
          <SearchIcon/>
        </button>
        <button className="notification-btn content-top-btn">
          <BellIcon />
          <span className="notification-btn-dot"></span>
        </button>
      </div>
    </div>
  );
};

export default ContentTop;
