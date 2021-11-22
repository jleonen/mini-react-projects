import { Routes, Route, Navigate } from "react-router-dom";
import { Fragment } from "react";
import Welcome from "./pages/Welcome";
import Intro from "./pages/Intro";
import About from "./pages/About";
import Features from "./pages/Features";
import Navbar from "./UI/Navbar";
import RenderPlayer from "./nbaAPI/RenderPlayer";
import RenderTeam from "./nbaAPI/RenderTeam";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />}>
          <Route path="intro" element={<Intro />} />
        </Route>
        <Route path="/welcome/about" element={<About />} />
        <Route path="/welcome/:page" element={<Features />} />
        <Route path="/nbaplayers" element={<RenderPlayer />} />
        <Route path="/nbateams" element={<RenderTeam />} />
      </Routes>
    </Fragment>
  );
}

export default App;
