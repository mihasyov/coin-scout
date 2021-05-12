import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import CoinsListPage from "./pages/CoinsListPage";
import ChartPage from "./pages/ChartPage";
import "./App.css";

function App() {
  console.log("render app")
  return (
    <div className="container">
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={CoinsListPage} />
          <Route path="/coins/:id" component={ChartPage} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
