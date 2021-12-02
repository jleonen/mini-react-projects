import { useEffect, useState } from "react";
import ShoppingDetail from "../grocery detail/ShoppingDetail";
import StoreCard from "./StoreCard";
import classes from "./StoreList.module.css";
const StoreList = (props) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [details, setDetails] = useState(false);
  const deleteItemHandler = (name, id) => {
    if (currentItems[0].store[0]["itemList"].length === 1) {
      console.log(currentItems.length);
      setCurrentItems([]);
      setDetails(false);
    }

    props.deleteItem(name, id);
  };

  const showListHandler = (id) => {
    setDetails(true);
    setCurrentItems(() => {
      const specificStore = props.list.filter((store) => {
        return store.id === id;
      });
      // const { itemList } = specificStore[0].store[0];
      // const itemsList = itemList.map((item) => {
      //   return item.name;
      // });
      return specificStore;
    });
  };

  return (
    <div className={classes.listContainer}>
      <div className={classes.storesContainer}>
        {props.list.map((store) => {
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
