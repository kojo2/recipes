import React from "react";
import Dish from "./Dish";
import WeekGrid from "./WeekGrid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingList from "./ShoppingList";
import Save from "./Save";
import Load from "./Load";

const AppWrapper = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/dish/:id" element={<Dish />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/:refresh" element={<WeekGrid />} />
        <Route path="/save" element={<Save />} />
        <Route path="/load" element={<Load />} />
        <Route path="/" element={<WeekGrid />} />
      </Routes>
    </div>
  );
};

export default AppWrapper;
