package com.modularminds.vittalium.controller;

import com.modularminds.vittalium.dto.RecommendationResponseDTO;
import com.modularminds.vittalium.dto.UpdateRecommendationProductsDTO;
import com.modularminds.vittalium.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/by-points")
    public ResponseEntity<RecommendationResponseDTO> getRecommendationByPoints(@RequestParam Integer points) {
        RecommendationResponseDTO response = recommendationService.getRecommendationByPoints(points);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/by-points/{points}/products")
    public ResponseEntity<?> updateRecommendationProductsByPoints(
            @PathVariable Integer points,
            @RequestBody UpdateRecommendationProductsDTO request
    ) {
        try {
            recommendationService.updateRecommendationProductsByPoints(points, request.getProductIds());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Productos asignados correctamente");
            response.put("points", points);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}