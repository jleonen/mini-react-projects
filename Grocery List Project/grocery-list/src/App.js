import { useState } from "react";
import GroceryForm from "./components/GroceryForm";
import GroceryList from "./components/GroceryList";
import InventoryList from "./components/inventory/InventoryList";
import StoreList from "./components/StoreList";
import ShoppingPage from "./pages/ShoppingPage";

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const [inventory, setInventory] = useState([]);
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

  const deleteItemHandler = (store, id) => {
    const storeCheck = groceryList.filter((storeName) => {
      return storeName.store[0]["name"] === store;
    });
    //console.log(storeCheck);
    let { name, itemList, totalCost } = storeCheck[0].store[0];
    setInventory((prevItems) => {
      const deletedItem = itemList.filter((item) => {
        return item.id === +id;
      });
      const { name } = deletedItem[0];

      return [...prevItems, { name: name }];
    });
    if (itemList.length > 1) {
      setGroceryList((prevItems) => {
        const updatedItemList = itemList.filter((item) => {
          return item.id !== +id;
        });
        const deletedItem = itemList.filter((item) => {
          return item.id === +id;
        });

        storeCheck[0].store[0]["totalCost"] =
          +totalCost - +deletedItem[0]["cost"];
        storeCheck[0].store[0]["itemList"] = [...updatedItemList];
        console.log(storeCheck);

        return [...prevItems];
      });
    } else if (itemList.length === 1) {
      setGroceryList((prevItems) => {
        const updatedList = groceryList.filter((storeName) => {
          return storeName.store[0]["name"] !== name;
        });
        console.log(updatedList);
        return [...updatedList];
      });
    }
  };

  return (
    <div>
      <GroceryForm onAddItems={addItemsHandler} />
      {/* <StoreList list={groceryList} />
      <GroceryList items={groceryList} /> */}
      {/* <ShoppingPage list={groceryList} items={groceryList} /> */}
      <StoreList list={groceryList} deleteItem={deleteItemHandler} />
      <InventoryList inventory={inventory} />
    </div>
  );
}

export default App;
