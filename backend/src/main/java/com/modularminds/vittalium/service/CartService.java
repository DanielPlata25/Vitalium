package com.modularminds.vittalium.service;

import com.modularminds.vittalium.model.Cart;
import com.modularminds.vittalium.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor

public class CartService   {

    //INYECCION DE DEPENDENCIAS
    private final CartRepository cartRepository;

    //AGREGA PRODUCTO AL CARRITO

    public Cart addItem(Long idCustomer, Long idProduct, Integer quantity){

        //VERIFICAMOS SI ESE PRODUCTO YA ESTA EN EL CARRITO DEL CUSTOMER
        Optional<Cart> existing = cartRepository
                .findByIdCustomerAndIdProduct(idCustomer,idProduct);

        if (existing.isPresent()){
            //AQUI SUMAMOS LA CANTIDAD
            Cart item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartRepository.save(item);
        }

        //SI NO EXISTE CREA UNA NUEVA FILA
        Cart newItem = new Cart();
        newItem.setIdCustomer(idCustomer);
        newItem.setIdProduct(idProduct);
        newItem.setQuantity(quantity);
        newItem.setCreatedAt(LocalDateTime.now());
        return cartRepository.save(newItem);
    }

    //VER TODOS LOS PRODUCTOS DEL CARRITO DE UN CLIENTE
    public List<Cart> getCartByCustomer(Long idCustomer){
        return cartRepository.findByIdCustomer(idCustomer);
    }
    //ACTUALIZAR CANTIDAD DE UN PRODUCTO
    public Cart updateQuantity(Long idCart, Integer quantity){
        Cart item = cartRepository.findById(idCart)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));
                item.setQuantity(quantity);
                return cartRepository.save(item);
    }

    //ELIMINAR UN PRODUCTO DEL CARRITO
    public void removeItem(Long idCart){
        cartRepository.deleteById(idCart);
    }

    //VACIAR CARRITO COMPLETO
    public void clearCart(Long idCustomer){
        List<Cart> items = cartRepository.findByIdCustomer(idCustomer);
        cartRepository.deleteAll(items);
    }

}
