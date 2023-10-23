import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/base/home";
import BreedAdmin from "./page/base/breedAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="breedadmin" element={<BreedAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
