package com.modularminds.vittalium.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class ConexionController {
    @Autowired
    private DataSource dataSource;

    @GetMapping //ruta http://localhost:8080/api/test
    public Map<String, String> testDB(){
        Map<String, String> response = new HashMap<>();

        try (Connection conn = dataSource.getConnection()){
            response.put("status", "Exito");
            response.put("message", "Conexión exitosa");
        } catch (Exception e) {
            response.put("status", "Error");
            response.put("message", "Error de conexión" + e.getMessage());
        }
        return response;
    }
    @GetMapping("/ping")    //ruta http://localhost:8080/api/test/ping
    public Map<String, String> ping() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "Exito");
        response.put("message", "Backend funcionando");
        return response;
    }
}
