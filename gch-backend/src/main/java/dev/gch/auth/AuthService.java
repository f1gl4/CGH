package dev.gch.auth;

import dev.gch.auth.dto.AuthResponse;
import dev.gch.auth.dto.LoginRequest;
import dev.gch.auth.dto.RegisterRequest;
import dev.gch.security.JwtService;
import dev.gch.user.AppUser;
import dev.gch.user.AppUserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {

    private final AppUserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(AppUserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public AuthResponse register(RegisterRequest req) {
        if (users.existsByEmail(req.email())) {
            throw new DataIntegrityViolationException("Email already in use");
        }
        if (users.existsByNickname(req.nickname())) {
            throw new DataIntegrityViolationException("Nickname already in use");
        }
        AppUser user = new AppUser(UUID.randomUUID(), req.email(), req.nickname(), encoder.encode(req.password()));
        users.save(user);
        return new AuthResponse(jwt.generateToken(user));
    }

    public AuthResponse login(LoginRequest req) {
        AppUser user = users.findByEmail(req.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!encoder.matches(req.password(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return new AuthResponse(jwt.generateToken(user));
    }
}
