package com.auction.house.controller.dto.bid;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BidDto {
  @NotNull
  private Long customerId;
  @NotNull
  private Double bid;
}
