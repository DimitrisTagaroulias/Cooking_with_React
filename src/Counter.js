import React, { Component } from "react";
import { ThemeContext } from "./App";

export default class Counter extends Component {
  // We override the constructor for our Application to set this.state
  constructor(props) {
    // ALways remember super(props) because this makes sures that your props get set properly every single time that you override your constructor

    // "this.state" has always has to be an Object
    super(props);
    this.state = {
      count: props.initialCount,
    };
  }

  render() {
    // Will be console logged every time its state will be changed(so it will be rerended)

    console.log("Render Counter");
    return (
      <ThemeContext.Consumer>
        {/* The Consumer is going to be having a function inside of it :
        {(Provider Value)=> (return=omitted)( <JSX></JSX> )}*/}
        {/* "style" is the value={{ backgroundColor: theme }} of Provider */}
        {(style) => (
          <div>
            <button style={style} onClick={() => this.changeCount(-1)}>
              -
            </button>
            <span>{this.state.count}</span>
            <button style={style} onClick={() => this.changeCount(+1)}>
              +
            </button>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }

  changeCount(amount) {
    //**The setState is asynchronous
    //  If this.count=0 then you will have
    //  this.setState({ 0 + amount })
    //  this.setState({ 0 + amount })

    // This version of setState is the version that we pass an {object}
    // USE: Any time we don't use the previous state to set the new state we can just use the OBJECT VERSION
    // e.g. if we just want to set a state we can use this.setState({ count: 999 })
    // **It will be increased by 1 (not by 2)
    this.setState({ count: this.state.count + amount });
    this.setState({ count: this.state.count + amount });

    // This version of setState is the version that we pass a function()
    // USE: Any time at all that we use the previous state to set the new state we need to use the FUNCTION VERSION
    this.setState((prevState) => {
      return { count: prevState.count + amount };
    });
  }
}
