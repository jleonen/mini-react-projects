import React, { useState } from "react";

export const InventoryContext = React.createContext({
  groceryList: [],
  inventory: [],
  addItems: () => {},
  deleteItem: () => {},
  transaction: () => {},
});

export const InventoryContextProvider = (props) => {
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

  // const filterByItemName = (list, targetItem, match) => {
  //   const target = list.filter((item) => {
  //     if (match) {
  //       return item.name === targetItem;
  //     } else {
  //       return item.name !== targetItem;
  //     }
  //   });
  //   return target;
  // };

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

  const [groceryList, setGroceryList] = useState([]);
  const [inventory, setInventory] = useState([]);

  const addItemsHandler = (item, store, cost, quantity, unit) => {
    const storeCheck = filterByStoreName(groceryList, store, (match = true));

    //IF STORE ALREADY EXISTS IN STORE LIST
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
      const { id, name, quantity } = deletedItem[0];

      console.log(deletedItem);
      //CHECK IF ITEM ALREADY EXISTS IN INVENTORY
      let itemCheck = inventory.filter((item) => {
        return item.name === name && item.store === store;
      });

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
        const { cost } = deletedItem[0];
        // const updatedItem = {
        //   ...storeCheck[0].store[0],
        //   totalCost: +totalCost - +cost,
        // };
        // console.log(updatedItem);
        // const updatedItem2 = {
        //   ...storeCheck[0],
        //   store: updatedItem,
        // };
        // console.log(updatedItem2);
        ////////////////////
        // const targetIndex = groceryList.findIndex((store) => {
        //   console.log(store.store[0].name);
        //   console.log(store);
        //   return store.store[0].name === store.store[0].name;
        // });
        /////////////
        // console.log(targetIndex);
        // console.log(targetIndex);
        // const updatedItem3 = {
        //   ...storeCheck[0],
        //   store: [
        //     {
        //       ...store[0],
        //       itemList: [...updatedItemList],
        //       totalCost: +totalCost - +cost,
        //     },
        //   ],
        // };
        // // console.log(storeCheck);
        // console.log(updatedItem3);
        // let updatedArray = groceryList.filter((store) => {
        //   console.log(store);
        //   return store.store[0].name !== store.store[0].name;
        // });

        // console.log(updatedArray);
        // updatedArray.push(updatedItem3);
        // console.log(updatedArray);
        // //let updatedArray = [...prevItems, ...updatedItem3];
        // //console.log(updatedArray);
        // return [...updatedArray];

        storeCheck[0].store[0]["totalCost"] = +totalCost - +cost;
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
    console.log(targetItem);
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

  const contextValue = {
    groceryList: groceryList,
    inventory: inventory,
    addItems: addItemsHandler,
    deleteItem: deleteItemHandler,
    transaction: inventoryTransactionHandler,
  };

  return (
    <InventoryContext.Provider value={contextValue}>
      {props.children}
    </InventoryContext.Provider>
  );
};

export default InventoryContextProvider;
