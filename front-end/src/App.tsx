import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import Appointments from "./page/base/appointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="appointment" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
