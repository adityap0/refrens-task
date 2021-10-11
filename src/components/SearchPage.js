import React from "react";
import FuzzySearch from "fuzzy-search";
import Suggestions from "./Suggestions";
import Header from "./Header";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      users: null,
      results: null,
      cursor: null,
      user: null,
    };
  }
  componentDidMount() {
    //When the component is loaded the users are stored into users state
    fetch(`https://refrens-task-backend.herokuapp.com/users/search`)
      .then((res) => res.json())
      .then((users) => {
        this.setState({ users });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  handleChange = (e) => {
    const search = e.target.value;
    const users = this.state.users;
    //This function is used to search the elements in the data
    this.setState({ search }, () => {
      const searcher = new FuzzySearch(
        users,
        ["_id", "name", "pin", "add", "items"],
        {
          caseSensitive: false,
          sort: true,
        }
      );
      if (this.state.search) {
        const results = searcher.search(`${this.state.search}`);
        this.setState({
          results,
        });
      } else {
        this.setState({
          results: null,
        });
      }
    });
  };
  handleKeyDown = (e) => {
    const { cursor, results } = this.state;
    // arrow up/down button should select next/previous list element
    if (results) {
      if (e.keyCode === 38 && cursor > 0) {
        this.setState((prevState) => ({
          cursor: prevState.cursor - 1,
        }));
        //when cursor is yet to reach last result
      } else if (e.keyCode === 40 && cursor < results.length) {
        this.setState((prevState) => ({
          cursor: prevState.cursor === null ? 0 : prevState.cursor + 1,
        }));
        //When cursor reaches the last result it will come on to the 1st result
      } else if (e.keyCode === 40 && cursor === results.length) {
        this.setState({
          cursor: 0,
        });
        //when Enter is pressed w/o navigation it will redirect to the 1st result
      } else if (e.keyCode === 13) {
        const user = this.state.cursor
          ? this.state.results[this.state.cursor]
          : this.state.results[0];
        this.props.history.push({
          pathname: "/info",
          state: { user },
        });
      }
    } else {
      this.setState({
        cursor: null,
      });
    }
  };
  render() {
    return (
      <div className="mx-auto">
        <Header />
        <div className="w-4/12 flex flex-col mx-auto">
          <input
            type="text"
            className="border p-2 bg-gray-100 w-full"
            placeholder="Search users by ID, name, address, pincode..."
            onChange={this.handleChange}
            value={this.state.search}
            onKeyDown={this.handleKeyDown}
          />
          <div className="border w-full">
            <Suggestions
              results={this.state.results}
              key={this.state.results ? this.state.results.length : 0}
              cursor={this.state.cursor}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
