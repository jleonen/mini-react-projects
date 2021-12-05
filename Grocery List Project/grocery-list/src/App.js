import { useState } from "react";
import GroceryForm from "./components/grocery form/GroceryForm";
import GroceryList from "./components/grocery list/GroceryList";
import InventoryList from "./components/inventory/InventoryItem";
import StoreList from "./components/grocery list/StoreList";
import ShoppingPage from "./pages/ShoppingPage";
import { useEffect } from "react/cjs/react.development";

let match;
const filterById = (list, targetId, match) => {
  const target = list.filter((item) => {
    if (match) {
      return item.id === targetId;
    } else {
      return item.id !== targetId;
    }
  });
  return target;
};

const filterByItemName = (list, targetItem, match) => {
  const target = list.filter((item) => {
    if (match) {
      return item.name === targetItem;
    } else {
      return item.name !== targetItem;
    }
  });
  return target;
};

const filterByStoreName = (list, targetStore, match) => {
  const target = list.filter((storeName) => {
    if (match) {
      return storeName.store[0]["name"] === targetStore;
    } else {
      return storeName.store[0]["name"] !== targetStore;
    }
  });
  return target;
};

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const [inventory, setInventory] = useState([]);

  const addItemsHandler = (item, store, cost, quantity, unit) => {
    const storeCheck = filterByStoreName(groceryList, store, (match = true));

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
    // const storeCheck = groceryList.filter((storeName) => {
    //   return storeName.store[0]["name"] === store;
    // });
    const storeCheck = filterByStoreName(groceryList, store, (match = true));
    let { name, itemList, totalCost } = storeCheck[0].store[0];
    //UPLOAD DATA TO INVENTORY LIST

    setInventory((prevItems) => {
      // const deletedItem = itemList.filter((item) => {
      //   return item.id === +itemId;
      // });
      const deletedItem = filterById(itemList, +itemId, (match = true));
      const { id, name, price, quantity, unit, cost } = deletedItem[0];

      console.log(deletedItem);
      //CHECK IF ITEM ALREADY EXISTS IN INVENTORY
      let itemCheck = inventory.filter((item) => {
        return item.name === name && item.store === store;
      });

      console.log(store);

      // const duplicateStore = inventory.filter((item) => {
      //   return item.store === store;
      // });
      // console.log(itemCheck);
      // console.log(duplicateStore);

      //const itemCheck = filterByItemName(inventory, name, (match = true));

      if (itemCheck.length > 0) {
        const targetIndex = inventory.findIndex((item) => item.id === id);
        const { quantity: existingQuantity } = itemCheck[0];
        const updatedItem = {
          ...itemCheck[0],
          store: store,
          quantity: +existingQuantity + Number(quantity),
        };

        let updatedArray = [...prevItems];
        updatedArray.splice(targetIndex, 1, updatedItem);

        //itemCheck[0].quantity=+itemCheck[0]["quantity"] + Number(quantity);

        return [...updatedArray];
      } else {
        const updatedItem = [
          {
            ...deletedItem[0],
            store: store,
          },
        ];

        const updatedArray = prevItems.concat(updatedItem);
        return [...updatedArray];
        // return [
        //   ...prevItems,
        //   {
        //     id: id,
        //     store: storeCheck[0].store[0]["name"],
        //     name: name,
        //     price: +price,
        //     quantity: +quantity,
        //     unit: unit,
        //     cost: +cost * +quantity,
        //   },
        // ];
      }
    });
    //DELETE ITEM AND UPDATE LIST
    if (itemList.length > 1) {
      setGroceryList((prevItems) => {
        // const updatedItemList = itemList.filter((item) => {
        //   return item.id !== +itemId;
        // });

        const updatedItemList = filterById(itemList, +itemId, (match = false));
        // const deletedItem = itemList.filter((item) => {
        //   return item.id === +itemId;
        // });
        const deletedItem = filterById(itemList, +itemId, (match = true));
        console.log(deletedItem);

        storeCheck[0].store[0]["totalCost"] =
          +totalCost - +deletedItem[0]["cost"];
        storeCheck[0].store[0]["itemList"] = [...updatedItemList];
        return [...prevItems];
      });
    } else if (itemList.length === 1) {
      setGroceryList((prevItems) => {
        // const updatedList = groceryList.filter((storeName) => {
        //   return storeName.store[0]["name"] !== name;
        // });
        const updatedList = filterByStoreName(
          groceryList,
          name,
          (match = false)
        );

        return [...updatedList];
      });
    }
  };

  const inventoryTransactionHandler = (data, amount, action) => {
    // const targetItem = inventory.filter((item) => {
    //   return item.id === +data.id;
    // });
    const targetItem = filterById(inventory, +data.id, (match = true));
    let { quantity } = targetItem[0];

    setInventory((prevItems) => {
      if (action === "transact") {
        targetItem[0].quantity = +quantity - +amount;
        return [...prevItems];
      } else if (action === "delete" || action === "restock") {
        // const updatedInventory = inventory.filter((item) => {
        //   return item.id !== +data.id;
        // });
        const updatedInventory = filterById(
          inventory,
          +data.id,
          (match = false)
        );
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
