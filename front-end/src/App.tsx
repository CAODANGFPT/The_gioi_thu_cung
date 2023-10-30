import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import LayoutAdmin from "./layout/admin";
import LayoutBase from "./layout/base";
import Account from "./components/account_info/account";
import Address from "./components/account_info/address";
import Follow from "./components/account_info/follow";
import History from "./components/account_info/history";
import Historyfollow from "./components/account_info/history_follow";
import Pay from "./components/account_info/pay";

import Home from "./page/base/home";
import SignUp from "./page/base/signUp";

import DashBoard from "./page/admin/dashboard";
import StatusAdmin from "./page/admin/status/list";

import SignIn from "./page/base/SignIn";
import AccountPage from "./page/base/account/account";
import ForgotPassword from "./page/base/account/forgotPassword";
import ListProduct from "./page/base/listProduct";
import RegisterAccount from "./page/base/registerAccount";
import Appointments from "./page/base/appointments";
import ResetPassword from "./page/base/account/resetPassword";

import ServicesAdmin from "./page/admin/services/list";
import UserAdmin from "./page/admin/user/list";
import RoleAdmin from "./page/admin/role/list";
import SetTimeAdmin from "./page/admin/setTime/list";
import StaffAdmin from "./page/admin/staff/list";
import PethouseAdmin from "./page/admin/pethouse/list";
import SpeciesAdmin from "./page/admin/species/list";
import BreedAdmin from "./page/admin/breed/list";
import ContactAdmin from "./page/admin/contact/list";
import ProfileAdmin from "./page/admin/profile/list";
import NewsAdmin from "./page/admin/news/list";
import ReviewAdmin from "./page/admin/review/list";
import EditPetHouse from "./page/admin/pethouse/edit";
import Add from "./page/admin/staff/add";
import PetsAdmin from "./page/admin/pets/list";
import EditUser from "./page/admin/user/edit";
import AddService from "./page/admin/services/add";
import AddRoleAdmin from "./page/admin/role/add";
import EditSpecies from "./page/admin/species/edit";
import AddSpecies from "./page/admin/species/add";
import EditBreed from "./page/admin/breed/edit";
import StatusContactAdmin from "./page/admin/status_contact/list";
import EditStatus from "./page/admin/status/edit";
import AddPetHouse from "./page/admin/pethouse/add";
import EditStaff from "./page/admin/staff/edit";
import AddStatusContactAdmin from "./page/admin/status_contact/add";
import EditStatusContact from "./page/admin/status_contact/edit";
import AppointmentsAdmin from "./page/admin/appointments/list";
import EditRole from "./page/admin/role/edit";
import AddSetTime from "./page/admin/setTime/add";
import EditSetTime from "./page/admin/setTime/edit";
import AddNews from "./page/admin/news/add";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
          <Route path="product" element={<ListProduct />} />
          <Route path="appointment" element={<Appointments />} />
        </Route>

        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="RegisterAccount" element={<RegisterAccount />} />

        <Route path="/account" element={<AccountPage />}>
          <Route index element={<Account />} />
          <Route path="address" element={<Address />} />
          <Route path="payment" element={<Pay />} />
          <Route path="his_follow" element={<Historyfollow />} />
          <Route path="history" element={<History />} />
          <Route path="follow" element={<Follow />} />
        </Route>

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashBoard />} />

          <Route path="status">
            <Route index element={<StatusAdmin />} />
            <Route path="add" element={<Add />} />
            <Route path="edit/:id" element={<EditStatus />} />
          </Route>
          <Route path="appointment" element={<AppointmentsAdmin />} />

          <Route path="services" element={<ServicesAdmin />} />

          <Route path="user">
            <Route index element={<UserAdmin />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>

          <Route path="services">
            <Route index element={<ServicesAdmin />} />
            <Route path="add" element={<AddService />} />
          </Route>

          <Route path="user" element={<UserAdmin />} />

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
          <Route path="staff" element={<StaffAdmin />} />
          <Route path="pethouse">
            <Route index element={<PethouseAdmin />} />
            <Route path="edit/:id" element={<EditPetHouse />} />
          </Route>
          <Route path="species" element={<SpeciesAdmin />} />

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
            <Route path="edit/:id" element={<EditBreed />} />
          </Route>
          <Route path="contact" element={<ContactAdmin />} />

          <Route path="status_contact">
            <Route index element={<StatusContactAdmin />} />
            <Route path="add" element={<AddStatusContactAdmin />} />
            <Route path="edit/:id" element={<EditStatusContact />} />
          </Route>

          <Route path="profile" element={<ProfileAdmin />} />
          <Route path="news">
            <Route index element={<NewsAdmin />} />
            <Route path="add" element={<AddNews />} />
          </Route>
          <Route path="review" element={<ReviewAdmin />} />
          <Route path="pets" element={<PetsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
