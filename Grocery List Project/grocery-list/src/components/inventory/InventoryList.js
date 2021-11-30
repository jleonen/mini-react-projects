const InventoryList = (props) => {
  console.log(props.inventory);
  return (
    <div>
      <ul>
        {props.inventory.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
