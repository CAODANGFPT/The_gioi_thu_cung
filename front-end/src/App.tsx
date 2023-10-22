import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import SignUp from "./page/base/signup";
import LayoutBase from "./layoutBase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
