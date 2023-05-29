package at.swt.auction.house.controller.dto.article;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;

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
