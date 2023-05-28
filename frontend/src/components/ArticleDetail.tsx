import { useState, useEffect, ChangeEvent, MouseEvent, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleDto } from "../services/auction-house-service";
import * as api from "../services/auction-house-service";
import { BidDto } from "../services/auction-house-service";
import UserContext from "../UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";

const ArticleDetail: React.FC = () => {
  const [article, setArticle] = useState<ArticleDto | null>(null);
  const [bidAmount, setBidAmount] = useState(0);
  const articleId = useParams();
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const defaultBid: BidDto = { bid: 0, date: "" };
  const highestBid = article?.bids?.reduce((prev, curr) => (prev.bid > curr.bid ? prev : curr), defaultBid)?.bid ?? 0;
  const userIsSeller = article?.sellerId === user?.id;

  const fetchArticle = useCallback(async () => {
    const result = await api.getArticle(parseInt(articleId.id || ""));
    if (result.status === 200) {
      setArticle(result.data);
    } else {
      toast({ title: "Article does not exist", variant: "destructive" });
      navigate("/home/articles");
    }
  }, [articleId, navigate, toast]);

  useEffect(() => {
    fetchArticle();
  }, [articleId, fetchArticle]);

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
      <div className="flex justify-between px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Product Details</h3>
        <div className="ml-auto flex space-x-2 sm:justify-end">
          <Button
            disabled={!userIsSeller}
            variant={"secondary"}>
            Delete
          </Button>
          <Button
            disabled={!userIsSeller || article?.status !== "LISTED"}
            variant={"secondary"}>
            Start
          </Button>
          <Button
            disabled={!userIsSeller || article?.status !== "AUCTION_RUNNING"}
            variant={"secondary"}>
            Close
          </Button>
        </div>
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
