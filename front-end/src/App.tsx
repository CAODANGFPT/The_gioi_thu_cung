import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import RoleAdmin from "./page/base/roleAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="roleadmin" element={<RoleAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
