import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h1>This is welcome page! Click below for links</h1>
      <Link to="intro">Link to intro</Link>
      <Link to="about">Link to about </Link>
      <Outlet />
    </div>
  );
};

export default Welcome;
