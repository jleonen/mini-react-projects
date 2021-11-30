import classes from "./ShoppingItem.module.css";
const ShoppingItem = (props) => {
  const deleteItemHandler = (event) => {
    props.onDelete(event.target.value);

    console.log(event.target.value);
  };
  return (
    <div className={classes.sectionContainer}>
      {props.itemList.map((item) => (
        <li className={classes.itemContainer}>
          <span>
            <input
              type="checkbox"
              onClick={deleteItemHandler}
              value={item.id}
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

{
  /* <span>
          <input type="checkbox" onClick={deleteItemHandler} value={props.id} />
          {props.name}
        </span>

        <div>
          <span>{props.quantity}</span>
          <span>{props.unit}</span>
        </div>
        <span>${props.cost}</span> */
}
