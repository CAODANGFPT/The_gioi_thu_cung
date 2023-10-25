import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import SignIn from "./page/base/SignIn";
import LayoutBase from "./layout/base";
import RegisterAccount from "./page/base/registerAccount";
import SignUp from "./page/base/signUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="RegisterAccount" element={<RegisterAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
