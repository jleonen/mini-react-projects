import classes from "./InventoryItem.module.css";
import { useRef } from "react";
import Tabs from "../UI/Tabs";
const InventoryItem = (props) => {
  const amount = useRef();
  const transactionHandler = (event) => {
    event.preventDefault();
    let max = amount.current.max;
    let currentAmount = amount.current.value;
    if (currentAmount > max) {
      currentAmount = max;
    }
    console.log(amount.current.max);
    props.onTransact(event.target.value, currentAmount);
  };
  return (
    <div>
      <Tabs>
        <span>Name</span>
        <span>Quantity</span>
        <span> Status </span>
        <span>Actions</span>
      </Tabs>
      <ul>
        {props.inventory.map((item) => (
          <div className={classes.inventoryItem}>
            <span>{item.name}</span>
            <span>
              {item.quantity}
              {item.unit}
            </span>
            {item.quantity === 0 ? (
              <span className={classes.outOfStock}>Out of stock</span>
            ) : (
              <span className={classes.inStock}>In stock </span>
            )}
            <form onSubmit={transactionHandler}>
              <input
                type="number"
                ref={amount}
                min={0}
                max={item.quantity}
              ></input>
              <button onClick={transactionHandler} value={item.id}>
                Transact
              </button>
            </form>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default InventoryItem;
