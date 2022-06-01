import "./apps.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <AppWrapper />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
