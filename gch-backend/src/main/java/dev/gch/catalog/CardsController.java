package dev.gch.catalog;

import dev.gch.catalog.dto.CardDetails;
import dev.gch.catalog.dto.CardListItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(path = "/api/cards", produces = MediaType.APPLICATION_JSON_VALUE)
public class CardsController {

    private final CardService service;

    public CardsController(CardService service) {
        this.service = service;
    }

    @GetMapping
    public Page<CardListItem> find(
            @RequestParam(required = false) UUID universeId,
            @RequestParam(required = false) UUID setId,
            @RequestParam(required = false) String rarity,
            @RequestParam(required = false) String q,
            // name as in SPEC: attr.power.gte
            @RequestParam(name = "attr.power.gte", required = false) Integer pwrMin,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return service.search(universeId, setId, rarity, q, pwrMin, pageable);
    }

    @GetMapping("/{id}")
    public CardDetails get(@PathVariable UUID id) {
        return service.get(id);
    }
}
