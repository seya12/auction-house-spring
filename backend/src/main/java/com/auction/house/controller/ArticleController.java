package com.auction.house.controller;

import com.auction.house.controller.dto.article.*;
import com.auction.house.controller.dto.bid.*;
import com.auction.house.entity.*;
import com.auction.house.entity.enums.*;
import com.auction.house.service.*;
import org.modelmapper.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.*;

import java.util.*;

@RestController
@RequestMapping("/articles")
public class ArticleController {

  final ArticleService articleService;
  final CustomerService customerService;
  final ModelMapper modelMapper;

  public ArticleController(ArticleService articleService, CustomerService customerService, ModelMapper modelMapper) {
    this.articleService = articleService;
    this.customerService = customerService;
    this.modelMapper = modelMapper;
  }

  @GetMapping
  public List<ArticleDto> getArticles(@RequestParam(required = false) ArticleStatus status) {
    return articleService.getArticles(status)
      .stream()
      .map(article -> modelMapper.map(article, ArticleDto.class))
      .toList();
  }

  @GetMapping("/{id}")
  public ArticleDto getArticle(@PathVariable Long id) {
    var article = articleService.getArticle(id).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));

    return modelMapper.map(article, ArticleDto.class);
  }

  @PostMapping("/{id}/bid")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public ResponseEntity<?> makeBid(@PathVariable Long id, @RequestBody BidForCreationDto bid) {
    var article = articleService.getArticle(id).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));
    var customer = customerService.getCustomer(bid.getCustomerId())
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));

    if (articleService.makeBid(article, customer, bid.getBid())) {
      return ResponseEntity.noContent().build();
    }

    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Higher bid already exists");
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<ArticleDto> createArticle(@RequestBody ArticleForCreationDto article) {
    var customer = customerService.getCustomer(article.getCustomerId())
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));

    var articleEntity = modelMapper.map(article, Article.class);
    articleEntity.setId(null);
    var newArticle = articleService.insert(articleEntity, customer);
    return new ResponseEntity<>(modelMapper.map(newArticle, ArticleDto.class), HttpStatus.CREATED);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public ResponseEntity<?> deleteArticle(@PathVariable Long id) {
    var article = articleService.getArticle(id).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));

    articleService.delete(article);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}/start")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public ResponseEntity<?> startAuction(@PathVariable Long id) {
    var article = articleService.getArticle(id).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));

    articleService.start(article);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}/stop")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public ResponseEntity<?> stopAuction(@PathVariable Long id) {
    var article = articleService.getArticle(id).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));

    articleService.stop(article);
    return ResponseEntity.noContent().build();
  }


}
