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
    console.log(item, cost, quantity, unit);
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
          {/* <label>Grocery Item:</label> */}
          <input
            onChange={addItemHandler}
            value={item}
            placeholder="Grocery Item"
          ></input>
          {/* <label>Store:</label> */}
          <input
            onChange={storeHandler}
            value={store}
            placeholder="Store"
          ></input>
          {/* <label>Estimated Cost:</label> */}
          <input
            onChange={costHandler}
            value={cost}
            placeholder="Estimated Cost"
          ></input>
          {/* <label>Quantity:</label> */}
          <input
            onChange={quantityHandler}
            value={quantity}
            placeholder="Quantity"
          ></input>
          {/* <label>Unit of Measure:</label> */}
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
