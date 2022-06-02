export const updateRecipes = (recipes) => ({
  type: "UPDATE_RECIPES",
  payload: recipes,
});

export const updateLoading = (loading) => ({
  type: "UPDATE_LOADING",
  payload: loading,
});
