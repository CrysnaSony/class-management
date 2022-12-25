import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import { useState } from "react";
function App() {
  const getToken = () => {
    return sessionStorage.getItem("token");
  };
  const [token, setToken] = useState(getToken());
  if (!token) {
    return (
      <Login setToken={setToken} />

      // <Router>
      //   <Routes>
      //     <Route exact path="/" element={<Login setToken={setToken} />} />
      //     <Route exact path="/register" element={<Register />} />
      //   </Routes>
      // </Router>
    );
  } else {
    return (
      <div className="App">
        <Router initialEntries={["/"]}>
          <Dashboard />
        </Router>
      </div>
    );
  }
}

export default App;
