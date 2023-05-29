package at.swt.auction.house.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CreditCard extends PaymentOption {
  private String cardNumber;
  private String cardValidTo;
  private String cardVerificationValue;
}
