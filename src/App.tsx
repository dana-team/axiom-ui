import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/Layout";
import Home from "@/routes/Home";
import Clusters from "@/routes/Clusters";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/clusters" element={<Clusters />} />
      </Route>
    </Routes>
  );
}

export default App;
