package dev.gch.catalog.dto;

import java.util.Map;
import java.util.UUID;

public record CardListItem(
    UUID id,
    String name,
    String rarity,
    UUID setId,
    UUID universeId,
    String imageUrl,
    Map<String, Object> attributes
) {}
