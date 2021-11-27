import { useState } from "react";

const GroceryForm = (props) => {
  const [item, setItem] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const addItemHandler = (event) => {
    setItem(event.target.value);
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
    setQuantity("");
    setCost("");
    setUnit("");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(item, cost, quantity, unit);
    resetValues();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Grocery Item:</label>
        <input onChange={addItemHandler} value={item}></input>
        <label>Estimated Cost:</label>
        <input onChange={costHandler} value={cost}></input>
        <label>Quantity:</label>
        <input onChange={quantityHandler} value={quantity}></input>
        <label>Unit of Measure:</label>
        <input onChange={unitHandler} value={unit}></input>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default GroceryForm;
