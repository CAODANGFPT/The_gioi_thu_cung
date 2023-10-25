import React, { useEffect, useState } from "react";
import logo from "../../assets/image/logo.png";
import { navigationLinks } from "../../assets/data/data";
import "../../assets/scss/layout/admin/sidebar.scss";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const [sidebarText, setSidebarText] = useState("");
  const [borderRadius, setBorderRadius] = useState("");

  const { isSidebarOpen } = useContext<any>(SidebarContext);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
      setSidebarText("setSidebarText");
      setBorderRadius("borderRadius");
    } else {
      setSidebarClass("");
      setSidebarText("");
      setBorderRadius("");
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <img src={logo} alt="profileimage" />
      </div>

      <nav className="nav">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-list-item" key={navigationLink.id}>
              <Link
                className={`${borderRadius} nav-list-item-link  ${
                  navigationLink.id === activeLinkIdx ? "active" : null
                }`}
                to={""}
              >
                <div className="nav-list-item-link-icon">
                  {navigationLink.image &&
                    React.createElement(navigationLink.image)}
                </div>
                <span className={`nav-list-item-link-text ${sidebarText}`}>
                  {navigationLink.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
