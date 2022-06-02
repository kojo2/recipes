import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { saveToLocal } from "./localStorageLayer";
import { updateRecipes } from "./redux/mainActions";
import useRedux from "./redux/useRedux";

const Load = () => {
  const dispatch = useDispatch();
  const [mp, setMp] = useState("");
  const navigate = useNavigate();
  const { mplans } = useRedux();
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
          value={mp}
          style={{ width: "50vw", height: "50vh" }}
          onChange={(e) => {
            setMp(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          dispatch(updateRecipes(JSON.parse(mp)));
          saveToLocal(JSON.parse(mp));
        }}
      >
        Load
      </button>
    </div>
  );
};

export default Load;
