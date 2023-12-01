import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import User from "../../assets/image/user.png";
import "../../assets/scss/layout/base/headerBase.scss";
import CalendarIcon from "../../assets/svg/calendar";
import MenuIcon from "../../assets/svg/menuIcon";
import RightIcon from "../../assets/svg/rightIcon";
import SearchIcon from "../../assets/svg/searchIcon";
import ShoppingCartIcon from "../../assets/svg/shoppingCartIcon";
import { useGetUserListCartsQuery } from "../../services/shoppingCart";
import { useGetUserQuery } from "../../services/user";
import ModalUser from "./modal";

const HeaderBase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useGetUserQuery();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [countCarts, setCountCarts] = useState<number>(0);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [dataOrder, setDataOrder] = useState<any>([]);
  const { data: carts } = useGetUserListCartsQuery();

  useEffect(() => {
    setOpenMenu(false);
  }, [location]);
  useEffect(() => {
    if (carts) {
      setDataOrder(carts);
    }
  }, [carts]);
  useEffect(() => {
    if (dataOrder) {
      setCountCarts(dataOrder.length);
    }
  }, [dataOrder]);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsWideScreen(screenWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    if (isWideScreen) {
      setOpenMenu(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isWideScreen]);
  return (
    <div className="headerBase">
      <div className="frame29">
        <p className="frame29-title1">
          Miễn phí vận chuyển<span> khi mua $20</span>
        </p>
        <p className="frame29-title2">Chi tiết</p>
      </div>
      <div className="frame32">
        {user ? (
          <>
            <p className="frame32-title">Giúp đỡ</p>
            <p className="frame32-title">Theo dõi đơn hàng</p>
            <p className="frame32-title">Về chúng tôi</p>
            <p className="frame32-title">Bản tin</p>
            <p className="frame32-title">
              Xin chào: <span className="hello_login">{user.name}</span>{" "}
            </p>
          </>
        ) : (
          <>
            <p className="frame32-title">Giúp đỡ</p>
            <p className="frame32-title">Theo dõi đơn hàng</p>
            <p className="frame32-title">Về chúng tôi</p>
            <p className="frame32-title">Bản tin</p>
            <p className="frame32-title">
              <Link to="/signin" className="help">
                Đăng nhập
              </Link>
            </p>
          </>
        )}
      </div>
      <div className="nav">
        <div className="menu" onClick={() => setOpenMenu(!openMenu)}>
          <MenuIcon />
        </div>
        <Link className="logo" to="">
          <img className="logo-image" src={logo} alt="Logo" />
        </Link>
        <form className="frame31">
          <SearchIcon />
          <input
            className="frame33"
            type="text"
            placeholder="Chúng tôi có thể giúp gì cho bạn tìm thấy?"
          />
          <button className="Rectangle29">TÌM KIẾM</button>
        </form>
        <form className="frame31-1">
          <input
            className="frame33"
            type="text"
            placeholder="Chúng tôi có thể giúp gì cho bạn tìm thấy?"
          />
          <button className="Rectangle29">
            <SearchIcon />
          </button>
        </form>
        <form className="frame31-2">
          <input className="frame33" type="text" placeholder="Tìm kiếm" />
          <button className="Rectangle29">
            <SearchIcon />
          </button>
        </form>
        <div className="frame51">
          <Dropdown
            overlay={<ModalUser />}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <div>
              {user?.img ? (
                <img
                  src={user?.img}
                  width="25px"
                  height="25px"
                  style={{ borderRadius: "50%", marginLeft: "18px" }}
                  alt="avatar"
                />
              ) : (
                <img
                  src={User}
                  width="25px"
                  height="25px"
                  style={{ borderRadius: "50%", marginLeft: "18px" }}
                  alt="user"
                />
              )}
            </div>
          </Dropdown>
          <div className="frame5" onClick={() => navigate("shoppingCart")}>
            <ShoppingCartIcon />
            <div className="group13">{countCarts}</div>
          </div>
          <div className="frame5" onClick={() => navigate("cart")}>
            <CalendarIcon />
            <div className="group13">0</div>
          </div>
        </div>
      </div>
      <div className="frame52">
        <ul className="menu">
          <li className="menu-title">
            <button
              className="title-button"
              onClick={() =>
                navigate("/appointment", {
                  state: {
                    appointmentData: {
                      pets: [],
                      services: [],
                      type: 1,
                    },
                  },
                })
              }
            >
              <div>ĐẶT LỊCH CHĂM SÓC</div>
            </button>
          </li>
          <li className="menu-title">
            <Link className="title1" to={"/product"}>
              SẢN PHẨM CHO THÚ CƯNG
            </Link>
          </li>
          <li className="menu-title">
            <Link className="title1" to={"/services"}>
              LOẠI DỊCH VỤ
            </Link>
          </li>
          <li className="menu-title">
            <Link className="title1" to={""}>
              NHÀ CHO MÈO
            </Link>
          </li>
          <li className="menu-title">
            <Link className="title1" to={""}>
              MÁY ĂN CHO MÈO
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="menu-2"
        style={{ marginLeft: openMenu ? "0px" : "-300px" }}
      >
        <div className="box">
          <div className="menu" onClick={() => setOpenMenu(!openMenu)}>
            <MenuIcon />
          </div>
          <Link className="logo" to={""}>
            <img className="logo-image" src={logo} alt="Logo" />
          </Link>
        </div>
        <ul className="menu">
          <li className="menu-title">
            <button
              className="title-button"
              onClick={() =>
                navigate("/appointment", {
                  state: {
                    appointmentData: {
                      pets: [],
                      services: [],
                      type: 1,
                    },
                  },
                })
              }
            >
              <div>ĐẶT LỊCH CHĂM SÓC</div>
            </button>
            <RightIcon />
          </li>
          <li className="menu-title">
            <Link className="title1" to={"/product"}>
              SẢN PHẨM CHO THÚ CƯNG
            </Link>
            <RightIcon />
          </li>
          <li className="menu-title">
            <Link className="title1" to={"/services"}>
              LOẠI DỊCH VỤ
            </Link>
            <RightIcon />
          </li>
          <li className="menu-title">
            <Link className="title1" to={""}>
              NHÀ CHO MÈO
            </Link>
            <RightIcon />
          </li>
          <li className="menu-title">
            <Link className="title1" to={""}>
              MÁY ĂN CHO MÈO
            </Link>
            <RightIcon />
          </li>
        </ul>
      </div>
      {openMenu && (
        <div
          onClick={() => {
            setOpenMenu(false);
          }}
          className="background"
        />
      )}
    </div>
  );
};
export default HeaderBase;
