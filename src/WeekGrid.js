import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MealPlan from "./MealPlan";
import { useDispatch } from "react-redux";
import useRedux from "./redux/useRedux";
import { updateRecipes } from "./redux/mainActions";

const WeekGrid = () => {
  const dispatch = useDispatch();
  const { mplans } = useRedux();
  const { refresh } = useParams();
  const navigate = useNavigate();
  const [forceRefresh, setForceRefresh] = useState(false);
  useEffect(() => {
    if (refresh === "f" && Object.values(mplans).length) return;
    let promises = [];
    let _mplans = {};
    for (let i = 0; i < 3 * 7; i++) {
      let p = new Promise((resolve, reject) => {
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
            };
            Object.keys(data)
              .filter((x) => x.indexOf("Ingredient") > -1)
              .forEach((key) => {
                if (data[key]) {
                  let index = key.split("Ingredient")[1];
                  ob.ingredients.push({
                    measure: data[`strMeasure${index}`],
                    ingredient: data[key],
                  });
                }
              });

            resolve(ob);
          });
      });
      promises.push(p);
    }
    Promise.all(promises).then((results) => {
      let count = 0;
      days.forEach((day) => {
        meals.forEach((meal) => {
          _mplans[`${day}:${meal}`] = results[count];
          count++;
        });
        dispatch(updateRecipes({ ..._mplans }));
      });
    });
  }, [forceRefresh]);

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
              if (refresh === "f") {
                window.open("/");
              } else {
                setForceRefresh(!forceRefresh);
              }
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
