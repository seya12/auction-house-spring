package com.auction.house.controller;

import com.auction.house.entity.*;
import com.auction.house.entity.enums.*;
import com.auction.house.service.*;
import jakarta.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.*;

import java.util.*;

@RestController
@RequestMapping("/articles")
public class ArticleController {

  final ArticleService articleService;

  public ArticleController(ArticleService articleService) {
    this.articleService = articleService;
  }

  @GetMapping
  public List<Article> getArticles(@RequestParam(required = false) ArticleStatus status) {
    return articleService.getArticles(status);
  }

  @GetMapping("/{id}")
  public Article getArticle(@PathVariable Long id) {
    return articleService.getArticle(id).orElseThrow(() ->
           new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));
  }
  @PostMapping("/{id}/bid")
  public Article makeBid(@PathVariable Long id, @RequestParam Double bid) {

    return articleService.getArticle(id).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));
  }

}
