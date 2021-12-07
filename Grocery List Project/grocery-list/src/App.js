import { useState, useContext } from "react";
import GroceryForm from "./components/grocery form/GroceryForm";
import GroceryList from "./components/grocery list/GroceryList";
import InventoryList from "./components/inventory/InventoryItem";
import StoreList from "./components/grocery list/StoreList";
import ShoppingPage from "./pages/ShoppingPage";
import { useEffect } from "react/cjs/react.development";
import { InventoryContext } from "./components/store/inventory-context";

function App() {
  const inventoryCtx = useContext(InventoryContext);

  return (
    <div>
      <GroceryForm onAddItems={inventoryCtx.addItems} />
      <StoreList list={inventoryCtx.groceryList} />
      <InventoryList
        inventory={inventoryCtx.inventory}
        onTransact={inventoryCtx.transaction}
        onRestock={inventoryCtx.addItems}
      />
    </div>
  );
}

export default App;
