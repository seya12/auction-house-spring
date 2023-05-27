package com.auction.house.controller.dto.customer;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerInfoDto {
  @NotNull
  private Long id;
  @NotNull
  private String email;
}
