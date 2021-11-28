const GroceryItems = (props) => {
  return (
    <div>
      <ul>{props.children}</ul>
    </div>
  );
};

export default GroceryItems;
