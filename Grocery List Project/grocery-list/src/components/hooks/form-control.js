import { useState, useReducer } from "react";

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 0 };
  }
  if (action.type === "QUANTITY") {
    return { value: action.value, isValid: !isNaN(action.value) };
  }
  if (action.type === "BLUR") {
    return { isValid: state.value.trim().length > 0, value: state.value };
  }
  if (action.type === "RESET") {
    return { isValid: false, value: "" };
  }
  return inputStateReducer;
};

const useFormControl = (inputType) => {
  const [formIsValid, setFormIsValid] = useState(true);

  const [inputState, dispatchInput] = useReducer(inputStateReducer, {
    value: "",
    isValid: null,
  });

  // const [quantityState,dispatchQuantity] = useReducer(quantityStateReducer, {
  //     value:"",
  //     isValid: null,
  // })

  const contentHandler = (event) => {
    dispatchInput({ type: inputType, value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatchInput({ type: "BLUR" });
  };

  const reset = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: inputState.isValid,
    blur: inputBlurHandler,
    formIsValid,
    setFormIsValid,
    contentHandler,
    reset,
  };
};

export default useFormControl;
