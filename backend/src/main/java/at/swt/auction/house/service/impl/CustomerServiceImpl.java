package at.swt.auction.house.service.impl;

import at.swt.auction.house.entity.*;
import at.swt.auction.house.repository.*;
import at.swt.auction.house.service.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class CustomerServiceImpl implements CustomerService {
  final CustomerRepository customerRepository;

  public CustomerServiceImpl(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  @Override
  public Optional<Customer> getCustomer(String userName) {
    return customerRepository.findByEmail(userName);
  }

  @Override
  public Optional<Customer> getCustomer(Long id) {
    return customerRepository.findById(id);
  }
}
