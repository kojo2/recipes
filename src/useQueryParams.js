import React from "react";
import { useNavigate } from "react-router-dom";

/**
  Example: 
  add a query at the end e.g. /?adhoc=
  <Route exact path="/network/scenario-builder/:index/:portPair?/?adhoc=" component={ScenarioBuilder} />

  then on the page you want to access it, do this
  const { adhoc } = useQueryParams();
  console.log(adhoc, 'adhoc');

**/

const useQueryParams = () => {
  const history = useNavigate();
  let paramString = history.location.search.split("?")[1];
  if (!paramString) return {};
  let paramStrings = paramString.split("&");
  let obj = {};
  paramStrings.forEach((string) => {
    obj[string.split("=")[0]] = string.split("=")[1];
  });
  return obj;
};

export default useQueryParams;
