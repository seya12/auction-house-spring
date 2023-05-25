package com.auction.house.repository;

import com.auction.house.entity.*;
import org.springframework.data.jpa.repository.*;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
  Customer findByEmail(String email);
}
