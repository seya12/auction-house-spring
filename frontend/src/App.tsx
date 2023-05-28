import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ArticleDetail from "./components/ArticleDetail";
import HomePage from "./pages/HomePage";
import ArticleList from "./components/ArticleList";
import Default from "./components/Default";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage />}
      />
      <Route
        path="home"
        element={<HomePage />}>
        <Route
          path=""
          element={<Default />}
        />
        <Route
          path="articles"
          element={<ArticleList />}
        />
        <Route
          path="articles/:id"
          element={<ArticleDetail />}
        />
      </Route>
    </Routes>
  );
}

export default App;
