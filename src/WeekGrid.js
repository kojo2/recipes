import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MealPlan from "./MealPlan";
import { useDispatch } from "react-redux";
import useRedux from "./redux/useRedux";
import { updateRecipes } from "./redux/mainActions";

const WeekGrid = () => {
  const { mplans } = useRedux();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const meals = ["Dinner"];

  return (
    <div>
      <div style={{ padding: "20px 20px" }}></div>
      {mplans ? (
        <table>
          <thead>
            <tr>
              <th></th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal}>
                <th>{meal}</th>
                {days.map((day) => (
                  <td key={`${day}:${meal}`}>
                    <MealPlan data={mplans[`${day}:${meal}`]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default WeekGrid;
