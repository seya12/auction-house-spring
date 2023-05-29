package at.swt.auction.house.service;

import at.swt.auction.house.entity.*;

public interface BidService {
  void insert(Bid bid);

  Bid getHighestBid(Article article);
}
