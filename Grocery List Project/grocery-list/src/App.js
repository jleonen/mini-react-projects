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
    console.log(quantity);
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
    //console.log(storeCheck);
    let { name, itemList, totalCost } = storeCheck[0].store[0];
    //UPLOAD DATA TO INVENTORY LIST
    setInventory((prevItems) => {
      const deletedItem = itemList.filter((item) => {
        return item.id === +itemId;
      });
      const { id, name, price, quantity, unit, cost } = deletedItem[0];

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

  const inventoryTransactionHandler = (data, amount, action) => {
    //console.log(id);
    // console.log(amount);
    const targetItem = inventory.filter((item) => {
      return item.id === +data.id;
    });
    console.log(targetItem);
    let { quantity } = targetItem[0];
    setInventory((prevItems) => {
      //if (quantity >= 1 && amount <= quantity) {
      if (action === "transact") {
        console.log(amount);
        targetItem[0].quantity = +quantity - +amount;
        console.log(targetItem[0].quantity);
        return [...prevItems];
        // } else if (amount > quantity || quantity <= 1) {
        //
      } else if (action === "delete") {
        const updatedInventory = inventory.filter((item) => {
          return item.id !== +data.id;
        });
        console.log(updatedInventory);
        return updatedInventory;
        // } else if (action === "restock") {
        //   let { id, item, store, cost, quantity, unit } = data;
        //   addItemsHandler(item, store, cost, (quantity = amount), unit);
        //   const updatedInventory = inventory.filter((item) => {
        //     return item.id !== +id;
        //   });
        //   console.log(updatedInventory);
        //   return [
        //     updatedInventory,
        // {
        //   id: Math.round(),
        //   name: item,
        //   store: store,
        //   cost: cost,
        //   quantity: quantity,
        //   unit: unit,
        // },
        // ];
      } else if (action === "restock") {
        return [...prevItems];
      } else {
        return [...prevItems];
      }
    });
    // if (action === "restock") {
    //   let { item, store, cost, quantity, unit } = data;
    //   addItemsHandler(item, store, cost, (quantity = amount), unit);
    //   return;
    // }
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
        onRestock={addItemsHandler}
      />
    </div>
  );
}

export default App;
