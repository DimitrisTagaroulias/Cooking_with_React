import React, { useContext, useEffect } from "react";
import IngredientList from "./IngredientList";
import { RecipeContext } from "./App";

export default function Recipe(props) {
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
  const { id, name, cookTime, servings, instructions, ingredients } = props;

  useEffect(() => {
    // console.log("Render");
    // See https://courses.webdevsimplified.com/view/courses/learn-react-today/114375-project-two-cooking-with-react-application/334679-16-useeffect-hook-and-localstorage
    // for "return" usage
    return () => {
      // console.log("Unmount");
    };
  });
  return (
    <div className="recipe">
      <div className="recipe__header">
        <h3 className="recipe__title">{name}</h3>
        <div>
          <button //
            className="btn btn--primary mr-1"
            onClick={() => handleRecipeSelect(id)}
          >
            Edit
          </button>
          <button
            //
            className="btn btn--danger"
            onClick={() => handleRecipeDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Cook Time:</span>
        <span className="recipe__value">{cookTime}</span>
      </div>
      <div>
        <span className="recipe__row">Servings:</span>
        <span className="recipe__value">{servings}</span>
      </div>
      <div>
        <span className="recipe__row">Instructions:</span>
        <div className="recipe__value recipe__instructions recipe__value--indented">
          {instructions}
        </div>
      </div>
      <div>
        <span className="recipe__row">Ingredients:</span>
        <div className="recipe__value recipe__value--indented">
          <IngredientList ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}
