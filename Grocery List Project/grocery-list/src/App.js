import { useState } from "react";
import GroceryForm from "./components/grocery form/GroceryForm";
import GroceryList from "./components/grocery list/GroceryList";
import InventoryList from "./components/inventory/InventoryItem";
import StoreList from "./components/grocery list/StoreList";
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

  const deleteItemHandler = (store, itemId) => {
    const storeCheck = groceryList.filter((storeName) => {
      return storeName.store[0]["name"] === store;
    });
    //console.log(storeCheck);
    let { name, itemList, totalCost } = storeCheck[0].store[0];
    //UPLOAD DATA TO INVENTORY LIST
    setInventory((prevItems) => {
      const deletedItem = itemList.filter((item) => {
        return item.id === +itemId;
      });
      const { id, name, quantity, unit } = deletedItem[0];

      return [
        ...prevItems,
        {
          id: id,
          name: name,
          quantity: quantity,
          unit: unit,
        },
      ];
    });
    //DELETE ITEM AND UPDATE LIST
    if (itemList.length > 1) {
      setGroceryList((prevItems) => {
        const updatedItemList = itemList.filter((item) => {
          return item.id !== +itemId;
        });
        const deletedItem = itemList.filter((item) => {
          return item.id === +itemId;
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

  const inventoryTransactionHandler = (id) => {
    console.log(id);
    const targetItem = inventory.filter((item) => {
      return item.id === +id;
    });
    console.log(targetItem);
  };

  return (
    <div>
      <GroceryForm onAddItems={addItemsHandler} />
      {/* <StoreList list={groceryList} />
      <GroceryList items={groceryList} /> */}
      {/* <ShoppingPage list={groceryList} items={groceryList} /> */}
      <StoreList list={groceryList} deleteItem={deleteItemHandler} />
      <InventoryList
        inventory={inventory}
        onTransact={inventoryTransactionHandler}
      />
    </div>
  );
}

export default App;
