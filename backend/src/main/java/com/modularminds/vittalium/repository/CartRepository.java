package com.modularminds.vittalium.repository;

import com.modularminds.vittalium.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    //BUSCA LOS ITEMS DEL CARRITO DE UN CLIENTE
    List<Cart> findByIdCustomer(Long idCustomer);

    //VERIFICA SI YA EXISTE ESE PRODUCTO EN EL CARRITO
    Optional<Cart> findByIdCustomerAndIdProduct(
            Long idCustomer, Long idProduct
    );
}
