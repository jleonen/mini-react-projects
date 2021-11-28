import GroceryList from "../components/GroceryList";
import StoreList from "../components/StoreList";

const ShoppingPage = (props) => {
  return (
    <div>
      <StoreList list={props.list} />
      <GroceryList items={props.items} />
    </div>
  );
};

export default ShoppingPage;
