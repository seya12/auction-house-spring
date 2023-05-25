import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ArticleDetail from "./components/ArticleDetail";
import HomePage from "./pages/HomePage";
import ArticleList from "./components/ArticleList";
import Default from "./components/Default";
import { useState } from "react";
import UserContext, { User } from "./UserContext";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
    </UserContext.Provider>
  );
}

export default App;
