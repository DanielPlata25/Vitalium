package com.modularminds.vittalium.service;

import com.modularminds.vittalium.model.Products;
import com.modularminds.vittalium.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsServiceImpl implements ProductsService {
    @Autowired
    private ProductsRepository productsRepository;

    @Override
    public List<Products> getAllProducts(){
        return productsRepository.findAll();
    }

    @Override
    public Optional<Products> getProductById(Long id){
        return productsRepository.findById(id);
    }

    @Override
    public List<Products> getProductsByCategory(Long idCategory){
        return productsRepository.findByIdCategory(idCategory);
    }

    @Override
    public List<Products> getActiveProducts(){
        return productsRepository.findByIsActive(true);
    }

    @Override
    public List<Products> searchProductsByName(String name){
        return productsRepository.findByProductNameContainingIgnoreCase(name);
    }

    @Override
    public Products createProduct(Products product){
        if (product.getStock()== null){
            product.setStock(0);
        }
        if (product.getIsActive() == null) {
            product.setIsActive(true);
        }
        return productsRepository.save(product);
    }

    @Override
    public Products updateProducts(Long id, Products product) {
        return null;
    }

    @Override
    public Products updateProduct(Long id, Products product){
        if(!productsRepository.existsById(id)){
            throw new RuntimeException("Producto no encontrado con ID: " + id);
        }
        product.setIdProduct(id);
        return productsRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id){
        if(!productsRepository.existsById(id)){
            throw new RuntimeException("Producto no encontrado con ID: " + id);
        }
        productsRepository.deleteById(id);
    }

    @Override
    public Products toggleProductStatus(Long id){
        Products product = productsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));
        product.setIsActive(!product.getIsActive());
        return productsRepository.save(product);
    }

    @Override
    public boolean hasStock(Long id, Integer quantity){
        Products product = productsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));
        return product.getStock() >= quantity;
    }
}
