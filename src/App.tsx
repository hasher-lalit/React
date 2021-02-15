import React from "react";
import "./App.css";
import HomeLower from "./components/Home/HomeLower";
import Detail from "./components/Detail/Detail";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    // <Router>
    //   <Route exact path="/" component={HomeLower}/>
    //   <Route path="/detail" component={Detail} />
    // </Router>
    <div>
      <HomeLower />
    </div>
  );
}

export default App;
