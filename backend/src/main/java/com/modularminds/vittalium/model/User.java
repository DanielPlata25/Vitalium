package com.modularminds.vittalium.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long idUser;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @JsonIgnore
    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "id_rol", nullable = false)
    private Long idRol;

    // 🔴 ÚNICO CAMPO NUEVO
    @Column(name = "google_sub", unique = true, length = 100)
    private String googleSub;  // ID único de Google (NULL para usuarios locales)

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
