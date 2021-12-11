import "./styles/App.css";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Appointment from "./pages/Appointment";
import Calender from "./pages/Calender";
import Message from "./pages/Message";
import Sign from "./pages/Sign";
import Prescribe from './pages/Prescribe'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewDash from "./pages/newDash";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/doctors">
            <NewDash />
          </Route>
          <Route path="/appointment">
            <Appointment />
          </Route>
          <Route path="/calender">
            <Calender />
          </Route>
          <Route path="/message">
            <Message />
          </Route>
          <Route path="/sign">
            <Sign />
          </Route>
          <Route path="/prescribe">
            <Prescribe />
          </Route>
          <Route path="/">
            <NewDash />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
