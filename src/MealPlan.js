import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updateRecipes } from "./redux/mainActions";
import useRedux from "./redux/useRedux";

const MealPlan = ({ data }) => {
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
    </div>
  );
};

export default MealPlan;
