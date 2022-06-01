import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const MealPlan = ({ data, key }) => {
  const navigate = useNavigate();

  return (
    <div
      key={key}
      style={{
        cursor: "pointer",
        width: "240px",
        height: "260px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      onClick={() => {
        navigate("/dish/" + data.id);
      }}
    >
      <h4>{data?.title}</h4>
      <img src={data?.thumb} width={150} className="grid" />
    </div>
  );
};

export default MealPlan;
