import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="w-6/12 mx-auto flex justify-center">
      <Link to="/users/new" exact={true}>
        <button className="text-center my-20 mx-auto border p-2 bg-green-400 text-white">
          Add User
        </button>
      </Link>
    </div>
  );
}

export default Header;
