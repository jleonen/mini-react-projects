import classes from "./InventoryItem.module.css";
import { useRef } from "react";
const InventoryItem = (props) => {
  const amount = useRef();
  const transactionHandler = (event) => {
    event.preventDefault();
    props.onTransact(event.target.value, amount.current.value);
  };
  return (
    <div>
      <ul>
        {props.inventory.map((item) => (
          <div className={classes.inventoryItem}>
            <span>{item.name}</span>
            <span>
              {item.quantity}
              {item.unit}
            </span>
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
