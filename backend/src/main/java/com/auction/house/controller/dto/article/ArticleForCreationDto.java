package com.auction.house.controller.dto.article;

import com.auction.house.controller.dto.bid.*;
import com.auction.house.entity.enums.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleForCreationDto {
  private String name;
  private String description;
  private Double reservePrice;
  private LocalDateTime auctionStartDate;
  @NotNull
  private Long customerId;
}
