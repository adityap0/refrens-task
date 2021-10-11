import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import NewUser from "./components/NewUser"
import User from "./components/User"

function App() {
  return (
    <>
      <Router>
        <Route path="/" exact={true} component={SearchPage}></Route>
        <Route path="/users/new" exact={true} component={NewUser}></Route>
        <Route path="/info" exact={true} component={User}></Route>
      </Router>
    </>
  );
}

export default App;
