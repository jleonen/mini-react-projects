import classes from "./ShoppingItem.module.css";
const ShoppingItem = (props) => {
  const deleteItemHandler = (event) => {
    if (event.target.checked) {
      props.onDelete(event.target.value);
    }
  };
  return (
    <div className={classes.sectionContainer}>
      {props.itemList.map((item) => (
        <li className={classes.itemContainer} key={Math.random()}>
          <span>
            <input
              type="checkbox"
              onChange={deleteItemHandler}
              checked={false}
              value={item.id}
              name="item"
            />
            {item.name}
          </span>

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
