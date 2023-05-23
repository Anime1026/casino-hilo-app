import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default AppRouter;
