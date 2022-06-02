import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useRedux from "./redux/useRedux";
import useQueryParams from "./useQueryParams";

const Dish = () => {
  const [data, setData] = useState();
  const { mplans } = useRedux();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    let obj = Object.values(mplans).find((x) => x.id === id);
    if (!obj) {
      navigate("/");
    } else {
      setData({ ...obj });
    }
  }, [id]);

  let d = data?.instructions.split(". ") || [];
  const inst = [...d, "Enjoy!"];
  return (
    <>
      <div style={{ padding: "5px 10px", display: "flex" }}>
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Planner
          </button>
          <h4>{data?.title}</h4>
          <img src={data?.thumb} width={400} />
          <br />
          <br />
          <button
            onClick={() => {
              setCurrentStep(0);
            }}
            style={{
              cursor: "pointer",
              width: "200px",
              height: "30px",
              backgroundColor: "rgb(124, 188, 255)",
              borderRadius: "10px",
              fontSize: "21px",
            }}
          >
            Start cooking
          </button>
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
      {currentStep > -1 ? (
        <div
          onClick={() => {
            setCurrentStep(-1);
          }}
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (currentStep < inst.length - 1) {
                setCurrentStep(currentStep + 1);
              } else {
                setCurrentStep(-1);
              }
            }}
            style={{
              cursor: "pointer",
              background: "black",
              padding: "5px",
              width: "80vw",
              borderRadius: "10px",
              minHeight: "10vh",
              display: "flex",
              flexDirection: "col",
              justifyContent: "center",
              alignItems: "center",
              border: "solid white 1px",
              color: "white",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                WebkitUserSelect: "false",
              }}
            >
              {inst[currentStep]}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Dish;
