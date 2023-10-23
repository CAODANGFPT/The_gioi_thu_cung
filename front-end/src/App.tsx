import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import PetTypeAdmin from "./page/base/PetType";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="pettypeadmin" element={<PetTypeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
