import { useState } from "react";
import ShoppingDetail from "./ShoppingDetail";
import StoreCard from "./StoreCard";
import classes from "./StoreList.module.css";
const StoreList = (props) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [details, setDetails] = useState(false);
  // const reducer = (total, current) => {
  //   return total + current;
  // };

  // if (props.list[0].store) {
  //   console.log(props.list[0].store[0]["itemList"]);
  //   console.log(props.list[0].store[0]["itemList"][0].cost);
  // }

  // const totalCost = props.list[0].store[0]["itemList"].reduce(
  //   (total, current) => {
  //     let amount = total.cost + current.cost;
  //     return amount;
  //   }
  // );

  // console.log(totalCost);
  //console.log(props.list);
  const clickHandler = (id) => {
    setDetails(true);
    setCurrentItems(() => {
      const specificStore = props.list.filter((store) => {
        return store.id === id;
      });
      console.log(specificStore);
      const itemsList = specificStore[0].store[0]["itemList"].map((item) => {
        return item.name;
      });
      console.log(itemsList);
      return specificStore;
    });
    // storeName.store[0]["name"] === store
  };
  return (
    <div className={classes.storesContainer}>
      {props.list.map((store) => (
        <div>
          <StoreCard
            id={store.id}
            name={store.store[0]["name"]}
            totalQuantity={store.store[0]["itemList"].length}
            totalCost={store.store[0]["totalCost"]}
            showStore={clickHandler}
          />
        </div>
      ))}
      {details && <ShoppingDetail store={currentItems} />}
      {/* <button onClick={clickHandler}>Click</button> */}
    </div>
  );
};

export default StoreList;
