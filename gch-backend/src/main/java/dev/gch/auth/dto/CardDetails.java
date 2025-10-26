package dev.gch.catalog.dto;

import java.util.Map;
import java.util.UUID;

public record CardDetails(
    UUID id,
    String name,
    String rarity,
    UUID setId,
    String setName,
    UUID universeId,
    String universeName,
    String imageUrl,
    Map<String, Object> attributes
) {}
