import React from "react";
import Ingredient from "./Ingredient";

export default function IngredientList({ ingredients }) {
  // An alternative way for rendering a component is to work with it outside of JSX as the code below
  // Loop through all over of our ingredient outside of JSX -->
  // --> return (<> "<JSX></JSX>" </>)
  const ingredientElements = ingredients.map((ingredient) => {
    return <Ingredient key={ingredient.id} {...ingredient} />;
  });
  // console.log("ingredientElements: ", ingredientElements);
  return <div className="ingredient-grid">{ingredientElements}</div>;
}
