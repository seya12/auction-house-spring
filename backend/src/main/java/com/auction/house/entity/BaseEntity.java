package com.auction.house.entity;

import jakarta.persistence.*;
import lombok.*;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {
  @Id
  @GeneratedValue
  Long id;
}
