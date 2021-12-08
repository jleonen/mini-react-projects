import React, { useState, useEffect, useContext } from "react";
import { InventoryContext } from "./inventory-context";
export const ItemManagementContext = React.createContext({
  amount: "",
  reverse: "",
  filteredArray: [],
  action: "",
  active: false,
  actionChange: "",
  amountChange: "",
  dropDownHandler: () => {},
  reset: () => {},
  transactionHandler: () => {},
  filterByStatus: () => {},
  filterByName: () => {},
  filterByQuantity: () => {},
});

export const ItemManagementContextProvider = (props) => {
  const [amount, setAmount] = useState("");
  const [reverse, setReverse] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const [action, setAction] = useState("");
  const [active, setActive] = useState(false);
  const inventoryCtx = useContext(InventoryContext);

  useEffect(() => {
    setFilteredArray(inventoryCtx.inventory);
  }, [inventoryCtx.inventory]);

  const filterItemByStatus = () => {
    reverse ? setReverse(false) : setReverse(true);

    let filteredStatusArray;
    const lowStockItems = inventoryCtx.inventory.filter((item) => {
      return item.quantity === 0;
    });

    const inStockItems = inventoryCtx.inventory.filter((item) => {
      return item.quantity !== 0;
    });

    if (reverse === false) {
      filteredStatusArray = lowStockItems.concat(inStockItems);
      setFilteredArray(filteredStatusArray);
    } else {
      filteredStatusArray = inStockItems.concat(lowStockItems);
      setFilteredArray(filteredStatusArray);
    }
  };

  const sortByName = (list) => {
    const sortedNames = list.sort((itemA, itemB) => {
      if (reverse === false) {
        return itemA.name > itemB.name ? 1 : -1;
      } else {
        return itemA.name < itemB.name ? 1 : -1;
      }
    });
    return sortedNames;
  };

  const sortByQuantity = (list) => {
    const sortedQuantities = list.sort((itemA, itemB) => {
      if (reverse === false) {
        return itemA.quantity > itemB.quantity ? 1 : -1;
      } else {
        return itemA.quantity < itemB.quantity ? 1 : -1;
      }
    });
    return sortedQuantities;
  };

  const filterHelper = (updatingFunction, listData, filterBy) => {
    reverse ? setReverse(false) : setReverse(true);
    updatingFunction(() => {
      if (filterBy === "name") {
        const sortedItems = sortByName(listData);

        return sortedItems;
      } else if (filterBy === "quantity") {
        const sortedItems = sortByQuantity(listData);
        return sortedItems;
      }
    });
  };

  const filterItemByName = () => {
    filterHelper(setFilteredArray, inventoryCtx.inventory, "name");
  };

  const filterItemByQuantity = () => {
    filterHelper(setFilteredArray, inventoryCtx.inventory, "quantity");
  };

  const actionChangeHandler = (event) => {
    setAction(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const dropDownHandler = () => {
    console.log("active");
    setActive(true);
  };

  const resetValues = () => {
    setAction("");
    setAmount("");
    setActive(false); //reset dropdown menu to default
  };
  const transactionHandler = (event) => {
    event.preventDefault();

    console.log(event.currentTarget.value);
    //currentTarget REFERS TO the element that triggered event while target only RETURNS the element returning event
    //console.log(event.target.value);

    let dataList = event.currentTarget.value.split(",");
    let data = {
      id: dataList[0],
      store: dataList[1],
      item: dataList[2],
      quantity: dataList[3],
      unit: dataList[4],
      price: dataList[5],
    };

    if (action === "transact") {
      let transactionValue = amount;

      if (+amount > +data.quantity) {
        transactionValue = +data.quantity;
      }

      inventoryCtx.transaction(data, transactionValue, action);

      resetValues();
    } else if (action === "delete") {
      inventoryCtx.transaction(data, "_", action);

      resetValues();
    } else if (action === "restock") {
      let { item, store, price, unit, quantity } = data;
      inventoryCtx.addItems(item, store, price, amount, unit);
      +quantity === 0 && inventoryCtx.transaction(data, "_", action);
      resetValues();
    }
  };
  const contextValue = {
    amount: amount,
    reverse: reverse,
    filteredArray: filteredArray,
    action: action,
    active: active,
    actionChange: actionChangeHandler,
    amountChange: amountChangeHandler,
    dropDownHandler: dropDownHandler,
    reset: resetValues,
    transactionHandler: transactionHandler,
    filterByStatus: filterItemByStatus,
    filterByName: filterItemByName,
    filterByQuantity: filterItemByQuantity,
  };

  return (
    <ItemManagementContext.Provider value={contextValue}>
      {props.children}
    </ItemManagementContext.Provider>
  );
};

export default ItemManagementContextProvider;
