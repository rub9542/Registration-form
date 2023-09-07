import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import PageOne from "./Components/PageOne";
import PageTwo from "./Components/PageTwo";
import PageThree from "./Components/PageThree";
import PageFour from "./Components/PageFour";

function App() {
  return (
    <div className="App">
        <div className="title">Sign Up </div>
      <div className="content-section">
        <Router>
          <Routes>
            <Route path="/" exact element={<PageOne />} />
            <Route path="/2" exact element={<PageTwo />} />
            <Route path="/3" exact element={<PageThree />} />
            <Route path="/4" exact element={<PageFour />} />
            <Route path="*" exact element={<PageOne />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
