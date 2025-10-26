package dev.gch.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @Email @NotBlank String email,
        @NotBlank @Size(min = 3, max = 40) String nickname,
        @NotBlank @Size(min = 6, max = 100) String password
) {}
