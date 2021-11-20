import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Welcome from "./pages/Welcome";
import Intro from "./pages/Intro";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/welcome" element={<Welcome />}>
          <Route path="intro" element={<Intro />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
