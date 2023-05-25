package com.auction.house.service;

import com.auction.house.entity.*;
import com.auction.house.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class CustomerService {
  final CustomerRepository customerRepository;

  public CustomerService(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  public List<Customer> getCustomers() {
    return customerRepository.findAll();
  }

  public Customer findByEmail(String userName) {

    return customerRepository.findByEmail(userName);
  }
}
