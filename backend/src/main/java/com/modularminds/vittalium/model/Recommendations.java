package com.modularminds.vittalium.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name =  "recommendation")
public class Recommendations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recommendation")
    private Long id_recommendation;

    @Column(name = "recommendation_name", nullable = false, length = 100)
    private String recommendation_name;

    @Column(name = "description", nullable = false, length = 500)
    private String description;

    @Column(name = "points", nullable = false)
    private Integer points = 0;

    @Column(name = "id_category", nullable = false)
    private Long idCategory;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

   

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
      
    }

}

 
