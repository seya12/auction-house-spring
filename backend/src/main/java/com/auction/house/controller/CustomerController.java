package com.auction.house.controller;

import com.auction.house.controller.dto.customer.*;
import com.auction.house.service.*;
import org.modelmapper.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.*;

@RestController
@RequestMapping("/customers")
public class CustomerController {

  final CustomerService customerService;
  final ModelMapper modelMapper;

  public CustomerController(CustomerService customerService, ModelMapper modelMapper) {
    this.customerService = customerService;
    this.modelMapper = modelMapper;
  }

  @PostMapping("/login")
  public CustomerInfoDto login(@RequestBody CustomerForLoginDto customerForLoginDto) {
    var customer = customerService.getCustomer(customerForLoginDto.getEmail()).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));

    return modelMapper.map(customer, CustomerInfoDto.class);
  }
}
