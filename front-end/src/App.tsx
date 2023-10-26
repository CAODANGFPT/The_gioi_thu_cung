import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutAdmin from "./layout/admin";
import LayoutBase from "./layout/base";
import Home from "./page/base/home";
import SignUp from "./page/base/signup";

import Account from "./components/account_info/account";
import Address from "./components/account_info/address";
import Follow from "./components/account_info/follow";
import History from "./components/account_info/history";
import Historyfollow from "./components/account_info/history_follow";
import Pay from "./components/account_info/pay";
import SignIn from "./page/base/SignIn";
import AccountPage from "./page/base/account/account";
import ResetPassword from "./page/base/account/reset-password";
import ListProduct from "./page/base/listProduct";
import RegisterAccount from "./page/base/registerAccount";
import StatusAdmin from "./page/admin/status/list";
import DashBoard from "./page/admin/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="product" element={<ListProduct />} />
        </Route>
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
          <Route path="status" element={<StatusAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
