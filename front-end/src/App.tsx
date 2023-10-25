import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import AccountPage from "./page/base/account/account";
import Account from "./components/account_info/account";
import Address from "./components/account_info/address";
import Pay from "./components/account_info/pay";
import Historyfollow from "./components/account_info/history_follow";
import History from "./components/account_info/history";
import Follow from "./components/account_info/follow";
import ResetPassword from "./page/base/account/reset-password";
import SignIn from "./page/base/SignIn";
import LayoutBase from "./layout/base";
import RegisterAccount from "./page/base/registerAccount";
import SignUp from "./page/base/signUp";
import ListProduct from "./page/base/listProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="listproduct" element={<ListProduct />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
