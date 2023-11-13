import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Account from "./page/base/account/account/account";
import Follow from "./components/account_info/follow";
import History from "./components/account_info/history";
import Historyfollow from "./components/account_info/history_follow";
import Pay from "./components/account_info/pay";
import LayoutAdmin from "./layout/admin";
import LayoutBase from "./layout/base";

import Home from "./page/base/home";
import SignUp from "./page/base/signup";

import DashBoard from "./page/admin/dashboard";
import StatusAdmin from "./page/admin/status_appointment/list";

import SignIn from "./page/base/SignIn";
import AccountPage from "./page/base/account/account";
import ForgotPassword from "./page/base/account/forgotPassword";
import ResetPassword from "./page/base/account/resetPassword";
import Appointments from "./page/base/appointments";
import ListProduct from "./page/base/listProduct";
import RegisterAccount from "./page/base/registerAccount";

import AddAbout from "./page/admin/about/add";
import EditAbout from "./page/admin/about/edit";
import AboutAdmin from "./page/admin/about/list";
import AppointmentsAdmin from "./page/admin/appointments/list";
import AddBreed from "./page/admin/breed/add";
import EditBreed from "./page/admin/breed/edit";
import BreedAdmin from "./page/admin/breed/list";
import ContactAdmin from "./page/admin/contact/list";
import AddNews from "./page/admin/news/add";
import NewsAdmin from "./page/admin/news/list";
import AddPetHouse from "./page/admin/pethouse/add";
import EditPetHouse from "./page/admin/pethouse/edit";
import PethouseAdmin from "./page/admin/pethouse/list";
import PetsAdmin from "./page/admin/pets/list";
import ProfileAdmin from "./page/admin/profile/list";
import ReviewAdmin from "./page/admin/review/list";
import AddRoleAdmin from "./page/admin/role/add";
import EditRole from "./page/admin/role/edit";
import RoleAdmin from "./page/admin/role/list";
import AddService from "./page/admin/services/add";
import EditService from "./page/admin/services/edit";
import ServicesAdmin from "./page/admin/services/list";
import AddSetTime from "./page/admin/setTime/add";
import EditSetTime from "./page/admin/setTime/edit";
import SetTimeAdmin from "./page/admin/setTime/list";
import AddSpecies from "./page/admin/species/add";
import EditSpecies from "./page/admin/species/edit";
import SpeciesAdmin from "./page/admin/species/list";
import Add from "./page/admin/staff/add";
import EditStaff from "./page/admin/staff/edit";
import StaffAdmin from "./page/admin/staff/list";
import AddStatusAdmin from "./page/admin/status_appointment/add";
import EditStatus from "./page/admin/status_appointment/edit";
import AddStatusContactAdmin from "./page/admin/status_contact/add";
import EditStatusContact from "./page/admin/status_contact/edit";
import StatusContactAdmin from "./page/admin/status_contact/list";
import EditUser from "./page/admin/user/edit";
import UserAdmin from "./page/admin/user/list";

import EditContact from "./page/admin/contact/edit";
import EditNews from "./page/admin/news/edit";
import CartPage from "./page/base/cart";
import PageNotFound from "./page/pageNotFound";
import CategoryAdmin from "./page/admin/category/list";
import EditCategory from "./page/admin/category/edit";
import AddCategory from "./page/admin/category/add";
import ProductsAdmin from "./page/admin/products/list";
import AddProduct from "./page/admin/products/add";
import EditProduct from "./page/admin/products/edit";
import DetailProduct from "./page/base/detailProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
          <Route path="product" element={<ListProduct />} />
          <Route path="appointment" element={<Appointments />} />
          <Route path="detailproduct" element={<DetailProduct />} />
          <Route path="account" element={<AccountPage />}>
            <Route index element={<Account />} />
            <Route path="payment" element={<Pay />} />
            <Route path="history_follow" element={<Historyfollow />} />
            <Route path="history" element={<History />} />
            <Route path="follow" element={<Follow />} />
            Ro
          </Route>
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="RegisterAccount" element={<RegisterAccount />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashBoard />} />

          <Route path="status_appointment">
            <Route index element={<StatusAdmin />} />
            <Route path="add" element={<AddStatusAdmin />} />
            <Route path="edit/:id" element={<EditStatus />} />
          </Route>
          <Route path="appointment" element={<AppointmentsAdmin />} />

          <Route path="about">
            <Route index element={<AboutAdmin />} />
            <Route path="add" element={<AddAbout />} />
            <Route path="edit/:id" element={<EditAbout />} />
          </Route>

          <Route path="category">
            <Route index element={<CategoryAdmin />} />
            <Route path="add" element={<AddCategory />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>

          <Route path="products">
            <Route index element={<ProductsAdmin />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>

          <Route path="user">
            <Route index element={<UserAdmin />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>

          <Route path="services">
            <Route index element={<ServicesAdmin />} />
            <Route path="add" element={<AddService />} />
            <Route path="edit/:id" element={<EditService />} />
          </Route>

          <Route path="role">
            <Route index element={<RoleAdmin />} />
            <Route path="add" element={<AddRoleAdmin />} />
            <Route path="edit/:id" element={<EditRole />} />
          </Route>

          <Route path="settime">
            <Route index element={<SetTimeAdmin />} />
            <Route path="add" element={<AddSetTime />} />
            <Route path="edit/:id" element={<EditSetTime />} />
          </Route>
          <Route path="pethouse">
            <Route index element={<PethouseAdmin />} />
            <Route path="edit/:id" element={<EditPetHouse />} />
          </Route>

          <Route path="staff">
            <Route index element={<StaffAdmin />} />
            <Route path="add" element={<Add />} />
            <Route path="edit/:id" element={<EditStaff />} />
          </Route>

          <Route path="pethouse">
            <Route index element={<PethouseAdmin />} />
            <Route path="add" element={<AddPetHouse />} />
          </Route>

          <Route path="species">
            <Route index element={<SpeciesAdmin />} />
            <Route path="add" element={<AddSpecies />} />
            <Route path="edit/:id" element={<EditSpecies />} />
          </Route>
          <Route path="breed">
            <Route index element={<BreedAdmin />} />
            <Route path="add" element={<AddBreed />} />
            <Route path="edit/:id" element={<EditBreed />} />
          </Route>

          <Route path="contact">
            <Route index element={<ContactAdmin />} />
            <Route path="edit/:id" element={<EditContact />} />
          </Route>

          <Route path="status_contact">
            <Route index element={<StatusContactAdmin />} />
            <Route path="add" element={<AddStatusContactAdmin />} />
            <Route path="edit/:id" element={<EditStatusContact />} />
          </Route>

          <Route path="profile" element={<ProfileAdmin />} />

          <Route path="news">
            <Route index element={<NewsAdmin />} />
            <Route path="add" element={<AddNews />} />
            <Route path="edit/:id" element={<EditNews />} />
          </Route>

          <Route path="review" element={<ReviewAdmin />} />
          <Route path="pets" element={<PetsAdmin />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
