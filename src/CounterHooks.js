import React, { useState, useContext } from "react";
import { ThemeContext } from "./App";

export default function CounterHooks({ initialCount }) {
  // HOOKS = useSomething()
  // **The useState() MUST always be on top level after the beginning og the function

  // const [state, setState] = useState(initialCount); <------ it must be always HERE

  // **it needs to be on top level because it saves the current state value

  // **it can't be inside {const [state, setState] = useState(initialCount);} like this.

  // **it can't be inside : ifs, loops, functions. It has to on the very top level of our function().

  // **it stores your state GLOBALLY

  //TODO: ** it has something to do with the order you use multiple usestates()??? I didn't understand at this point.

  // In useState() we can pass in as an argument whatever we want
  // const [state=we can name it whatever we want, setState=we can name it whatever we want] = useState({ count: initialCount } = whatever we want);
  //
  // we have updated the useState() and we have passed in a single number as an argument.
  const [count, setCount] = useState(initialCount);
  const style = useContext(ThemeContext);
  return (
    <div>
      {/* We need the previus state like the Class Component ("Counter.js") */}
      {/* <button onClick={() => setState({ count: state.count - 1 })}>-</button>
    </div> */}
      <button
        style={style}
        onClick={() =>
          // The "setState()" takes as argumemt the previous state by default ("parameter"=ACTUAL PREVIOUS STATE)
          setCount((prevCount) => {
            console.log("prevCount :", prevCount);
            return prevCount - 1;
          })
        }
      >
        -
      </button>
      <span>{count}</span>
      <button
        style={style}
        onClick={() =>
          setCount((prevCount) => {
            return prevCount + 1;
          })
        }
      >
        +
      </button>
    </div>
  );
}
