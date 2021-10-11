import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class User extends Component {
  componentDidMount() {}
  render() {
    const user = this.props.history.location.state.user;
    return (
      <div className="p-4 w-4/12 mx-auto my-20 bg-blue-100 flex flex-col justify-center">
        <div className="mx-auto">
          <h1 className="p-2 text-xl">Username : {user.name}</h1>
          <span className="p-2 text-xl">UserId : {user._id}</span>
          <p className="p-2 text-xl">Address :{user.add} </p>
          <h2 className="p-2 text-xl">Pin : {user.pin}</h2>
          <ul className="flex border text-xl">
            Items :
            {user.items.map((item) => {
              return <li className="flex mx-2 text-xl">{item}</li>;
            })}
          </ul>
        </div>
        <Link to="/">
          <button className="bg-red-400 w-2/12 mx-auto p-2 text-white">
            Go Back
          </button>
        </Link>
      </div>
    );
  }
}

export default withRouter(User);
