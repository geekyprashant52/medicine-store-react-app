import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./Components/Login Page/LoginPage";
import HomePage from "./Components/Home Page/HomePage";
import AdminInventory from "./Components/Admin Inventory Page/AdminInventory";
import ViewTeamPage from "./Components/Admin Team Page/ViewTeamPage";
import ViewOrder from "./Components/Sales ViewOrder Page/ViewOrder";
import TopBar from "./Components/Topbar/TopBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/homepage/:user" exact component={HomePage} />
          <Route path="/inventory" exact component={AdminInventory} />
          <Route path="/inventory" exact component={AdminInventory} />
          <Route path="/viewteam" exact component={ViewTeamPage} />
          <Route path="/vieworder" exact component={ViewOrder} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
