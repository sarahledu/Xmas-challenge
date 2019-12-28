import React from 'react';
import {Switch, Route} from "react-router-dom"
import './../styles/App.css';

//components
import NavMainLink from "./NavMainLink"
import Home from "./Home"
import CreateTshirt from "./CreateTshirt"
import ManageTshirt from "./ManageTshirts"

function App() {
  return (
    <div className="App">
    <NavMainLink/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/create" component={CreateTshirt} />
        <Route path="/manage" component={ManageTshirt} />
      </Switch>
    </div>
  );
}

export default App;
