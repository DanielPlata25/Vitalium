package com.modularminds.vittalium.repository;

import com.modularminds.vittalium.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //busca usuario por email
    Optional<User> findByEmail(String email);

    //verifica si existe un email
    Boolean existsByEmail(String email);
}
