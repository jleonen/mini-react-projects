import { useState } from "react";
import GroceryForm from "./components/GroceryForm";
import StoreList from "./components/StoreList";

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const addItemsHandler = (item, store, cost, quantity, unit) => {
    const storeCheck = groceryList.filter((storeName) => {
      return storeName.store[0]["name"] === store;
    });

    if (storeCheck.length > 0) {
      console.log(storeCheck[0].store[0]["itemList"]);

      setGroceryList((prevItems) => {
        storeCheck[0].store[0]["itemList"].push({
          id: Math.random(),
          key: Math.random(),
          name: item,
          cost: parseInt(cost),
          quantity,
          unit,
        });

        storeCheck[0].store[0]["totalCost"] =
          +storeCheck[0].store[0]["totalCost"] + +cost;
        return [...prevItems];
      });
    } else {
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
                    id: Math.random(),
                    key: Math.random(),
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
    }

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
