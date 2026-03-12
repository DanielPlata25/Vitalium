package com.modularminds.vittalium.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    private String token;
    private Long userId;
    private String email;
    private Long rolId;
    private Long customerId;
    private String customerName;
    private String message;
}
