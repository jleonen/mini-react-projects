import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
const Navbar = (props) => {
  return (
    <div className={classes.navBar}>
      <ul className={classes.navContainer}>
        <NavLink
          to="/"
          className={(navData) =>
            navData.isActive ? classes.selected : classes.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/groceryform"
          className={(navData) =>
            navData.isActive ? classes.selected : classes.link
          }
        >
          Grocery Item Form
        </NavLink>
        <NavLink
          to="/grocerylist"
          className={(navData) =>
            navData.isActive ? classes.selected : classes.link
          }
        >
          Grocery List
        </NavLink>
        <NavLink
          to="/inventorylist"
          className={(navData) =>
            navData.isActive ? classes.selected : classes.link
          }
        >
          Inventory List
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
