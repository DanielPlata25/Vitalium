package com.modularminds.vittalium.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id_cart", nullable = false)
    private Long idCart;

    @Column(name = "id_customer", nullable = false)
    private Long idCustomer;

    @Column(name = "id_product", nullable = false)
    private Long idProduct;

    @Column(name = "quantity",nullable = false)
    private Integer quantity;

    @Column(name = "created_at", updatable = false, unique = true)
    private LocalDateTime createdAt;
}
