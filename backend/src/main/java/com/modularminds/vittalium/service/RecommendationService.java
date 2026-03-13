package com.modularminds.vittalium.service;

import com.modularminds.vittalium.dto.ProductSearchResponseDTO;
import com.modularminds.vittalium.dto.RecommendationResponseDTO;

import java.util.List;

public interface RecommendationService {
    RecommendationResponseDTO getRecommendationByPoints(Integer points);

    List<ProductSearchResponseDTO> searchProducts(String query);

    void updateRecommendationProductsByPoints(Integer points, List<Long> productIds);
}