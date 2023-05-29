package at.swt.auction.house.repository;

import at.swt.auction.house.entity.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
  Optional<Customer> findByEmail(String email);
}
