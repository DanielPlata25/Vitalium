package com.modularminds.vittalium.repository;

import com.modularminds.vittalium.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    //busca customer por id
    Optional<Customer> findByIdUser(Long idUser);

    //verifica si un customer con ese user
    Boolean existsByIdUser(Long idUser);

    //eliminar customer por id_user
    void deleteByIdUser(Long idUser);
}
