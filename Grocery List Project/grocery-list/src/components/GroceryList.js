import GroceryItems from "./GroceryItems";

const GroceryList = (props) => {
  return (
    <div>
      {props.items.map((item) => {
        const { name, itemList } = item.store[0];
        return (
          <div>
            <h1>{name}</h1>
            {itemList.map((item) => (
              <GroceryItems
                name={item.name}
                quantity={item.quantity}
                unit={item.unit}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default GroceryList;
