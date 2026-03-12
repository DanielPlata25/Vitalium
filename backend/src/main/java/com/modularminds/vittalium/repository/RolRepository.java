package com.modularminds.vittalium.repository;

import com.modularminds.vittalium.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
    //busca el rol por el nombre
    Optional<Rol> findByRolName(String rolName);
}
