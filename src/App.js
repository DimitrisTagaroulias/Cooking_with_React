import React, { useState } from "react";
import Counter from "./Counter";
import CounterHooks from "./CounterHooks";

// Whichever component that its state is changed that component is rerendered

// Creates a context that is used like GLOBAL environment from nested COMPONENTS so they can use the value of context.Provider like global variable in context.Consumer
export const ThemeContext = React.createContext();

function App() {
  // Will be console logged only once because its state doesn't change (so it isn't rerendered)
  console.log("Render App");
  const [theme, setTheme] = useState("green");
  return (
    // The Provider must always have the VALUE attribute
    <ThemeContext.Provider value={{ backgroundColor: theme }}>
      Counter
      <Counter initialCount={0} />
      <br />
      Counter Hooks
      <CounterHooks initialCount={0} />
      <button
        onClick={() =>
          setTheme((prevTheme) => {
            return prevTheme === "red" ? "blue" : "red";
          })
        }
      >
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  );
}

export default App;
