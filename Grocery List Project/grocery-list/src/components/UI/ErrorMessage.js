import classes from "./ErrorMessage.module.css";
import { FaExclamationTriangle } from "react-icons/fa";
const ErrorMessage = (props) => {
  return (
    <div className={classes.errorContainer}>
      <FaExclamationTriangle className={classes.errorImg} />
      <p className={classes.error}>{props.message}</p>
    </div>
  );
};

export default ErrorMessage;
