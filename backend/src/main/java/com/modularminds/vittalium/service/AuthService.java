package com.modularminds.vittalium.service;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;  // ← NUEVO
import com.modularminds.vittalium.dto.AuthResponseDTO;
import com.modularminds.vittalium.dto.LoginDTO;
import com.modularminds.vittalium.dto.RegisterDTO;
import org.springframework.scheduling.support.SimpleTriggerContext;

import java.util.Map;

public interface AuthService {
    //registrar un nuevo usuario (crea user y customer)
    //Map<String, Object> register(String email, String password, String name, String phone);
    AuthResponseDTO register(RegisterDTO registerDTO);
    //login (valida credenciales)
    //Map<String, Object> login(String email, String password);
    AuthResponseDTO login(LoginDTO loginDTO);

    // 🔴 NUEVO: Procesar login con Google
    AuthResponseDTO processGoogleLogin(GoogleIdToken.Payload payload);

    // 🔴 NUEVO: Procesar login con Facebook (AGREGAR ESTO)
    AuthResponseDTO processFacebookLogin(String facebookId, String nombre, String email);
}
