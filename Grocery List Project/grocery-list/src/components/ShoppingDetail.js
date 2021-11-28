import ShoppingPage from "../pages/ShoppingPage";
import classes from "./ShoppingDetail.module.css";

const ShoppingDetail = (props) => {
  // const specificStore = props.items.filter((store) => {
  //   return store.id === id;
  // })
  const { name, totalCost, itemList } = props.store[0].store[0];
  return (
    <div className={classes.itemsContainer}>
      <h1>{name}</h1>
      <div className={classes.groceryContainer}>
        {itemList.map((item) => (
          <li className={classes.groceryItem}>
            <span>{item.name}</span>
            <div>
              <span>{item.quantity}</span>
              <span>{item.unit}</span>
            </div>
          </li>
        ))}
      </div>
      <div>
        <span>Total Cost:$</span>
        <span>{totalCost}</span>
      </div>
    </div>
  );
};

export default ShoppingDetail;
