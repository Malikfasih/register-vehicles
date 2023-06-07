import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";

const user = JSON.parse(localStorage.getItem("user"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/auth"
          exact
          // element={!user?.result ? <Auth /> : <Home />}
          element={<Auth />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
