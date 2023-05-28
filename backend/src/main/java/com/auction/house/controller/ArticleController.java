package com.auction.house.controller;

import com.auction.house.controller.dto.article.*;
import com.auction.house.controller.dto.bid.*;
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

    if(articleService.makeBid(article, customer, bid.getBid())){
      return ResponseEntity.noContent().build();
    }

    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Higher bid already exists");
  }

}
