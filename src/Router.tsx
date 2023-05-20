import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/cert=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhY2IxOTBjNDBhY2Y0ZGEzYjM3YTEwNDJmY2EzMWQxMyIsInN1YiI6IntcImFwcFR5cGVcIjpcIjIzNFwiLFwiY2hhbm5lbElkXCI6XCJoNVwiLFwiY3JlYXRlVGltZVwiOjE2ODQzMjQzMjgwMDAsXCJpbnZpdGVDb2RlXCI6XCJBUlFET1dcIixcImlzVGVzdFwiOjAsXCJsYXN0TG9naW5UaW1lXCI6MTY4NDUwMDc3NjA0MCxcIm1lbWJlckxldmVsXCI6MSxcInBhY2thZ2VJZFwiOjQsXCJwYXNzd29yZFwiOlwiYTQxNjcxZDliOTg1NDkwNTExYzdlNDMwNzZlZTIzOWZsb3R0ZXJ5LTIwMjJcIixcInJlZ2lzdGVySXBcIjpcIjIxOC4xOTAuMjQ1LjQ0XCIsXCJyZWdpc3RlclNvdXJjZVwiOlwiaDVcIixcInJlZ2lzdGVyVmVyc2lvbkNvZGVcIjoyMzQsXCJzdGF0dXNcIjowLFwidXBkYXRlVGltZVwiOjE2ODQ1MDA3NzYwNDAsXCJ1c2VySWRcIjoxNjc3MTMsXCJ1c2VyTmFtZVwiOlwiMTExMTFcIixcInVzZXJQaG9uZVwiOlwiMTIzNDU2Nzg4OFwifSIsImlzcyI6InNnIiwiaWF0IjoxNjg0NTAwNzc2fQ.mzk9PbmIqh_ms2bHq1E6w_aECC-592RRGrFCFW7DIkg"
            element={<Dashboard />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default AppRouter;
