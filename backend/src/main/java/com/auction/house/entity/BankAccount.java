package com.auction.house.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BankAccount extends PaymentOption {
  private String bankAccountNumber;
  private String bankIdentifier;
}
