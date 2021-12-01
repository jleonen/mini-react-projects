import classes from "./Tabs.module.css";

const Tabs = (props) => {
  return <div className={classes.tabsContainer}>{props.children}</div>;
};

export default Tabs;
