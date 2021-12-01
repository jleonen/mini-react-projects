import ShoppingPage from "../../pages/ShoppingPage";
import classes from "./ShoppingDetail.module.css";
import ShoppingItem from "./ShoppingItem";
import Tabs from "../UI/Tabs";

const ShoppingDetail = (props) => {
  // const specificStore = props.items.filter((store) => {
  //   return store.id === id;
  // })
  const { name, totalCost, itemList } = props.store[0].store[0];
  const deleteItemHandler = (id) => {
    props.onDeleteItem(name, id);
  };
  return (
    <div className={classes.itemsContainer}>
      <h1>{name}</h1>
      <div className={classes.groceryContainer}>
        <Tabs>
          <span>Name</span>
          <span>Quantity</span>
          <span>Cost</span>
        </Tabs>
        <ShoppingItem
          // id={item.id}
          itemList={itemList}
          onDelete={deleteItemHandler}
          // name={item.name}
          // quantity={item.quantity}
          // unit={item.unit}
          // cost={item.cost}
        />
      </div>
      <div className={classes.totalAmt}>
        <span>Total Cost:$</span>
        <span>{Number(totalCost).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ShoppingDetail;
