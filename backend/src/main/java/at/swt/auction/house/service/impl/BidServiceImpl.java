package at.swt.auction.house.service.impl;

import at.swt.auction.house.entity.*;
import at.swt.auction.house.repository.*;
import at.swt.auction.house.service.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

@Service
@Transactional(readOnly = true)
public class BidServiceImpl implements BidService {
  final BidRepository bidRepository;

  public BidServiceImpl(BidRepository bidRepository) {
    this.bidRepository = bidRepository;
  }

  @Override
  @Transactional
  public void insert(Bid bid) {
    bidRepository.save(bid);
  }

  @Override
  public Bid getHighestBid(Article article) {
    if (article == null) {
      return null;
    }
    return bidRepository.findFirstByArticleOrderByBidDesc(article);
  }

}
