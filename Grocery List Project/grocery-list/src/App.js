import { useState } from "react";
import GroceryForm from "./components/GroceryForm";
import StoreList from "./components/StoreList";

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const addItemsHandler = (item, store, cost, quantity, unit) => {
    setGroceryList((prevItems) => {
      return [
        ...prevItems,
        {
          id: Math.random(),
          key: Math.random(),
          store: [
            {
              name: store,
              itemList: [
                {
                  name: item,
                  cost: parseInt(cost),
                  quantity,
                  unit,
                },
              ],

              totalCost: cost,
            },
          ],
        },
      ];
    });
    console.log(groceryList);
  };

  return (
    <div>
      <GroceryForm onAddItems={addItemsHandler} />
      <StoreList list={groceryList} />
    </div>
  );
}

export default App;
