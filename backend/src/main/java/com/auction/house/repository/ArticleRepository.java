package com.auction.house.repository;

import com.auction.house.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.*;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
