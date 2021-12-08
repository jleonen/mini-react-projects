import classes from "./InventoryItems.module.css";
import { useState } from "react";
import Tabs from "../UI/Tabs";
import TransactionBtn from "../UI/TransactionBtn";
import { useContext, useEffect } from "react/cjs/react.development";
import { InventoryContext } from "../store/inventory-context";
import { ItemManagementContext } from "../store/itemManagement-context";

const InventoryItem = (props) => {
  const inventoryCtx = useContext(InventoryContext);
  const itemManagementCtx = useContext(ItemManagementContext);

  let inputs;
  if (
    itemManagementCtx.action === "transact" ||
    itemManagementCtx.action === "restock"
  ) {
    inputs = (
      <input
        type="number"
        onChange={itemManagementCtx.amountChange}
        min={0}
      ></input>
    );
  } else {
    inputs = "";
  }

  let choices;

  if (itemManagementCtx.active) {
    choices = (
      <select
        className={classes.actionSelector}
        onChange={itemManagementCtx.actionChange}
        onFocus={itemManagementCtx.dropDownHandler}
      >
        <option value="">Choose action</option>
        <option value="transact">Transact</option>
        <option value="delete">Delete</option>
        <option value="restock">Restock</option>
      </select>
    );
  } else {
    choices = (
      <select
        onChange={itemManagementCtx.actionChange}
        onFocus={itemManagementCtx.dropDownHandler}
      >
        <option value="">Choose action</option>
      </select>
    );
  }

  return (
    <div>
      <Tabs className={classes.tabsContainer}>
        <span onClick={itemManagementCtx.filterItemByName}>Name</span>
        {itemManagementCtx.action === "restock" ? (
          <span>Price per unit</span>
        ) : (
          <span onClick={itemManagementCtx.filterItemByQuantity}>Quantity</span>
        )}
        <span onClick={itemManagementCtx.filterItemByStatus}> Status </span>
        <span>Vendor </span>
        <div>
          <span>Actions</span>
          {choices}
        </div>
      </Tabs>
      <ul>
        {itemManagementCtx.filteredArray.map((item) => (
          <div className={classes.inventoryItem} key={item.id}>
            <span className={classes.itemName}>{item.name}</span>
            {itemManagementCtx.action === "restock" ? (
              <span>${item.price}</span>
            ) : (
              <span>
                {item.quantity}
                {item.unit}
              </span>
            )}
            {item.quantity === 0 ? (
              <span className={classes.outOfStock}>Out of stock</span>
            ) : (
              <span className={classes.inStock}>In stock </span>
            )}
            <span>{item.store}</span>
            <form onSubmit={itemManagementCtx.transactionHandler}>
              {inputs}

              <TransactionBtn
                onClick={itemManagementCtx.transactionHandler}
                inventory={inventoryCtx.inventory}
                action={itemManagementCtx.action}
                value={[
                  item.id,
                  item.store,
                  item.name,
                  item.quantity,
                  item.unit,
                  item.price,
                ]}
              />
            </form>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default InventoryItem;
