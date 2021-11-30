const GroceryItems = (props) => {
  return (
    <div>
      <li>
        <span>{props.name}</span>
        <span>
          {props.quantity} {props.unit}
        </span>
      </li>
    </div>
  );
};

export default GroceryItems;
