package com.auction.house.controller.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerForLoginDto {
  private String email;
  private String password;
}
