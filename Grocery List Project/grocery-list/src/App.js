import { useState } from "react";
import GroceryForm from "./components/GroceryForm";
import GroceryList from "./components/GroceryList";
import StoreList from "./components/StoreList";
import ShoppingPage from "./pages/ShoppingPage";

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const addItemsHandler = (item, store, cost, quantity, unit) => {
    const storeCheck = groceryList.filter((storeName) => {
      return storeName.store[0]["name"] === store;
    });

    if (storeCheck.length > 0) {
      let { itemList, totalCost } = storeCheck[0].store[0];
      console.log(totalCost);
      setGroceryList((prevItems) => {
        itemList.push({
          id: Math.random(),
          key: Math.random(),
          name: item,
          cost: cost,
          quantity,
          unit,
        });

        storeCheck[0].store[0]["totalCost"] = +totalCost + +cost;
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
                    cost: cost,
                    quantity,
                    unit,
                  },
                ],

                totalCost: Number(cost).toFixed(2),
              },
            ],
          },
        ];
      });
    }
  };

  return (
    <div>
      <GroceryForm onAddItems={addItemsHandler} />
      {/* <StoreList list={groceryList} />
      <GroceryList items={groceryList} /> */}
      <ShoppingPage list={groceryList} items={groceryList} />
    </div>
  );
}

export default App;
