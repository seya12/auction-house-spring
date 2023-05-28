import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import DatePicker from "../ui/datepicker";
import { useContext, useState } from "react";
import * as api from "@/services/auction-house-service";
import { useNavigate } from "react-router-dom";
import UserContext from "@/UserContext";
import { toast } from "../ui/use-toast";

const ArticleDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const createArticle = async () => {
    const article: api.ArticleForCreationDto = {
      name: name,
      description: description,
      reservePrice: price,
      auctionStartDate: date?.toISOString() ?? "",
      customerId: user?.id ?? 0,
    };
    const result = await api.createArticle(article);
    if (result.status === 201) {
      navigate(`${result.data.id}`);
    } else {
      setOpen(false);
      toast({
        title: "Error creating article",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: (result.data as any).message ?? "",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Article</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Add Article</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="description"
              className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="reservePrice"
              className="text-right">
              Reserve Price
            </Label>
            <Input
              id="reservePrice"
              value={price}
              type="number"
              className="col-span-3"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="auctionStartDate"
              className="text-right">
              Auction Start Date
            </Label>
            <DatePicker
              date={date}
              setDate={setDate}></DatePicker>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={createArticle}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ArticleDialog;
