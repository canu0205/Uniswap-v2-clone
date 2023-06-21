import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Pools from "./pages/Pools";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/pools" element={<Pools />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
