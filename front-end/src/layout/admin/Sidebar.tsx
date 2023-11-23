import React, { useEffect, useState } from "react";
import logo from "../../assets/image/logo.png";
import { navigationLinks } from "../../assets/data/data";
import "../../assets/scss/layout/admin/sidebar.scss";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate()
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const [sidebarText, setSidebarText] = useState("");
  const [borderRadius, setBorderRadius] = useState("");

  const { isSidebarOpen } = useContext<any>(SidebarContext);

  const { pathname } = useLocation();

  useEffect(() => {
    const order = navigationLinks.find(
      (item) => item.link === pathname.split("/")[2]
    );
    setActiveLinkIdx(order?.id || 1);
  }, [pathname]);
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

  const handleLinkClick = (id: number) => {
    setActiveLinkIdx(id);
  };

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <img onClick={() => navigate('/')} style={{cursor: 'pointer'}} src={logo} alt="profileImage" />
      </div>

      <nav className="nav">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-list-item" key={navigationLink.id}>
              <Link
                className={`${borderRadius} nav-list-item-link  ${
                  navigationLink.id === activeLinkIdx ? "active" : null
                }`}
                onClick={() => handleLinkClick(navigationLink.id)}
                to={navigationLink.link}
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
