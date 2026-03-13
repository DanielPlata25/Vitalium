package com.modularminds.vittalium.service.impl;

import com.modularminds.vittalium.dto.ProductSearchResponseDTO;
import com.modularminds.vittalium.dto.RecommendationProductResponseDTO;
import com.modularminds.vittalium.dto.RecommendationResponseDTO;
import com.modularminds.vittalium.model.Products;
import com.modularminds.vittalium.model.Recommendation;
import com.modularminds.vittalium.model.RecommendationProduct;
import com.modularminds.vittalium.repository.ProductsRepository;
import com.modularminds.vittalium.repository.RecommendationProductRepository;
import com.modularminds.vittalium.repository.RecommendationRepository;
import com.modularminds.vittalium.service.RecommendationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    @Autowired
    private RecommendationProductRepository recommendationProductRepository;

    @Autowired
    private ProductsRepository productRepository;

    @Override
    public RecommendationResponseDTO getRecommendationByPoints(Integer points) {
        Recommendation recommendation = recommendationRepository.findByPointsAndIsActiveTrue(points)
                .orElseThrow(() -> new RuntimeException("No se encontró recomendación para el puntaje: " + points));

        List<RecommendationProduct> recommendationProducts =
                recommendationProductRepository.findByIdRecommendationOrderByDisplayOrderAsc(
                        recommendation.getIdRecommendation()
                );

        List<RecommendationProductResponseDTO> products = new ArrayList<>();

        for (RecommendationProduct rp : recommendationProducts) {
            Products product = productRepository.findById(rp.getIdProduct())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + rp.getIdProduct()));

            products.add(new RecommendationProductResponseDTO(
                    product.getIdProduct(),
                    product.getProductName(),
                    product.getDescription(),
                    product.getPrice().doubleValue(),
                    product.getImageUrl(),
                    rp.getDisplayOrder()
            ));
        }

        return new RecommendationResponseDTO(
                recommendation.getIdRecommendation(),
                recommendation.getRecommendationName(),
                recommendation.getDescription(),
                recommendation.getPoints(),
                products
        );
    }

    @Override
    public List<ProductSearchResponseDTO> searchProducts(String query) {
        List<Products> products;

        if (query == null || query.isBlank()) {
            products = productRepository.findByIsActive(true);
        } else {
            products = productRepository.findByProductNameContainingIgnoreCaseAndIsActive(query, true);
        }

        List<ProductSearchResponseDTO> response = new ArrayList<>();

        for (Products product : products) {
            response.add(new ProductSearchResponseDTO(
                    product.getIdProduct(),
                    product.getProductName(),
                    product.getDescription(),
                    product.getPrice().doubleValue(),
                    product.getImageUrl(),
                    product.getIdCategory()
            ));
        }

        return response;
    }

    @Override
    @Transactional
    public void updateRecommendationProductsByPoints(Integer points, List<Long> productIds) {
        if (productIds == null) {
            throw new RuntimeException("La lista de productos no puede ser nula");
        }

        if (productIds.size() > 3) {
            throw new RuntimeException("Solo puedes asignar máximo 3 productos por recomendación");
        }

        Recommendation recommendation = recommendationRepository.findByPointsAndIsActiveTrue(points)
                .orElseThrow(() -> new RuntimeException("No se encontró la recomendación para el puntaje: " + points));

        recommendationProductRepository.deleteAllByIdRecommendation(recommendation.getIdRecommendation());

        for (int i = 0; i < productIds.size(); i++) {
            Long productId = productIds.get(i);

            Products product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + productId));

            if (!Boolean.TRUE.equals(product.getIsActive())) {
                throw new RuntimeException("El producto con ID " + productId + " no está activo");
            }

            RecommendationProduct rp = new RecommendationProduct();
            rp.setIdRecommendation(recommendation.getIdRecommendation());
            rp.setIdProduct(productId);
            rp.setDisplayOrder(i + 1);

            recommendationProductRepository.save(rp);
        }
    }
}