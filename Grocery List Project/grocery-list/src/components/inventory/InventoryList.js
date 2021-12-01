import InventoryItem from "./InventoryItem";
import classes from "./InventoryList.module.css";

const InventoryList = (props) => {
  return (
    <div>
      <InventoryItem inventory={props.inventory} />
    </div>
  );
};

export default InventoryList;
