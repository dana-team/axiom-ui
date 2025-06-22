import { Routes, Route } from "react-router-dom";
import { Layout } from "@/Layout";
import Home from "@/routes/Home";
import Clusters from "@/routes/Clusters";
import NotFound from "@/routes/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<Layout />}>
        <Route path="/clusters" element={<Clusters />} />
      </Route>
    </Routes>
  );
}

export default App;
