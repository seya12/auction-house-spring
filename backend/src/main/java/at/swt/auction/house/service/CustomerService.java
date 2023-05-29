package at.swt.auction.house.service;

import at.swt.auction.house.entity.*;

import java.util.*;

public interface CustomerService {
  Optional<Customer> getCustomer(String userName);

  Optional<Customer> getCustomer(Long id);
}
