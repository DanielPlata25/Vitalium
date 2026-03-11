package com.modularminds.vittalium.dto;

import lombok.Data;

@Data
public class RegisterDTO {
    private String email;
    private String password;
    private String name;
    private String phone;
}
