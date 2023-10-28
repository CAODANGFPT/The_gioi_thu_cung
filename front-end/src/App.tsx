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
import SignUp from "./page/base/signup";

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
import Add from "./page/admin/staff/add";

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
          </Route>

          <Route path="services" element={<ServicesAdmin />} />
          <Route path="user" element={<UserAdmin />} />
          <Route path="role" element={<RoleAdmin />} />
          <Route path="settime" element={<SetTimeAdmin />} />

          <Route path="staff">
            <Route index element={<StaffAdmin />} />
            <Route path="add" element={<Add />} />
          </Route>

          <Route path="pethouse" element={<PethouseAdmin />} />
          <Route path="species" element={<SpeciesAdmin />} />
          <Route path="breed" element={<BreedAdmin />} />
          <Route path="contact" element={<ContactAdmin />} />
          <Route path="profile" element={<ProfileAdmin />} />
          <Route path="news" element={<NewsAdmin />} />
          <Route path="review" element={<ReviewAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
