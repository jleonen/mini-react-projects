const StoreCard = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Total Items:{props.totalQuantity}</p>
      <p>Total Cost: {props.totalCost}</p>
    </div>
  );
};

export default StoreCard;
