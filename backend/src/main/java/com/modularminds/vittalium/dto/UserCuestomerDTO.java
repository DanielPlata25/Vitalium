package com.modularminds.vittalium.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCuestomerDTO {
    private Long userId;
    private String email;
    private Long rolId;
    private String rolName;
    private LocalDateTime userCreatedAt;

    private Long customerId;
    private String name;
    private String phone;
    private LocalDateTime customerCreatedAt;
}
