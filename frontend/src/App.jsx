import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./charts/ChartjsConfig";

import "./App.css";
import Dashboard from "./pages/Dashboard";

import Signin from "./pages/Signin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
