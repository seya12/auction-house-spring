package com.auction.house.service;

import com.auction.house.entity.*;
import com.auction.house.entity.enums.*;
import com.auction.house.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class ArticleService {
  final ArticleRepository articleRepository;
  final BidRepository bidRepository;

  public ArticleService(ArticleRepository articleRepository, BidRepository bidRepository) {
    this.articleRepository = articleRepository;
    this.bidRepository = bidRepository;
  }

  public List<Article> getArticles(ArticleStatus status) {
    if (status == null) return articleRepository.findAll();

    return articleRepository.findByStatusOrderByNameAsc(status);
  }

  public Optional<Article> getArticle(Long id) {
    return articleRepository.findById(id);
  }

  public boolean makeBid(Article article, Customer customer, Double bid){
    if(article == null || customer == null || bid == null){
      return false;
    }
    Bid bidEntity = new Bid();
    bidEntity.addArticle(article);
    bidEntity.addCustomer(customer);
    bidEntity.setBid(bid);

    bidRepository.save(bidEntity);
    return true;
  }
}
