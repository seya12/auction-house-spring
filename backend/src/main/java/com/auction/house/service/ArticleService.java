package com.auction.house.service;

import com.auction.house.entity.*;
import com.auction.house.entity.enums.*;
import com.auction.house.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class ArticleService {
  final ArticleRepository articleRepository;

  public ArticleService(ArticleRepository articleRepository) {
    this.articleRepository = articleRepository;
  }

  public List<Article> getArticles(ArticleStatus status) {
    if (status == null) return articleRepository.findAll();

    return articleRepository.findByStatusOrderByNameAsc(status);
  }

  public Optional<Article> getArticle(Long id) {
    return articleRepository.findById(id);
  }
}
