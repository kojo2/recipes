import React, { useEffect } from "react";
import Dish from "./Dish";
import WeekGrid from "./WeekGrid";
import { useNavigate } from "react-router";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingList from "./ShoppingList";
import Save from "./Save";
import Load from "./Load";
import useRedux from "./redux/useRedux";
import { useDispatch } from "react-redux";
import { updateLoading, updateRecipes } from "./redux/mainActions";
import { getFromLocal } from "./localStorageLayer";
import { fetchData } from "./fetchData";

const AppWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mplans, loading } = useRedux();

  useEffect(() => {
    if (!Object.keys(mplans).length) {
      let p = getFromLocal();
      if (p && p !== "Cant load" && Object.keys(p).length) {
        dispatch(updateRecipes(p));
      } else {
        fetchData(dispatch);
      }
    }
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => {
              dispatch(updateLoading(true));
              fetchData(dispatch).then(() => {
                dispatch(updateLoading(false));
              });
            }}
          >
            Randomise
          </button>
          <button
            onClick={() => {
              navigate("/save");
            }}
          >
            Save plan
          </button>
          <button
            onClick={() => {
              navigate("/load");
            }}
          >
            Load plan
          </button>
          <button
            onClick={() => {
              navigate("/shopping-list");
            }}
          >
            Shopping List
          </button>
        </div>
      </div>
      <Routes>
        <Route exact path="/dish/:id" element={<Dish />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/save" element={<Save />} />
        <Route path="/load" element={<Load />} />
        <Route path="/" element={<WeekGrid />} />
      </Routes>
      {loading ? (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        >
          <p style={{ fontSize: "28px" }}>Loading...</p>
        </div>
      ) : null}
    </div>
  );
};

export default AppWrapper;
