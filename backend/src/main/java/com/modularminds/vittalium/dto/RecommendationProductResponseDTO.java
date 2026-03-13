package com.modularminds.vittalium.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationProductResponseDTO {
    private Long idProduct;
    private String productName;
    private String description;
    private Double price;
    private String imageUrl;
    private Integer displayOrder;
}