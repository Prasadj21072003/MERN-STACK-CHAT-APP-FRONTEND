import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Authcontextprovider } from "./Context/Authcontext.tsx";
import { Socketcontextprovider } from "./Context/Socketcontext.jsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Authcontextprovider>
    <Socketcontextprovider>
      <App />
    </Socketcontextprovider>
  </Authcontextprovider>
);
