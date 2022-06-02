export const saveToLocal = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

export const getFromLocal = () => {
  let o;
  try {
    o = JSON.parse(localStorage.getItem("data"));
  } catch (err) {
    o = "Cant load";
  }
  return o;
};
