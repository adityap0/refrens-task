import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouse: false,
      cursor: this.props.cursor,
    };
  }
  handleMouse = (e) => {
    e.target.scrollIntoView({ behavior: "smooth" });
    this.setState({
      cursor: null,
      mouse: true,
    });
  };

  handleClick = (id) => {
    this.props.history.push({
      pathname: "/info",
      state: { user: this.props.results[id] },
    });
  };
  componentDidUpdate(Pp) {
    if (Pp.cursor !== this.props.cursor) {
      this.setState({
        cursor: this.props.cursor,
        mouse: false,
      });
    }
  }
  render() {
    const results = this.props.results;
    const cursor = this.state.cursor;
    const mouse = this.state.mouse;
    return (
      <>
        <ul
          className={results ? "h-96 overflow-auto" : "hidden"}
          onKeyPress={this.handleKey}
        >
          {results ? (
            results.map((user, id) => {
              return (
                <li
                  className={
                    cursor === id
                      ? "cursor-pointer bg-yellow-100 p-4"
                      : mouse
                      ? "cursor-pointer p-4 hover:bg-yellow-100"
                      : "cursor-pointer p-4 bg-white"
                  }
                  onMouseOver={this.handleMouse}
                  onClick={() => {
                    this.handleClick(id);
                  }}
                >
                  <span className="font-bold">{user._id}</span>
                  <h1 className="italic">{user.name}</h1>
                  <p className="text-sm">{user.add}</p>
                  <h2 className="text-xs">{user.pin}</h2>
                </li>
              );
            })
          ) : (
            <span className="cursor-pointer text-gray-100">No User Found</span>
          )}
        </ul>
      </>
    );
  }
}

export default withRouter(Suggestions);
