import StoreCard from "./StoreCard";
import classes from "./StoreList.module.css";
const StoreList = (props) => {
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
  return (
    <div className={classes.storesContainer}>
      {props.list.map((store) => (
        <StoreCard
          name={store.store[0]["name"]}
          totalQuantity={store.store[0]["itemList"].length}
          totalCost={store.store[0]["totalCost"]}
        />
      ))}
    </div>
  );
};

export default StoreList;
