import ShoppingPage from "../pages/ShoppingPage";
import classes from "./ShoppingDetail.module.css";
import ShoppingItem from "./ShoppingItem";

const ShoppingDetail = (props) => {
  // const specificStore = props.items.filter((store) => {
  //   return store.id === id;
  // })
  const { name, totalCost, itemList } = props.store[0].store[0];
  return (
    <div className={classes.itemsContainer}>
      <h1>{name}</h1>
      <div className={classes.groceryContainer}>
        <ShoppingItem itemList={itemList} />
      </div>
      <div className={classes.totalAmt}>
        <span>Total Cost:$</span>
        <span>{Number(totalCost).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ShoppingDetail;
