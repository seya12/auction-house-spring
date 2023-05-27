package com.auction.house.controller.dto.bid;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BidDto {
  @NotNull
  private Double bid;
  private LocalDateTime date;
}
