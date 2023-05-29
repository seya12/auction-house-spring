package at.swt.auction.house.repository;

import at.swt.auction.house.entity.*;
import at.swt.auction.house.entity.enums.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface ArticleRepository extends JpaRepository<Article, Long> {
  List<Article> findByStatusOrderByNameAsc(ArticleStatus articleStatus);
}
