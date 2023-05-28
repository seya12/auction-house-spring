import { useEffect, useState } from "react";
import { ArticleDto } from "../services/auction-house-service";
import * as api from "../services/auction-house-service";
import { DataTable } from "./articles/data-table";
import { columns } from "./articles/columns";

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<ArticleDto[]>([]);

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
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={articles}
      />
    </div>
  );
};
export default ArticleList;
