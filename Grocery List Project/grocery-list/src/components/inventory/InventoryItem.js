import classes from "./InventoryItem.module.css";
import { useState } from "react";
import Tabs from "../UI/Tabs";

const InventoryItem = (props) => {
  const [amount, setAmount] = useState("");

  const [action, setAction] = useState("");
  const [active, setActive] = useState(false);
  const actionChangeHandler = (event) => {
    setAction(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const dropDownHandler = () => {
    setActive(true);
  };

  const resetValues = () => {
    setAction("");
    setAmount("");
    setActive(false);
  };
  const transactionHandler = (event) => {
    event.preventDefault();
    //console.log(action.current.value);
    console.log(action);
    console.log(event.target.value);
    //console.log(amount.current.max);
    //console.log(props.inventory);
    let dataList = event.target.value.split(",");
    let data = {
      id: dataList[0],
      store: dataList[1],
      item: dataList[2],
      quantity: dataList[3],
      unit: dataList[4],
      price: dataList[5],
    };

    if (action === "transact") {
      let transactionValue = amount;

      if (+amount > +data.quantity) {
        transactionValue = +data.quantity;
      }

      props.onTransact(
        data,

        transactionValue,
        action
      );

      resetValues();
    } else if (action === "delete") {
      let maxAmount = +data.quantity;
      props.onTransact(
        data,

        maxAmount,
        action
      );

      resetValues();
    } else if (action === "restock") {
      let { item, store, price, unit } = data;
      console.log(data);
      props.onRestock(item, store, price, amount, unit);
      resetValues();
    }
  };
  let inputs;
  if (action === "transact" || action === "restock") {
    inputs = (
      <input type="number" onChange={amountChangeHandler} min={0}></input>
    );
  } else {
    inputs = "";
  }
  let choices;
  if (active) {
    choices = (
      <select onChange={actionChangeHandler} onFocus={dropDownHandler}>
        <option value="">Choose action</option>
        <option value="transact">Transact</option>
        <option value="delete">Delete</option>
        <option value="restock">Restock</option>
      </select>
    );
  } else {
    choices = (
      <select onChange={actionChangeHandler} onFocus={dropDownHandler}>
        <option value="">Choose action</option>
      </select>
    );
  }
  return (
    <div>
      <Tabs>
        <span>Name</span>
        {action === "restock" ? (
          <span>Price per unit</span>
        ) : (
          <span>Quantity</span>
        )}
        <span> Status </span>
        <div>
          <span>Actions</span>
          {choices}
        </div>
      </Tabs>
      <ul>
        {props.inventory.map((item) => (
          <div className={classes.inventoryItem} key={item.id}>
            <span>{item.name}</span>
            {action === "restock" ? (
              <span>${item.price}</span>
            ) : (
              <span>
                {item.quantity}
                {item.unit}
              </span>
            )}
            {item.quantity === 0 ? (
              <span className={classes.outOfStock}>Out of stock</span>
            ) : (
              <span className={classes.inStock}>In stock </span>
            )}
            <form onSubmit={transactionHandler}>
              {inputs}

              <button
                onClick={transactionHandler}
                type="submit"
                value={[
                  item.id,
                  item.store,
                  item.name,
                  item.quantity,
                  item.unit,
                  item.price,
                ]}
              >
                {action === "delete" ? "Delete Item" : "Execute"}
              </button>
            </form>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default InventoryItem;
