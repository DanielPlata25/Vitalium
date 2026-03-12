package com.modularminds.vittalium.controller;

import com.modularminds.vittalium.dto.AuthResponseDTO;
import com.modularminds.vittalium.dto.LoginDTO;
import com.modularminds.vittalium.dto.RegisterDTO;
import com.modularminds.vittalium.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

import com.modularminds.vittalium.service.GoogleTokenVerifier;  // ← NUEVO
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;  // ← NUEVO


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private GoogleTokenVerifier googleTokenVerifier;  // ← NUEVO

    // POST - Registro de usuario
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {
        try {
            AuthResponseDTO response = authService.register(registerDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // POST - Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            AuthResponseDTO response = authService.login(loginDTO);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    // POST - Login/Registro con Google
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");

            if (token == null || token.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Token no proporcionado"));
            }

            // Verificar token con Google
            GoogleIdToken.Payload payload = googleTokenVerifier.verifyToken(token);

            if (payload == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token de Google inválido"));
            }

            // Procesar usuario de Google (buscar o crear)
            AuthResponseDTO response = authService.processGoogleLogin(payload);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error procesando login con Google: " + e.getMessage()));
        }
    }

    // Login/Registro con Facebook
    @PostMapping("/facebook")
    public ResponseEntity<?> facebookLogin(@RequestBody Map<String, String> request) {
        try {
            String accessToken = request.get("accessToken");

            if (accessToken == null || accessToken.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Token no proporcionado"));
            }

            // Llamar a Facebook API para obtener los datos del usuario
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://graph.facebook.com/me?fields=id,name,email&access_token=" + accessToken;

            ResponseEntity<Map> facebookResponse = restTemplate.getForEntity(url, Map.class);
            Map<String, Object> facebookData = facebookResponse.getBody();

            if (facebookData == null || facebookData.containsKey("error")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token de Facebook inválido"));
            }

            // Extraer los datos necesarios
            String facebookId = (String) facebookData.get("id");
            String nombre = (String) facebookData.get("name");
            String email = (String) facebookData.get("email");

            // Procesar con AuthService
            AuthResponseDTO response = authService.processFacebookLogin(facebookId, nombre, email);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error procesando login con Facebook: " + e.getMessage()));
        }
    }
}