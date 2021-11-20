import { Routes, Route, Navigate } from "react-router-dom";
import { Fragment } from "react";
import Welcome from "./pages/Welcome";
import Intro from "./pages/Intro";
import About from "./pages/About";
import Features from "./pages/Features";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate replace to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />}>
          <Route path="intro" element={<Intro />} />
        </Route>
        <Route path="/welcome/about" element={<About />} />
        <Route path="/welcome/:page" element={<Features />} />
      </Routes>
    </Fragment>
  );
}

export default App;
