import classes from "./InventoryItem.module.css";
import { useRef } from "react";
import Tabs from "../UI/Tabs";

const InventoryItem = (props) => {
  const amount = useRef();
  const action = useRef();
  const transactionHandler = (event) => {
    event.preventDefault();
    console.log(action.current.value);
    console.log(event.target.value);
    //console.log(props.inventory);
    let dataList = event.target.value.split(",");
    let data = {
      id: dataList[0],
      store: dataList[1],
      item: dataList[2],
      quantity: dataList[3],
      unit: dataList[4],
      cost: dataList[5],
    };

    if (action.current.value === "transact") {
      if (+amount.current.value > +amount.current.max) {
        amount.current.value = amount.current.max;
      }

      props.onTransact(
        event.target.value,
        amount.current.value,
        action.current.value
      );
      amount.current.value = "";
    } else if (action.current.value === "delete") {
      amount.current.value = amount.current.max;
      props.onTransact(
        event.target.value,
        amount.current.value,
        action.current.value
      );
    }
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
              <select ref={action}>
                <option value="transact">Transact</option>
                <option value="delete">Delete</option>
                <option value="restock">Restock</option>
              </select>
              <button
                onClick={transactionHandler}
                type="submit"
                value={item.id}
              >
                Execute
              </button>
            </form>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default InventoryItem;
