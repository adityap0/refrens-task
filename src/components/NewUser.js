import React from "react";
import { Link } from "react-router-dom";
class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      add: "",
      items: "",
      pin: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const user = this.state;
    this.setState({
      name: "",
      add: "",
      items: "",
      pin: "",
    });
    fetch("https://refrens-task-backend.herokuapp.com/users/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location = "/";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <form
        className="flex flex-col w-6/12 mx-auto justify-center my-20 border bg-blue-50"
        onSubmit={this.handleSubmit}
      >
        <input
          type="name"
          name="name"
          placeholder="Enter your name"
          className="p-2 m-1 border"
          onChange={this.handleChange}
          value={this.state.name}
          required={true}
        />
        <input
          type="text"
          name="add"
          placeholder="Enter your address"
          className="p-2 m-1 border"
          value={this.state.add}
          onChange={this.handleChange}
          required={true}
        />
        <input
          type="text"
          name="items"
          placeholder="Enter items (enter comma b/w items)"
          className="p-2 m-1 border"
          value={this.state.items}
          onChange={this.handleChange}
          required={true}
        />
        <input
          type="text"
          name="pin"
          placeholder="Enter pincode"
          className="p-2 m-1 border"
          value={this.state.pin}
          onChange={this.handleChange}
          maxLength={6}
          required={true}
        />
        <button className="my-2 bg-green-400 w-2/12 mx-auto p-2 text-white">
          Submit
        </button>
        <Link to="/">
          <button className="my-2 bg-red-400 w-2/12 mx-auto p-2 text-white">
            Go Back
          </button>
        </Link>
      </form>
    );
  }
}

export default NewUser;
