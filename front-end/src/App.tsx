import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import AccountPage from "./page/base/account/account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="account" element={<AccountPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
