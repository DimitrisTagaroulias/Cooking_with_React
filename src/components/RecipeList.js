import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from "./App";

export default function RecipeList({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);

  return (
    <div className="recipe-list">
      <div>
        {recipes.map((recipe) => {
          // Pass in all keys:values of recipe Object at once with {...recipe}
          return <Recipe key={recipe.id} {...recipe} />;
          // For not have: 'Each child in a list should have a unique "key" prop' error we have to pass in key={"a-unique-key"} to <Recipe {...recipe} />
          // React uses the keys to know what different parts of the array it needs to re-render
        })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button
          //
          className="btn btn--primary"
          onClick={handleRecipeAdd}
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
}
