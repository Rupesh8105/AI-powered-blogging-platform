import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

import Login from "./pages/Login";
import { CreateBlog } from "./pages/Pages";
import AIAssistant from "./pages/AIAssistant";
import SEOAnalyzer from "./pages/SEOAnalyzer";
import Analytics from "./pages/Analytics";
import MyBlogs from "./pages/MyBlogs";
import Subscription from "./pages/Subscription";
import Settings from "./pages/Settings";

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<App />} />

        <Route path="/create" element={<CreateBlog />} />

        <Route path="/blogs" element={<MyBlogs />} />

        <Route path="/ai" element={<AIAssistant />} />

        <Route path="/seo" element={<SEOAnalyzer />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route
          path="/subscription"
          element={<Subscription />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
