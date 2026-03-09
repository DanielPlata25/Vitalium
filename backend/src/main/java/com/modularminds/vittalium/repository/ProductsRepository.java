package com.modularminds.vittalium.repository;

import com.modularminds.vittalium.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {
    //busca productos por categoria
    List<Products> findByIdCategory(Long idCategory);

    //busca productos activos
    List<Products> findByIsActive(Boolean isActive);

    //busca productos por nombre
    List<Products> findByProductNameContainingIgnoreCase(String productName);

    //busca productos activos por categoria
    List<Products> findByIdCategoryAndIsActive(Long idCategory, Boolean isActive);

    //busca productos con stock mayor a un valor
    List<Products> findByStockGreaterThan(Integer stock);
}
