import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Repository from "../pages/Repository";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    {/* O + sinaliza que tudo que vem depois da barra é um parâmetro */}
    <Route path="/repositories/:repository+" component={Repository} />
  </Switch>
);

export default Routes;
