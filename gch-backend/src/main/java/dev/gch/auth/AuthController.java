package dev.gch.auth;

import dev.gch.auth.dto.AuthResponse;
import dev.gch.auth.dto.LoginRequest;
import dev.gch.auth.dto.RegisterRequest;
import dev.gch.user.AppUser;
import dev.gch.user.AppUserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final AppUserRepository users;

    public AuthController(AuthService authService, AppUserRepository users) {
        this.authService = authService;
        this.users = users;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @GetMapping("/me")
    public Map<String, Object> me(Authentication auth) {
        if (auth == null || auth.getPrincipal() == null) {
            throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        var uid = (java.util.UUID) auth.getPrincipal();
        var u = users.findById(uid).orElseThrow();
        return Map.of("id", u.getId().toString(), "email", u.getEmail(), "nickname", u.getNickname());
    }

}
