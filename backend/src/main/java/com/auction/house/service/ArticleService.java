package com.auction.house.service;

import com.auction.house.entity.*;
import com.auction.house.entity.enums.*;
import com.auction.house.repository.*;
import org.springframework.stereotype.*;

import java.time.*;
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

    var highestBid = bidService.getHighestBid(article);
    if(highestBid != null && highestBid.getBid() >= bid){
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

  public void delete(Article article) {
    articleRepository.delete(article);
  }

  public void start(Article article) {
    article.setStatus(ArticleStatus.AUCTION_RUNNING);
    articleRepository.save(article);
  }

  public void stop(Article article) {
    Bid highestBid = bidService.getHighestBid(article);
    if(highestBid == null){
      article.setStatus(ArticleStatus.NOT_SOLD);
      article.setHammerPrice(null);
      article.setBuyer(null);
      articleRepository.save(article);
      return;
    }

    article.setStatus(ArticleStatus.SOLD);
    article.setAuctionEndDate(LocalDateTime.now());
    article.setBuyer(highestBid.getCustomer());
    article.setHammerPrice(highestBid.getBid());

    articleRepository.save(article);
  }
}
