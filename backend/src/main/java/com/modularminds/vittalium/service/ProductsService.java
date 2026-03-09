package com.modularminds.vittalium.service;

import com.modularminds.vittalium.model.Products;

import java.util.List;
import java.util.Optional;

public interface ProductsService {
    //obtiene todos los productos
    List<Products> getAllProducts();

    //obtiene un producto por id
    Optional<Products> getProductById(Long id);

    //obtiene productos por categoria
    List<Products> getProductsByCategory(Long idCategory);

    //obtiene solo los productos activos
    List<Products> getActiveProducts();

    //obtiene productos por nombre
    List<Products> searchProductsByName(String name);

    //crea productos nuevos
    Products createProduct(Products product);

    //actualizar un producto
    Products updateProducts(Long id, Products product);

    Products updateProduct(Long id, Products product);

    //eliminar producto
    void deleteProduct(Long id);

    //activa/desactiva productos
    Products toggleProductStatus(Long id);

    //verificar si hay stock
    boolean hasStock(Long id, Integer quantity);
}
