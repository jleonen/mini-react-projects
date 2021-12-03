import { useState } from "react";
import classes from "./GroceryForm.module.css";
import Grocery from "../../imgs/grocery-img.jpg";
import useFormControl from "../hooks/form-control";
import ErrorMessage from "../UI/ErrorMessage";
import { useEffect } from "react/cjs/react.development";

const GroceryForm = (props) => {
  // const [item, setItem] = useState("");
  // const [store, setStore] = useState("");
  // const [cost, setCost] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [unit, setUnit] = useState("");

  //ITEM
  const {
    value: item,
    contentHandler: addItemHandler,
    isValid: validItem,
    blur: itemBlurHandler,
    ///validBlur: itemCheck,
    formIsValid,
    setFormIsValid,
    reset: resetItem,
  } = useFormControl("INPUT");

  //STORE
  const {
    value: store,
    contentHandler: storeHandler,
    isValid: validStore,
    blur: storeBlurHandler,
    reset: resetStore,
  } = useFormControl("INPUT");

  //COST
  const {
    value: cost,
    contentHandler: costHandler,
    isValid: validCost,
    blur: costBlurHandler,
    reset: resetCost,
  } = useFormControl("QUANTITY");

  //QUANTITY
  const {
    value: quantity,
    contentHandler: quantityHandler,
    isValid: validQuantity,
    blur: quantityBlurHandler,
    reset: resetQuantity,
  } = useFormControl("QUANTITY");

  //UNIT
  const {
    value: unit,
    contentHandler: unitHandler,
    isValid: validUnit,
    blur: unitBlurHandler,
    reset: resetUnit,
  } = useFormControl("INPUT");

  // const addItemHandler = (event) => {
  //   setItem(event.target.value);
  // };

  // const storeHandler = (event) => {
  //   setStore(event.target.value);
  // };

  // const costHandler = (event) => {
  //   setCost(event.target.value);
  // };

  // const quantityHandler = (event) => {
  //   setQuantity(event.target.value);
  // };

  // const unitHandler = (event) => {
  //   setUnit(event.target.value);
  // };

  const resetValues = () => {
    resetItem();
    resetStore();
    resetQuantity();
    resetCost();
    resetUnit();
    setFormIsValid(null);
    // setItem("");
    // setStore("");
    // setQuantity("");
    // setCost("");
    // setUnit("");
  };

  useEffect(() => {
    console.log("active");
    if (validItem && validStore && validQuantity && validCost && validUnit) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [validItem, validStore, validQuantity, validCost, validUnit]);

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(item.length === 0);
    if (formIsValid) {
      props.onAddItems(item, store, cost, quantity, unit);
      resetValues();
    }
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
            onBlur={itemBlurHandler}
            placeholder="Grocery Item"
            required={true}
          ></input>
          {validItem === false && (
            <ErrorMessage message="Item cannot be empty" />
          )}
          <input
            onChange={storeHandler}
            value={store}
            onBlur={storeBlurHandler}
            placeholder="Store"
            required={true}
          ></input>
          {validStore == false && !formIsValid && (
            <ErrorMessage message="Store cannot be empty" />
          )}
          <input
            onChange={costHandler}
            value={cost}
            onBlur={costBlurHandler}
            placeholder="Estimated Cost per unit"
            min={0}
            type="number"
            required={true}
          ></input>
          {validCost == false && <ErrorMessage message="Enter valid cost" />}
          <input
            onChange={quantityHandler}
            value={quantity}
            onBlur={quantityBlurHandler}
            placeholder="Quantity"
            min={0}
            type="number"
            required={true}
          ></input>
          {validQuantity == false && (
            <ErrorMessage message="Enter valid quantity" />
          )}
          <input
            onChange={unitHandler}
            value={unit}
            onBlur={unitBlurHandler}
            placeholder="Unit of Measure"
            required={true}
          ></input>
          {validUnit == false && !formIsValid && (
            <ErrorMessage message="Unit cannot be empty" />
          )}
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
