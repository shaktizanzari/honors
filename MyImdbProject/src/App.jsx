import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Homepages from "./pages/Homepages";
import Homeindipage from "./pages/Homeindipage";
import Aboutpage from "./pages/Aboutpage";
import Loginpage from "./pages/Loginpage";

function App(){
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepages />}></Route>
          <Route exact path="/movie" element={<Homeindipage />}></Route>
          <Route exact path="/about" element={<Aboutpage />}></Route>
          <Route exact path="/login" element={<Loginpage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App