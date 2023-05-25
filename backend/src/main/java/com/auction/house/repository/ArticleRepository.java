package com.auction.house.repository;

import com.auction.house.entity.*;
import com.auction.house.entity.enums.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.*;

import java.util.*;

public interface ArticleRepository extends JpaRepository<Article, Long> {
  List<Article> findByStatusOrderByNameAsc(ArticleStatus articleStatus);
}
