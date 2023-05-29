package at.swt.auction.house.controller.dto.customer;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto {
  @NotNull
  private Long id;
  private String firstName;
  private String lastName;
  @NotNull
  private String email;
}
