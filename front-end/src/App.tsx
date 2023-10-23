import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import StatusAdmin from "./page/base/statusAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="statusadmin" element={<StatusAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
