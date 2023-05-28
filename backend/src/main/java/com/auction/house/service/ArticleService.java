package com.auction.house.service;

import com.auction.house.entity.*;
import com.auction.house.entity.enums.*;
import com.auction.house.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class ArticleService {
  final ArticleRepository articleRepository;
  final BidService bidService;

  public ArticleService(ArticleRepository articleRepository, BidService bidService) {
    this.articleRepository = articleRepository;
    this.bidService = bidService;
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

    if(bidService.getHighestBid(article).getBid() >= bid){
      return false;
    }

    Bid bidEntity = new Bid();
    bidEntity.addArticle(article);
    bidEntity.addCustomer(customer);
    bidEntity.setBid(bid);

    bidService.insert(bidEntity);
    return true;
  }

  public Article insert(Article article, Customer customer) {

    article.setStatus(ArticleStatus.LISTED);

    article.addSeller(customer);
    return articleRepository.save(article);
  }
}
