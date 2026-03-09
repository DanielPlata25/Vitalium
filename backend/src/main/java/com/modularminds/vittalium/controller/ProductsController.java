package com.modularminds.vittalium.controller;

import com.modularminds.vittalium.model.Products;
import com.modularminds.vittalium.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "*")
public class ProductsController {
    @Autowired
    private ProductsService productsService;

    //GET = obtener todos los productos
    @GetMapping
    public ResponseEntity<List<Products>> getAllProducts() {
        List<Products> products = productsService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    //GET = obtener productso por categoria
    @GetMapping("/categoria/{idCategory}")
    public ResponseEntity<List<Products>> getProductsByCategory(@PathVariable Long idCategory) {
        List<Products> products = productsService.getProductsByCategory(idCategory);
        return ResponseEntity.ok(products);
    }

    //GET = obtener solo productos activos
    @GetMapping("/activos")
    public ResponseEntity<List<Products>> getActiveProducts() {
        List<Products> products = productsService.getActiveProducts();
        return ResponseEntity.ok(products);
    }

    //GET = buscar producto por nombre
    @GetMapping("/buscar")
    public ResponseEntity<List<Products>> searchProducts(@RequestParam String nombre) {
        List<Products> products = productsService.searchProductsByName(nombre);
        return ResponseEntity.ok(products);
    }

    //controller para crear nuevo producto
    @PostMapping
    public ResponseEntity<Products> createProduct(@RequestBody Products product) {
        Products newProduct = productsService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
    }

    //PUT = actualiza un producto (por id)
    @PutMapping("/{id}")
    public ResponseEntity<Products> updateProduct(
            @PathVariable Long id,
            @RequestBody Products product) {
        try {
            Products updateProduct = productsService.updateProduct(id, product);
            return ResponseEntity.ok(updateProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //DELETE = elimina un producto (por id)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id)  {
        try {
            productsService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //PATCH = activar/desactivar un producto
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<Products> toggleProductsStatus(@PathVariable Long id) {
        try {
            Products product = productsService.toggleProductStatus(id);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/stock")
    public ResponseEntity<Boolean> checkStock(
            @PathVariable Long id,
            @RequestParam Integer cantidad) {
        try {
            boolean hasStock = productsService.hasStock(id, cantidad);
            return ResponseEntity.ok(hasStock);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

