import classes from "./InventoryItem.module.css";
const InventoryItem = (props) => {
  const transactionHandler = (event) => {
    props.onTransact(event.target.value);
  };
  return (
    <div>
      <ul>
        {props.inventory.map((item) => (
          <div className={classes.inventoryItem}>
            <span>{item.name}</span>
            <span>
              {item.quantity}
              {item.unit}
            </span>
            <button onClick={transactionHandler} value={item.id}>
              Transact
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default InventoryItem;
