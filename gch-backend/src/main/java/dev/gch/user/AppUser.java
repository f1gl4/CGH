package dev.gch.user;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;
import jakarta.persistence.PrePersist;

@Entity
@Table(name = "app_user")
public class AppUser {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true, length = 160)
    private String email;

    @Column(nullable = false, unique = true, length = 80)
    private String nickname;

    @Column(name = "password_hash", nullable = false, length = 200)
    private String passwordHash;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @Version
    private Integer version;

    public AppUser() {}

    public AppUser(UUID id, String email, String nickname, String passwordHash) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.passwordHash = passwordHash;
    }

    public UUID getId() { return id; }
    public String getEmail() { return email; }
    public String getNickname() { return nickname; }
    public String getPasswordHash() { return passwordHash; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public Integer getVersion() { return version; }

    public void setId(UUID id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    @PrePersist
    void prePersist() {
        if (id == null) id = UUID.randomUUID();
        if (createdAt == null) createdAt = OffsetDateTime.now();
        if (version == null) version = 0;
    }
}
