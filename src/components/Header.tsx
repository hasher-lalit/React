import { Route, Switch, Redirect } from "react-router-dom";
import HomeLower from "./Home/HomeLower";
import Detail from "./Detail/Detail";
import NavBar from "./NavBar";
export const Header = (props: any) => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/HomeLower" component={HomeLower} />
        <Route exact path="/Detail" component={Detail} />
        <Route exact path="/">
          <Redirect to="/HomeLower" />
        </Route>
      </Switch>
    </div>
  );
};
