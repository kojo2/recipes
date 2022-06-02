import React from "react";
import { useNavigate } from "react-router";
import useRedux from "./redux/useRedux";

const Save = () => {
  const { mplans } = useRedux();
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ padding: "20px 20px" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Planner
          </button>
        </div>
        <textarea
          value={JSON.stringify(mplans)}
          style={{ width: "50vw", height: "50vh" }}
        />
      </div>
    </div>
  );
};

export default Save;
