import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useRedux from "./redux/useRedux";
import useQueryParams from "./useQueryParams";

const Dish = () => {
  const [data, setData] = useState();
  const { mplans } = useRedux();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    let obj = Object.values(mplans).find((x) => x.id === id);
    if (!obj) {
      navigate("/");
    } else {
      setData({ ...obj });
    }
  }, [id]);
  return (
    <div style={{ padding: "5px 10px", display: "flex" }}>
      <div>
        <button
          onClick={() => {
            navigate("/f");
          }}
        >
          Planner
        </button>
        <h4>{data?.title}</h4>
        <img src={data?.thumb} width={400} />
        <h1>Instructions</h1>
        {data?.instructions.split(". ").map((x) => (
          <p>{x}. </p>
        ))}
      </div>
      <div
        style={{
          width: "40vw",
          borderLeft: "solid 1px black",
          paddingLeft: "20px",
        }}
      >
        <h1>Ingredients</h1>
        {data?.ingredients.map((x, i) => {
          return (
            <p>
              {x.measure} {x.ingredient}.{" "}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Dish;
