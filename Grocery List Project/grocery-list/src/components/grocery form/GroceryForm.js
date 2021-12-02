import { useState } from "react";
import classes from "./GroceryForm.module.css";
import Grocery from "../../imgs/grocery-img.jpg";

const GroceryForm = (props) => {
  const [item, setItem] = useState("");
  const [store, setStore] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const addItemHandler = (event) => {
    setItem(event.target.value);
  };

  const storeHandler = (event) => {
    setStore(event.target.value);
  };

  const costHandler = (event) => {
    setCost(event.target.value);
  };

  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const unitHandler = (event) => {
    setUnit(event.target.value);
  };

  const resetValues = () => {
    setItem("");
    setStore("");
    setQuantity("");
    setCost("");
    setUnit("");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddItems(item, store, cost, quantity, unit);
    resetValues();
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.imgContainer}>
        <img src={Grocery} alt="Grocery Item" />
      </div>
      <div className={classes.inputContainer}>
        <h1>Enter grocery info here </h1>
        <form onSubmit={submitHandler}>
          <input
            onChange={addItemHandler}
            value={item}
            placeholder="Grocery Item"
          ></input>
          <input
            onChange={storeHandler}
            value={store}
            placeholder="Store"
          ></input>
          <input
            onChange={costHandler}
            value={cost}
            placeholder="Estimated Cost per unit"
            min={0}
          ></input>
          <input
            onChange={quantityHandler}
            value={quantity}
            placeholder="Quantity"
            min={0}
          ></input>
          <input
            onChange={unitHandler}
            value={unit}
            placeholder="Unit of Measure"
          ></input>

          <div>
            <button type="submit" className={classes.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroceryForm;
