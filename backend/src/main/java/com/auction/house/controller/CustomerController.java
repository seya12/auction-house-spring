package com.auction.house.controller;

import com.auction.house.entity.*;
import com.auction.house.service.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/customers")
public class CustomerController {

  final CustomerService customerService;

  public CustomerController(CustomerService customerService) {
    this.customerService = customerService;
  }


  @GetMapping
  public List<Customer> getCustomers() {
    return customerService.getCustomers();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public ResponseEntity<?> login(@RequestParam String email){

    if(customerService.findByEmail(email) != null){
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
}
