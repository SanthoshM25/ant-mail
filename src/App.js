import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import History from "./components/History";
import HistoryList from "./components/HistoryList";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home/:email" component={Home} />
        <Route path="/history" component={History} />
        <Route path="/singlehistory/:id" component={HistoryList} />
      </Switch>
    </Router>
  );
}
