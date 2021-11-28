import GroceryItems from "./GroceryItems";

const GroceryList = (props) => {
  return (
    <div>
      {props.items.map((item) => (
        <div>
          <h1>{item.store[0]["name"]}</h1>
          {item.store[0]["itemList"].map((item) => (
            <li>
              <span>{item.name}</span>
              <span>
                {item.quantity} {item.unit}
              </span>
            </li>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GroceryList;
