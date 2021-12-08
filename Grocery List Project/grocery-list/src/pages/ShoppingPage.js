// import GroceryList from "../components/grocery list/GroceryList";
// import ShoppingDetail from "../components/grocery detail/ShoppingDetail";
import StoreList from "../components/grocery list/StoreList";

const ShoppingPage = (props) => {
  return (
    <div>
      <StoreList list={props.list} />
      {/* <GroceryList items={props.items} /> */}
      {/* <ShoppingDetail items={props.items} /> */}
    </div>
  );
};

export default ShoppingPage;
