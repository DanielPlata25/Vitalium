package com.modularminds.vittalium.repository;

import com.modularminds.vittalium.model.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    Optional<Recommendation> findByPointsAndIsActiveTrue(Integer points);
}