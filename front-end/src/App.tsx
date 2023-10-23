import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import LayoutBase from "./layout/base";
import SignUp from "./page/base/signUp";
import RegisterAccount from "./page/base/registerAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="SignUp" element={<SignUp />} />
        <Route path="RegisterAccount" element={<RegisterAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
