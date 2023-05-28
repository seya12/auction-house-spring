import { useState, useEffect, ChangeEvent, MouseEvent, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleDto } from "../services/auction-house-service";
import * as api from "../services/auction-house-service";
import UserContext from "../UserContext";
import { useToast } from "@/components/ui/use-toast";

const ArticleDetail: React.FC = () => {
  const userId = useParams();
  const [article, setArticle] = useState<ArticleDto | null>(null);
  const [bidAmount, setBidAmount] = useState(0);
  const { user } = useContext(UserContext);
  const highestBid = article?.bids?.reduce((prev, curr) => (prev.bid > curr.bid ? prev : curr)).bid ?? 0;
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchArticle = useCallback(async () => {
    const result = await api.getArticle(parseInt(userId.id || ""));
    if (result.status === 200) {
      setArticle(result.data);
    } else {
      toast({ title: "Article does not exist", variant: "destructive" });
      navigate("/home/articles");
    }
  }, [userId, navigate, toast]);

  useEffect(() => {
    fetchArticle();
  }, [userId, fetchArticle]);

  const handleBidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBidAmount(Number(e.target.value));
  };

  const handleBidSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await api.makeBid(article?.id || 0, { customerId: user?.id || 0, bid: bidAmount });
    if (result.status === 204) {
      toast({ title: "Success!", variant: "success", duration: 5000 });
      setBidAmount(0);
      fetchArticle();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast({ title: "Error placing bid", description: (result.data as any).message ?? "", variant: "destructive" });
    }
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
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{highestBid}</dd>
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
            disabled={bidAmount <= 0 || bidAmount < highestBid}
            className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-600">
            Submit Bid
          </button>
        </div>
      </div>
    </div>
  );
};
export default ArticleDetail;
