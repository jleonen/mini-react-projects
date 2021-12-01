import classes from "./InventoryItem.module.css";
import { useRef } from "react";
import Tabs from "../UI/Tabs";
import { useState } from "react/cjs/react.development";

const InventoryItem = (props) => {
  //const amount = useRef();
  const [amount, setAmount] = useState("");
  //const action = useRef();
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
      cost: dataList[5],
    };
    //console.log(data);
    if (action === "transact") {
      let transactionValue = amount;
      // if (+amount.current.value > +amount.current.max) {
      //   amount.current.value = amount.current.max;
      // }
      if (+amount > +data.quantity) {
        transactionValue = +data.quantity;
      }

      props.onTransact(
        //event.target.value,
        data,
        //amount.current.value,
        transactionValue,
        action
      );
      // amount.current.value = "";
      setAction("");
      setAmount("");
      setActive(false);
      return;
    } else if (action === "delete") {
      let maxAmount = +data.quantity;
      props.onTransact(
        //event.target.value,
        data,
        //amount.current.value,
        maxAmount,
        action
      );
      //amount.current.value = "";
      setActive(false);
    } else if (action === "restock") {
      let { item, store, cost, quantity, unit } = data;
      let value = amount;
      //console.log(amount.target.value);
      props.onRestock(item, store, cost, (quantity = value), unit);
      setAmount("");
      setAction("");
      setActive(false);
      // props.onTransact(
      //   //event.target.value,
      //   data,
      //   amount.current.value,
      //   action
      // );
    }
  };
  let inputs;
  if (action === "transact" || action === "restock") {
    inputs = (
      <input
        type="number"
        // ref={amount}
        onChange={amountChangeHandler}
        min={0}
        //max={item.quantity}
      ></input>
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
        <span>Quantity</span>
        <span> Status </span>
        <div>
          <span>Actions</span>
          {choices}
        </div>
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
                  item.cost,
                ]}
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
