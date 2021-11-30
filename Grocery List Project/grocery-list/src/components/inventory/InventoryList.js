import InventoryItem from "./InventoryItem";

const InventoryList = (props) => {
  return (
    <div>
      <InventoryItem inventory={props.inventory} />
    </div>
  );
};

export default InventoryList;
