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
              <li>
                <span>{item.name}</span>
                <span>
                  {item.quantity} {item.unit}
                </span>
              </li>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default GroceryList;
