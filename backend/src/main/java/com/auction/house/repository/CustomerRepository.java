package com.auction.house.repository;

import com.auction.house.entity.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
  Optional<Customer> findByEmail(String email);
}
