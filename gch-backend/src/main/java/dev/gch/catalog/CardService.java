package dev.gch.catalog;

import dev.gch.catalog.dto.CardDetails;
import dev.gch.catalog.dto.CardListItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CardService {
    private final CardRepository repo;

    public CardService(CardRepository repo) {
        this.repo = repo;
    }

    public Page<CardListItem> search(UUID universeId, UUID setId, String rarity, String q, Integer pwrMin, Pageable pageable) {
        return repo.search(universeId, setId, rarity, q, pwrMin, pageable)
                   .map(c -> new CardListItem(
                       c.getId(), c.getName(), c.getRarity(),
                       c.getSet().getId(), c.getUniverse().getId(),
                       c.getImageUrl(), c.getAttributes()
                   ));
    }

    public CardDetails get(UUID id) {
        var c = repo.findById(id).orElseThrow();
        return new CardDetails(
            c.getId(), c.getName(), c.getRarity(),
            c.getSet().getId(), c.getSet().getName(),
            c.getUniverse().getId(), c.getUniverse().getName(),
            c.getImageUrl(), c.getAttributes()
        );
    }
}
