package at.swt.auction.house.service;

import at.swt.auction.house.entity.*;
import at.swt.auction.house.entity.enums.*;

import java.util.*;

public interface ArticleService {
  List<Article> getArticles(ArticleStatus status);

  Optional<Article> getArticle(Long id);

  boolean makeBid(Article article, Customer customer, Double bid);

  Article insert(Article article, Customer customer);

  void delete(Article article);

  void start(Article article);

  void stop(Article article);
}
