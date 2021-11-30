import classes from "./StoreCard.module.css";

const StoreCard = (props) => {
  const clickHandler = () => {
    props.showStore(props.id);
  };
  return (
    <div className={classes.cardContainer} onClick={clickHandler}>
      <h1>{props.name}</h1>
      <p>
        <strong>Total Items:</strong>
        {props.totalQuantity}
      </p>
      <p>
        <strong>Total Cost: </strong>${props.totalCost}
      </p>
    </div>
  );
};

export default StoreCard;
