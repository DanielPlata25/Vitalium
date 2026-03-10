package com.modularminds.vittalium.repository;

import com.modularminds.vittalium.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    //Buscar categorias activas
    List<Category> findByIsActive(Boolean isActive);
    //Buscar por nombre
    Optional<Category> findByCategoryNameIgnoreCase(String categoryName);
    //verificar si existe por un nombre
    Boolean existsByCategoryNameIgnoreCase(String categoryName);
}
