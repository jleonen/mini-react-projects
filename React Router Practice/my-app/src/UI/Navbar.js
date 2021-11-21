import { Link, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.navContainer}>
      <h1 className={classes.navHeader}> Router practice </h1>
      <ul className={classes.navList}>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/api"
          >
            API Practice
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/welcome/about"
          >
            About Me
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/welcome/features"
          >
            Features
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
