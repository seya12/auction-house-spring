package com.auction.house.repository;

import com.auction.house.entity.*;
import com.auction.house.entity.enums.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface BidRepository extends JpaRepository<Bid, Long> {
}
