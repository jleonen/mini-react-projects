import ShoppingPage from "../pages/ShoppingPage";

const ShoppingDetail = (props) => {
  // const specificStore = props.items.filter((store) => {
  //   return store.id === id;
  // })
  return (
    <div>
      {props.store[0].store[0]["itemList"].map((item) => (
        <li>{item.name}</li>
      ))}
    </div>
  );
};

export default ShoppingDetail;
