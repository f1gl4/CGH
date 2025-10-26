package dev.gch.catalog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface CardRepository extends JpaRepository<Card, UUID> {

    @EntityGraph(attributePaths = {"set", "universe"})
    Optional<Card> findById(UUID id);

    @Query(
      value = """
        SELECT c.* FROM card c
        WHERE (:universeId IS NULL OR c.universe_id = :universeId)
          AND (:setId IS NULL OR c.set_id = :setId)
          AND (:rarity IS NULL OR c.rarity = :rarity)
          AND (
            :q IS NULL OR c.name ILIKE '%'||:q||'%' OR EXISTS (
              SELECT 1 FROM jsonb_each_text(c.attributes) kv WHERE kv.value ILIKE '%'||:q||'%'
            )
          )
          AND (:pwrMin IS NULL OR ((c.attributes->>'power')::int) >= :pwrMin)
        """,
      countQuery = """
        SELECT count(*) FROM card c
        WHERE (:universeId IS NULL OR c.universe_id = :universeId)
          AND (:setId IS NULL OR c.set_id = :setId)
          AND (:rarity IS NULL OR c.rarity = :rarity)
          AND (
            :q IS NULL OR c.name ILIKE '%'||:q||'%' OR EXISTS (
              SELECT 1 FROM jsonb_each_text(c.attributes) kv WHERE kv.value ILIKE '%'||:q||'%'
            )
          )
          AND (:pwrMin IS NULL OR ((c.attributes->>'power')::int) >= :pwrMin)
        """,
      nativeQuery = true
    )
    Page<Card> search(
        @Param("universeId") UUID universeId,
        @Param("setId") UUID setId,
        @Param("rarity") String rarity,
        @Param("q") String q,
        @Param("pwrMin") Integer pwrMin,
        Pageable pageable
    );
}
