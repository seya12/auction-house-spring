package com.auction.house.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bid extends BaseEntity {

  private double bid;

  private LocalDateTime date;

  @ManyToOne
  private Customer customer;

  @ManyToOne
  private Article article;

  public void addArticle(Article article) {
    if (article != null && article.getBids() != null) {
      article.getBids().remove(this);
    }
    this.article = article;
    article.getBids().add(this);
  }

  public void removeArticle() {
    if (article != null && article.getBids() != null) {
      article.getBids().remove(this);
    }
    article = null;
  }

  public void addCustomer(Customer customer) {
    if (customer != null && customer.getBids() != null) {
      customer.getBids().remove(this);
    }
    this.customer = customer;
    customer.getBids().add(this);
  }


}
