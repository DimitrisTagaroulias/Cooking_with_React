import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import "../css/app.css";
// uuid is a package that generates unique IDs
import { v4 as uuidv4 } from "uuid";
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();

  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON == null) {
      return sampleRecipes;
    } else {
      return JSON.parse(recipeJSON);
    }
  });

  // .find()
  // https://www.youtube.com/watch?v=8SkHWeDoTf0&ab_channel=FlorinPop

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  console.log("selectedRecipe :", selectedRecipe);
  console.log("selectedRecipeId :", selectedRecipeId);
  // In useEffect()
  // 1. 1st argument is a function which is what we want to call every single time we render our component
  // 2. 2nd argument is an array of dependencies and allows you to say when you want to actually call this function()
  // If the second argument is an empty [] then the function will only run as soon as your application loads and only once
  // useEffect(() => {
  //   console.log("Rendered");
  // }, []);

  //**React 18 introduced some changes to how StrictMode works which causes part of this lesson to break(see document)
  // This goes first as it is a getter --> "getItem(LOCAL_STORAGE_KEY)"
  // useEffect(() => {
  //   const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   console.log(recipeJSON);
  //   console.log(localStorage);
  //   if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON));
  // }, []);

  // This goes second as it is a setter --> "setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))"
  useEffect(() => {
    // console.log("Rendered");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    // console.log(localStorage);
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };
  // {
  //   handleRecipeAdd: handleRecipeAdd,
  //   handleRecipeDelete: handleRecipeDelete,
  // }
  // ==
  // {
  //   handleRecipeAdd
  //   handleRecipeDelete
  // }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    };
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList
        //
        recipes={recipes}
        // as we have the props in <RecipeContext.Provider value={recipeContextValue}> we don't need the props below
        // handleRecipeAdd={handleRecipeAdd}
        // handleRecipeDelete={handleRecipeDelete}
      />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions:
      "1. Put salt on Chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 3,
    cookTime: "0:45",
    instructions: "1. Put paprika on Pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 Pounds",
      },
      {
        id: 2,
        name: "paprika",
        amount: "2 Tbs",
      },
    ],
  },
];

export default App;
