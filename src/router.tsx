import { Route, Switch } from "wouter";
import { HomePage } from "./pages/Home";
import { RoomPage } from "./pages/Room";
import { NotFound } from "./components/NotFound";

export default function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/room" component={RoomPage} />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
