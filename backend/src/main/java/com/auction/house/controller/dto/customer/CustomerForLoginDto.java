package com.auction.house.controller.dto.customer;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerForLoginDto {
  @NotNull
  private String email;
  @NotNull
  private String password;
}
