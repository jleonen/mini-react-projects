import classes from "./ErrorMessage.module.css";
const ErrorMessage = (props) => {
  return (
    <div>
      <p className={classes.error}>{props.message}</p>
    </div>
  );
};

export default ErrorMessage;
