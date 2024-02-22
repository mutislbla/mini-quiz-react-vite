import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { LoginRoute } from "./utils/loginRoute";
import Register from "./pages/register";
import Quiz from "./pages/quiz";
import Navbar from "./components/navbar";
import HomePage from "./pages/homepage";
import Summary from "./components/summary";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path={"/homepage"}
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <HomePage />
                </LoginRoute>
              </>
            }
          />
          <Route path={"/"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route
            path={"/play"}
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <Quiz />
                </LoginRoute>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
export default App;
