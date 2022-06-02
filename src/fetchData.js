import { reject } from "ramda";
import { saveToLocal } from "./localStorageLayer";
import { updateRecipes } from "./redux/mainActions";

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

export const fetchData = (dispatch) =>
  new Promise((resolve, reject) => {
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
              visible: true,
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
        saveToLocal({ ..._mplans });
        resolve();
      });
    });
  });
