import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from "uuid";

export default function RecipeEdit(props) {
  console.log("props:", props.recipe);
  const { recipe } = props;
  const { id, name, cookTime, servings, instructions, ingredients } = recipe;
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange(id, { ...recipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...ingredients, newIngredient] });
  }

  function handleIngredientDelete(id) {
    handleChange({
      ingredients: ingredients.filter((i) => i.id !== id),
    });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button //
          className="btn recipe-edit__remove-button"
          onClick={() => handleRecipeSelect("undifined")}
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label //
          htmlFor="name"
          className="recipe-edit__label"
        >
          Name
        </label>
        <input //
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => handleChange({ name: e.target.value })}
          className="recipe-edit__input"
        />
        <label //
          htmlFor="cookTime"
          className="recipe-edit__label"
        >
          Cook Time
        </label>
        <input //
          type="text"
          name="cookTime"
          id="cookTime"
          value={cookTime}
          onChange={(e) => handleChange({ cookTime: e.target.value })}
          className="recipe-edit__input"
        />
        <label //
          htmlFor="servings"
          className="recipe-edit__label"
        >
          Servings
        </label>
        <input //
          type="number"
          min="1"
          name="servings"
          id="servings"
          value={servings}
          onChange={(e) =>
            handleChange({ servings: parseInt(e.target.value) || "" })
          }
          className="recipe-edit__input"
        />
        <label //
          htmlFor="instructions"
          className="recipe-edit__label"
        >
          Instructions
        </label>
        <textarea //
          name="instructions"
          id="instructions"
          value={instructions}
          onChange={(e) => handleChange({ instructions: e.target.value })}
          className="recipe-edit__input"
        />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {ingredients.map((ingredient) => (
          <RecipeIngredientEdit //
            key={ingredient.id}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            ingredient={ingredient}
          />
        ))}

        {/* Ingredients Components */}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button //
          className="btn btn--primary"
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
