import { useState, useContext } from "react";
import GroceryForm from "./components/grocery form/GroceryForm";
import GroceryList from "./components/grocery list/GroceryList";
import InventoryList from "./components/inventory/InventoryItems";
import StoreList from "./components/grocery list/StoreList";
import ShoppingPage from "./pages/ShoppingPage";
import { useEffect } from "react/cjs/react.development";
import InventoryContextProvider from "./components/store/inventory-context";

function App() {
  return (
    <div>
      <InventoryContextProvider>
        <GroceryForm />
        <StoreList />
        <InventoryList />
      </InventoryContextProvider>
    </div>
  );
}

export default App;
