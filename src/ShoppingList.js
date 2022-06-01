import React from "react";
import { useNavigate } from "react-router";
import useRedux from "./redux/useRedux";

const ShoppingList = () => {
  const { mplans } = useRedux();
  const navigate = useNavigate();

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
      <div style={{ padding: "0px 20px" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => {
              navigate("/f");
            }}
          >
            Planner
          </button>
        </div>
        {mplans ? (
          <ul>
            {Object.keys(weekIngredients).map((key) => (
              <li>
                {key}: {weekIngredients[key]}
              </li>
            ))}
            {/* <pre>{JSON.stringify(weekIngredients, null, 2)}</pre> */}
          </ul>
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
