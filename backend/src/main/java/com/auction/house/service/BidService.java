package com.auction.house.service;

import com.auction.house.entity.*;
import com.auction.house.entity.enums.*;
import com.auction.house.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class BidService {
  final BidRepository bidRepository;

  public BidService(BidRepository bidRepository) {
    this.bidRepository = bidRepository;
  }

  public boolean makeBid(Article article, Double bid){
    if(article == null || bid == null){
      return false;
    }
    Bid newBid = new Bid();
    bidRepository.save(newBid);
    return true;
  }

}
