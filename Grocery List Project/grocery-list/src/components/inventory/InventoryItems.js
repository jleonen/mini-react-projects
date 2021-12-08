import classes from "./InventoryItems.module.css";
import { useState } from "react";
import Tabs from "../UI/Tabs";
import TransactionBtn from "../UI/TransactionBtn";
import { useContext, useEffect } from "react/cjs/react.development";
import { InventoryContext } from "../store/inventory-context";
import { ItemManagementContext } from "../store/itemManagement-context";

const InventoryItem = (props) => {
  // const [amount, setAmount] = useState("");
  // const [reverse, setReverse] = useState(false);
  // const [filteredArray, setFilteredArray] = useState([]);
  // const [action, setAction] = useState("");
  // const [active, setActive] = useState(false);
  const inventoryCtx = useContext(InventoryContext);
  const itemManagementCtx = useContext(ItemManagementContext);

  // useEffect(() => {
  //   setFilteredArray(inventoryCtx.inventory);
  // }, [inventoryCtx.inventory]);

  // const filterItemByStatus = () => {
  //   reverse ? setReverse(false) : setReverse(true);

  //   let filteredArray;
  //   const lowStockItems = inventoryCtx.inventory.filter((item) => {
  //     return item.quantity === 0;
  //   });

  //   const inStockItems = inventoryCtx.inventory.filter((item) => {
  //     return item.quantity !== 0;
  //   });

  //   if (reverse === false) {
  //     filteredArray = lowStockItems.concat(inStockItems);
  //     setFilteredArray(filteredArray);
  //   } else {
  //     filteredArray = inStockItems.concat(lowStockItems);
  //     setFilteredArray(filteredArray);
  //   }
  // };

  // const filterHelper = (updatingFunction, listData, prop) => {
  //   reverse ? setReverse(false) : setReverse(true);
  //   updatingFunction(() => {
  //     if (prop === "name") {
  //       const sortedItems = listData.sort((itemA, itemB) => {
  //         if (reverse === false) {
  //           return itemA.name > itemB.name ? 1 : -1;
  //         } else {
  //           return itemA.name < itemB.name ? 1 : -1;
  //         }
  //       });
  //       return sortedItems;
  //     } else if (prop === "quantity") {
  //       const sortedItems = listData.sort((itemA, itemB) => {
  //         if (reverse === false) {
  //           return itemA.name > itemB.name ? 1 : -1;
  //         } else {
  //           return itemA.name < itemB.name ? 1 : -1;
  //         }
  //       });
  //       return sortedItems;
  //     }
  //   });
  // };

  // const filterItemByName = () => {
  //   // reverse ? setReverse(false) : setReverse(true);
  //   // setFilteredArray(() => {
  //   //   const sortedItems = inventoryCtx.inventory.sort((itemA, itemB) => {
  //   //     if (reverse === false) {
  //   //       return itemA.name > itemB.name ? 1 : -1;
  //   //     } else {
  //   //       return itemA.name < itemB.name ? 1 : -1;
  //   //     }
  //   //   });
  //   //   return sortedItems;
  //   // });
  //   filterHelper(setFilteredArray, inventoryCtx.inventory, "name");
  // };

  // const filterItemByQuantity = () => {
  //   // reverse ? setReverse(false) : setReverse(true);
  //   // setFilteredArray(() => {
  //   //   const sortedItems = inventoryCtx.inventory.sort((itemA, itemB) => {
  //   //     if (reverse === false) {
  //   //       return itemA.quantity > itemB.quantity ? 1 : -1;
  //   //     } else {
  //   //       return itemA.quantity < itemB.quantity ? 1 : -1;
  //   //     }
  //   //   });
  //   //   return sortedItems;
  //   // });
  //   filterHelper(setFilteredArray, inventoryCtx.inventory, "quantity");
  // };

  // const actionChangeHandler = (event) => {
  //   setAction(event.target.value);
  // };
  // const amountChangeHandler = (event) => {
  //   setAmount(event.target.value);
  // };

  // const dropDownHandler = () => {
  //   setActive(true);
  // };

  // const resetValues = () => {
  //   setAction("");
  //   setAmount("");
  //   setActive(false); //reset dropdown menu to default
  // };
  // const transactionHandler = (event) => {
  //   event.preventDefault();

  //   console.log(action);
  //   console.log(event.currentTarget.value);
  //   //currentTarget REFERS TO the element that triggered event while target only RETURNS the element returning event
  //   //console.log(event.target.value);

  //   let dataList = event.currentTarget.value.split(",");
  //   let data = {
  //     id: dataList[0],
  //     store: dataList[1],
  //     item: dataList[2],
  //     quantity: dataList[3],
  //     unit: dataList[4],
  //     price: dataList[5],
  //   };

  //   if (action === "transact") {
  //     let transactionValue = amount;

  //     if (+amount > +data.quantity) {
  //       transactionValue = +data.quantity;
  //     }

  //     inventoryCtx.transaction(data, transactionValue, action);

  //     resetValues();
  //   } else if (action === "delete") {
  //     //let maxAmount = +data.quantity;
  //     inventoryCtx.transaction(data, "_", action);

  //     resetValues();
  //   } else if (action === "restock") {
  //     let { item, store, price, unit, quantity } = data;
  //     inventoryCtx.addItems(item, store, price, amount, unit);
  //     +quantity === 0 && inventoryCtx.transaction(data, "_", action);
  //     resetValues();
  //   }
  // };
  let inputs;
  if (
    itemManagementCtx.action === "transact" ||
    itemManagementCtx.action === "restock"
  ) {
    inputs = (
      <input
        type="number"
        onChange={itemManagementCtx.amountChange}
        min={0}
      ></input>
    );
  } else {
    inputs = "";
  }

  let choices;

  if (itemManagementCtx.active) {
    choices = (
      <select
        className={classes.actionSelector}
        onChange={itemManagementCtx.actionChange}
        onFocus={itemManagementCtx.dropDownHandler}
      >
        <option value="">Choose action</option>
        <option value="transact">Transact</option>
        <option value="delete">Delete</option>
        <option value="restock">Restock</option>
      </select>
    );
  } else {
    choices = (
      <select
        onChange={itemManagementCtx.actionChange}
        onFocus={itemManagementCtx.dropDownHandler}
      >
        <option value="">Choose action</option>
      </select>
    );
  }

  return (
    <div>
      <Tabs className={classes.tabsContainer}>
        <span onClick={itemManagementCtx.filterItemByName}>Name</span>
        {itemManagementCtx.action === "restock" ? (
          <span>Price per unit</span>
        ) : (
          <span onClick={itemManagementCtx.filterItemByQuantity}>Quantity</span>
        )}
        <span onClick={itemManagementCtx.filterItemByStatus}> Status </span>
        <span>Vendor </span>
        <div>
          <span>Actions</span>
          {choices}
        </div>
      </Tabs>
      <ul>
        {itemManagementCtx.filteredArray.map((item) => (
          <div className={classes.inventoryItem} key={item.id}>
            <span className={classes.itemName}>{item.name}</span>
            {itemManagementCtx.action === "restock" ? (
              <span>${item.price}</span>
            ) : (
              <span>
                {item.quantity}
                {item.unit}
              </span>
            )}
            {item.quantity === 0 ? (
              <span className={classes.outOfStock}>Out of stock</span>
            ) : (
              <span className={classes.inStock}>In stock </span>
            )}
            <span>{item.store}</span>
            <form onSubmit={itemManagementCtx.transactionHandler}>
              {inputs}

              <TransactionBtn
                onClick={itemManagementCtx.transactionHandler}
                inventory={inventoryCtx.inventory}
                action={itemManagementCtx.action}
                value={[
                  item.id,
                  item.store,
                  item.name,
                  item.quantity,
                  item.unit,
                  item.price,
                ]}
              />
            </form>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default InventoryItem;
