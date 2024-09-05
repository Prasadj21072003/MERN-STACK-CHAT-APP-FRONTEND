import { useAuthcontext } from "./Context/Authcontext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App = () => {
  const { authuser } = useAuthcontext();

  return (
    <Router>
      <div className="h-screen  flex justify-center items-center px-[36px] sm:px-[86px] bg-gradient-to-r from-zinc-800 to-fuchsia-900">
        <Routes>
          <Route
            path="/"
            element={authuser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!authuser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authuser ? <Signup /> : <Navigate to={"/"} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
