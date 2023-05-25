import { useEffect, useState } from "react";
import { Article } from "../services/auction-house-service";
import * as api from "../services/auction-house-service";
import { Link } from "react-router-dom";

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const result = await api.getArticles();
      if (result.status === 200) {
        setArticles(result.data);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {articles
          .sort((a, b) => a.name?.localeCompare(b.name ?? "") ?? 0)
          .map((article) => (
            <div
              key={article.id}
              className="rounded border border-gray-200 p-4 shadow">
              <h2 className="mb-2 text-xl font-bold">{article.name}</h2>
              <p className="text-gray-600">{article.description}</p>
              <Link
                className="text-blue-500 hover:text-blue-700"
                to={article.id + ""}>
                Read more
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ArticleList;
