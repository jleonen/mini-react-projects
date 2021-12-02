import { useState } from "react";
import GroceryForm from "./components/grocery form/GroceryForm";
import GroceryList from "./components/grocery list/GroceryList";
import InventoryList from "./components/inventory/InventoryItem";
import StoreList from "./components/grocery list/StoreList";
import ShoppingPage from "./pages/ShoppingPage";
import { useEffect } from "react/cjs/react.development";

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const [inventory, setInventory] = useState([]);
  const addItemsHandler = (item, store, cost, quantity, unit) => {
    const storeCheck = groceryList.filter((storeName) => {
      return storeName.store[0]["name"] === store;
    });

    if (storeCheck.length > 0) {
      let { itemList, totalCost } = storeCheck[0].store[0];
      setGroceryList((prevItems) => {
        itemList.push({
          id: Math.random(),
          key: Math.random(),
          name: item,
          price: +cost,
          cost: +cost * +quantity,
          quantity,
          unit,
        });

        storeCheck[0].store[0]["totalCost"] = +totalCost + +cost * +quantity;
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
                    price: +cost,
                    cost: +cost * +quantity,
                    quantity,
                    unit,
                  },
                ],

                totalCost: Number(+cost * +quantity).toFixed(2),
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
    let { name, itemList, totalCost } = storeCheck[0].store[0];
    //UPLOAD DATA TO INVENTORY LIST
    setInventory((prevItems) => {
      const deletedItem = itemList.filter((item) => {
        return item.id === +itemId;
      });
      const { id, name, price, quantity, unit, cost } = deletedItem[0];

      //CHECK IF ITEM ALREADY EXISTS IN INVENTORY
      const itemCheck = inventory.filter((item) => {
        return item.name === name;
      });

      console.log(itemCheck);
      if (itemCheck.length > 0) {
        itemCheck[0]["quantity"] = +itemCheck[0]["quantity"] + +quantity;
        return [...prevItems];
      } else {
        return [
          ...prevItems,
          {
            id: id,
            store: storeCheck[0].store[0]["name"],
            name: name,
            price: +price,
            quantity: quantity,
            unit: unit,
            cost: +cost * +quantity,
          },
        ];
      }
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
        return [...prevItems];
      });
    } else if (itemList.length === 1) {
      setGroceryList((prevItems) => {
        const updatedList = groceryList.filter((storeName) => {
          return storeName.store[0]["name"] !== name;
        });
        return [...updatedList];
      });
    }
  };

  const inventoryTransactionHandler = (data, amount, action) => {
    const targetItem = inventory.filter((item) => {
      return item.id === +data.id;
    });
    let { quantity } = targetItem[0];

    setInventory((prevItems) => {
      if (action === "transact") {
        targetItem[0].quantity = +quantity - +amount;
        return [...prevItems];
      } else if (action === "delete") {
        const updatedInventory = inventory.filter((item) => {
          return item.id !== +data.id;
        });
        return updatedInventory;
      } else if (action === "restock") {
        const updatedInventory = inventory.filter((item) => {
          return item.id !== +data.id;
        });
        return updatedInventory;
      } else {
        return [...prevItems];
      }
    });
  };

  return (
    <div>
      <GroceryForm onAddItems={addItemsHandler} />
      <StoreList list={groceryList} deleteItem={deleteItemHandler} />
      <InventoryList
        inventory={inventory}
        onTransact={inventoryTransactionHandler}
        onRestock={addItemsHandler}
      />
    </div>
  );
}

export default App;
