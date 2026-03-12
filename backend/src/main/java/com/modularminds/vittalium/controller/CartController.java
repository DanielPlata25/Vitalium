package com.modularminds.vittalium.controller;

import com.modularminds.vittalium.model.Cart;
import com.modularminds.vittalium.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api")
@AllArgsConstructor

public class CartController {

    //DEPENDENCIA
    private final CartService cartService;

    @PostMapping(path = "/cart/add")
    public ResponseEntity<Cart> addItem(
            @RequestParam Long idCustomer,
            @RequestParam Long idProduct,
            @RequestParam Integer quantity){
        return ResponseEntity.ok(cartService.addItem(idCustomer, idProduct, quantity));
    }

    //ACTUALIZAR CANTIDAD DE UN PRODUCTO
    @PostMapping("/update/{idCart}")
    public ResponseEntity<Cart> updateQuantity(
            @PathVariable Long idCart,
            @RequestParam Integer quantity){
        return ResponseEntity.ok(cartService.updateQuantity(idCart, quantity));
    }

    //ELIMINAR UN PRODUCTO DEL CARRITO
    @DeleteMapping("/item/{idCart}")
    public ResponseEntity<Void> removeItem(
            @PathVariable Long idCart){
        cartService.removeItem(idCart);
        return ResponseEntity.noContent().build();
    }

    //VARIAMOS CARRITO COMPLETO
    @DeleteMapping("/clear/{idCustomer}")
    public ResponseEntity<Void> clearCart(
            @PathVariable Long idCustomer) {
        cartService.clearCart(idCustomer);
        return ResponseEntity.noContent().build();
    }

}
