import classes from "./ShoppingItem.module.css";
const ShoppingItem = (props) => {
  return (
    <div className={classes.sectionContainer}>
      {props.itemList.map((item) => (
        <li className={classes.itemContainer}>
          <span>{item.name}</span>

          <div>
            <span>{item.quantity}</span>
            <span>{item.unit}</span>
          </div>
          <span>${item.cost}</span>
        </li>
      ))}
    </div>
  );
};

export default ShoppingItem;
