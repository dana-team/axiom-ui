import { Routes, Route } from "react-router-dom";
import { Layout } from "@/Layout";
import Home from "@/routes/Home";
import Clusters from "@/routes/Clusters";
import ClusterInfo from "@/routes/ClusterInfo";
import NotFound from "@/routes/NotFound";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<Layout />}>
        <Route path="/clusters" element={<Clusters />} />
        <Route path="/clusterInfo" element={<ClusterInfo />}/>
      </Route>
    </Routes>
  );
}

export default App;
