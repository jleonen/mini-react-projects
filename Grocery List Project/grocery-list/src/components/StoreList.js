import StoreCard from "./StoreCard";

const StoreList = (props) => {
  return (
    <div>
      {props.list.map((store) => (
        <StoreCard name={store.store[0]["name"]} />
      ))}
    </div>
  );
};

export default StoreList;
