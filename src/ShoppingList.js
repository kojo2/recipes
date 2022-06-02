import React, { useState } from "react";
import useRedux from "./redux/useRedux";

const ShoppingList = () => {
  const { mplans } = useRedux();

  const weekIngredients = {};
  Object.values(mplans).forEach((value) => {
    value.ingredients.forEach((ingredient) => {
      let ing = ingredient.ingredient;
      if (weekIngredients[ing]) {
        weekIngredients[ing].push(`, ${ingredient.measure}`);
      } else {
        weekIngredients[ing] = [` ${ingredient.measure}`];
      }
    });
  });

  return (
    <div style={{ color: "white" }}>
      {mplans ? (
        <ul style={{ listStyleType: "none" }}>
          {Object.keys(weekIngredients)
            .sort((a, b) => a.localeCompare(b))
            .map((k) => (
              <li style={{ marginBottom: "5px" }} key={k}>
                {k} - {weekIngredients[k]}
              </li>
            ))}
        </ul>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default ShoppingList;
