import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import SignIn from "./page/base/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="SignIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
