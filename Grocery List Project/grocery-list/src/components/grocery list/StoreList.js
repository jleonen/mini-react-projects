import { useState } from "react";
import ShoppingDetail from "../grocery detail/ShoppingDetail";
import StoreCard from "./StoreCard";
import classes from "./StoreList.module.css";
import { InventoryContext } from "../store/inventory-context";
import { useContext } from "react/cjs/react.development";
const StoreList = (props) => {
  const inventoryCtx = useContext(InventoryContext);
  const [currentItems, setCurrentItems] = useState([]);
  const [details, setDetails] = useState(false);
  const deleteItemHandler = (name, id) => {
    if (currentItems[0].store[0]["itemList"].length === 1) {
      setCurrentItems([]);
      setDetails(false);
    }
    inventoryCtx.deleteItem(name, id);
  };

  const showListHandler = (id) => {
    setDetails(true);
    setCurrentItems(() => {
      const specificStore = inventoryCtx.groceryList.filter((store) => {
        return store.id === id;
      });
      return specificStore;
    });
  };

  return (
    <div className={classes.listContainer}>
      <div className={classes.storesContainer}>
        {inventoryCtx.groceryList.map((store) => {
          const { name, itemList, totalCost } = store.store[0];
          return (
            <div key={Math.random()}>
              <StoreCard
                id={store.id}
                name={name}
                totalQuantity={itemList.length}
                totalCost={totalCost}
                showStore={showListHandler}
              />
            </div>
          );
        })}
      </div>
      {details && (
        <ShoppingDetail
          store={currentItems}
          onDeleteItem={deleteItemHandler}
          id={props.id}
        />
      )}
    </div>
  );
};

export default StoreList;
