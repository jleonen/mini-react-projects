import classes from "./InventoryItem.module.css";
import { useState } from "react";
import Tabs from "../UI/Tabs";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";

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

    console.log(action);
    console.log(event.target.value);

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
      //let maxAmount = +data.quantity;
      props.onTransact(data, "_", action);

      resetValues();
    } else if (action === "restock") {
      let { item, store, price, unit, quantity } = data;
      console.log(data);
      props.onRestock(item, store, price, amount, unit);
      +quantity === 0 && props.onTransact(data, "_", action);
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
      <select
        className={classes.actionSelector}
        onChange={actionChangeHandler}
        onFocus={dropDownHandler}
      >
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

  let button;

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
        {props.inventory.map((item) => {
          const values = [
            item.id,
            item.store,
            item.name,
            item.quantity,
            item.unit,
            item.price,
          ];
          if (action === "transact") {
            button = <AiOutlineMinusSquare onClick={transactionHandler} />;
          } else if (action === "delete") {
            button = <FaRegTrashAlt onClick={transactionHandler} />;
          } else {
            button = <BsFillCartPlusFill onClick={transactionHandler} />;
          }
          return (
            <div className={classes.inventoryItem} key={item.id}>
              <span className={classes.itemName}>{item.name}</span>
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
                  className={classes.transactionBtn}
                  type="submit"
                  value={values}
                >
                  {button}
                </button>
              </form>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default InventoryItem;
