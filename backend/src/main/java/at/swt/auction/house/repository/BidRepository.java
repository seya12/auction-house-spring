package at.swt.auction.house.repository;

import at.swt.auction.house.entity.*;
import org.springframework.data.jpa.repository.*;

public interface BidRepository extends JpaRepository<Bid, Long> {
  Bid findFirstByArticleOrderByBidDesc(Article article);
}
