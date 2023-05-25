import { useState, useEffect, ChangeEvent, MouseEvent, useContext } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../services/auction-house-service";
import * as api from "../services/auction-house-service";
import UserContext from "../UserContext";

const ArticleDetail: React.FC = () => {
  const userId = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [bidAmount, setBidAmount] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchArticle() {
      const result = await api.getArticle(parseInt(userId.id || ""));
      if (result.status === 200) {
        setArticle(result.data);
      }
    }
    fetchArticle();
  }, [userId]);

  const handleBidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBidAmount(Number(e.target.value));
  };

  const handleBidSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Do something with the bid amount, e.g., make an API call to update the bid
    console.log(`Placing bid for ${bidAmount} with user ${user?.email}`);
  };

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Product Details</h3>
      </div>
      <div className="mt-6 border-b border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{article?.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{article?.description}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Highest Bid</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{article?.bids?.at(0)?.bid}</dd>
          </div>
        </dl>
      </div>
      <div className="mt-2 divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <label
            htmlFor="bidAmount"
            className="text-base font-semibold leading-7 text-gray-900">
            Place a new bid:
          </label>
          <input
            type="number"
            id="bidAmount"
            value={bidAmount}
            onChange={handleBidChange}
            className="rounded border border-gray-300 px-2 py-1"
          />
          <button
            type="submit"
            onClick={handleBidSubmit}
            disabled={bidAmount <= 0}
            className="disabled:invalid ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
            Submit Bid
          </button>
        </div>
      </div>
    </div>
  );
};
export default ArticleDetail;
