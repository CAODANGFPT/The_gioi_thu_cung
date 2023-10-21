import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import AccountPage from "./page/base/account/account/index";
import Account from "./components/account_info/account";
import Address from "./components/account_info/address";
import Pay from "./components/account_info/pay";
import Historyfollow from "./components/account_info/history_follow";
import History from "./components/account_info/history";
import Follow from "./components/account_info/follow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/account" element={<AccountPage/>}>
          <Route index element={< Account/>} />
          <Route path="address" element={< Address/>} />
          <Route path="payment" element={< Pay/>} />
          <Route path="his_follow" element={< Historyfollow/>} />
          <Route path="history" element={< History/>} />
          <Route path="follow" element={< Follow/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
