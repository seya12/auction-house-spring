package at.swt.auction.house.service.impl;

import at.swt.auction.house.entity.*;
import at.swt.auction.house.entity.enums.*;
import at.swt.auction.house.repository.*;
import at.swt.auction.house.service.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

import java.time.*;
import java.util.*;

@Service
@Transactional(readOnly = true)
public class ArticleServiceImpl implements ArticleService {
  final ArticleRepository articleRepository;
  final BidService bidService;

  public ArticleServiceImpl(ArticleRepository articleRepository, BidService bidService) {
    this.articleRepository = articleRepository;
    this.bidService = bidService;
  }

  @Override
  public List<Article> getArticles(ArticleStatus status) {
    if (status == null) return articleRepository.findAll();

    return articleRepository.findByStatusOrderByNameAsc(status);
  }

  @Override
  public Optional<Article> getArticle(Long id) {
    return articleRepository.findById(id);
  }

  @Override
  @Transactional
  public boolean makeBid(Article article, Customer customer, Double bid) {
    if (article == null || customer == null || bid == null) {
      return false;
    }

    var highestBid = bidService.getHighestBid(article);
    if (highestBid != null && highestBid.getBid() >= bid) {
      return false;
    }

    Bid bidEntity = new Bid();
    bidEntity.addArticle(article);
    bidEntity.addCustomer(customer);
    bidEntity.setBid(bid);

    bidService.insert(bidEntity);
    return true;
  }

  @Override
  @Transactional
  public Article insert(Article article, Customer customer) {
    article.setStatus(ArticleStatus.LISTED);
    article.addSeller(customer);
    return articleRepository.save(article);
  }

  @Override
  @Transactional
  public void delete(Article article) {
    articleRepository.delete(article);
  }

  @Override
  @Transactional
  public void start(Article article) {
    article.setStatus(ArticleStatus.AUCTION_RUNNING);
    articleRepository.save(article);
  }

  @Override
  @Transactional
  public void stop(Article article) {
    Bid highestBid = bidService.getHighestBid(article);
    if (highestBid == null) {
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
