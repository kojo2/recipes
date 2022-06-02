import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { saveToLocal } from "./localStorageLayer";
import { updateRecipes } from "./redux/mainActions";
import useRedux from "./redux/useRedux";

const MealPlan = ({ data, k }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mplans } = useRedux();

  return (
    <div
      style={{
        opacity: data?.visible === false ? "0.2" : "1.0",
        cursor: data?.visible === false ? "default" : "pointer",
        width: "240px",
        height: "260px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      onClick={() => {
        if (data?.visible === false) {
        } else {
          navigate("/dish/" + data.id);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        let mplanKey = Object.keys(mplans).find(
          (key) => mplans[key].id === data.id
        );
        let mplan = mplans[mplanKey];
        mplan.visible = mplan.visible !== undefined ? !mplan.visible : false;
        dispatch(updateRecipes({ ...mplans }));
      }}
    >
      <h4>{data?.title}</h4>
      <img src={data?.thumb} width={150} className="grid" />
      <div
        style={{
          width: "100%",
          textAlign: "right",
          fontSize: "28px",
          color: "rgb(97, 97, 97)",
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          let _mplans = { ...mplans };
          fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then((response) => response.json())
            .then((d) => {
              let data = d.meals[0];
              let ob = {
                id: data.idMeal,
                title: data.strMeal,
                thumb: data.strMealThumb,
                source: data.strSource,
                steps: data.strSteps,
                instructions: data.strInstructions,
                ingredients: [],
                visible: true,
              };
              _mplans[k] = ob;
              dispatch(updateRecipes({ ..._mplans }));
              saveToLocal({ ..._mplans });
            });
        }}
      >
        *
      </div>
    </div>
  );
};

export default MealPlan;
