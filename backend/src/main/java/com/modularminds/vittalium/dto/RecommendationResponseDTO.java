package com.modularminds.vittalium.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationResponseDTO {
    private Long idRecommendation;
    private String recommendationName;
    private String description;
    private Integer points;
    private List<RecommendationProductResponseDTO> products;
}