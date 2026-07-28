import { Route, Switch } from "wouter";
import { HomePage } from "./pages/Home";

export default function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  );
}
