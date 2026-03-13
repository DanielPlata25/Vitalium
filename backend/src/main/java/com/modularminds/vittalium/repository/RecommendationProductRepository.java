package com.modularminds.vittalium.repository;

import com.modularminds.vittalium.model.RecommendationProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationProductRepository extends JpaRepository<RecommendationProduct, Long> {

    List<RecommendationProduct> findByIdRecommendationOrderByDisplayOrderAsc(Long idRecommendation);

    @Modifying
    @Query("DELETE FROM RecommendationProduct rp WHERE rp.idRecommendation = :idRecommendation")
    void deleteAllByIdRecommendation(Long idRecommendation);
}