package com.modularminds.vittalium.service;

import com.modularminds.vittalium.config.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    //obtiene todas las categorias
    List<Category> getAllCategories();
    //obtiene una categoria por id
    Optional<Category> getCategoryById(Long id);
    //obtiene solo categorias activas
    List<Category> getActiveCategories();
    //crea nueva categoria
    Category createCategory(Category category);
    //actualiza categoria
    Category updateCategory(Long id, Category category);
    //elimina categoria
    void deleteCategory(Long id);
    //activa/desactiva categorias
    Category toggleCategoryStatus(Long id);
}
