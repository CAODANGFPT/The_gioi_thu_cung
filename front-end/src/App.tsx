import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import SetTimeAdmin from "./page/base/setTime";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="settimeadmin" element={<SetTimeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
