package com.modularminds.vittalium.service;

import com.modularminds.vittalium.model.Category;
import com.modularminds.vittalium.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public List<Category> getActiveCategories() {
        return categoryRepository.findByIsActive(true);
    }

    @Override
    public Category createCategory(Category category) {
        if (categoryRepository.existsByCategoryNameIgnoreCase(category.getCategoryName())) {
            throw new RuntimeException("Ya existe una categoría con ese nombre");
        }
        if (category.getIsActive() == null) {
            category.setIsActive(true);
        }
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada con ID: " + id);
        }
        Optional<Category> existing = categoryRepository.findByCategoryNameIgnoreCase(category.getCategoryName());
        if (existing.isPresent() && !existing.get().getIdCategory().equals(id)) {
            throw new RuntimeException("Ya existe otra categoría con ese nombre");
        }
        category.setIdCategory(id);
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada con ID: " + id);
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public Category toggleCategoryStatus(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));
        category.setIsActive(!category.getIsActive());
        return categoryRepository.save(category);
    }
}
