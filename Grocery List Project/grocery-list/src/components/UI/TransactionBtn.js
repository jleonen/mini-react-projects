import classes from "./TransactionBtn.module.css";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
const TransactionBtn = (props) => {
  // const values = props.inventory.map((item) => {
  //   return [
  //     item.id,
  //     item.store,
  //     item.name,
  //     item.quantity,
  //     item.unit,
  //     item.price,
  //   ];
  // });
  let buttonContent;

  if (props.action === "transact") {
    buttonContent = <AiOutlineMinusSquare />;
  } else if (props.action === "delete") {
    buttonContent = <FaRegTrashAlt />;
  } else {
    buttonContent = <BsFillCartPlusFill />;
  }
  return (
    <button
      type="submit"
      value={props.value}
      onClick={props.onClick}
      className={classes.transactionBtn}
    >
      {buttonContent}
    </button>
  );
};

export default TransactionBtn;
