package com.modularminds.vittalium.service.impl;

import com.modularminds.vittalium.dto.AuthResponseDTO;
import com.modularminds.vittalium.dto.LoginDTO;
import com.modularminds.vittalium.dto.RegisterDTO;
import com.modularminds.vittalium.model.Customer;
import com.modularminds.vittalium.model.Rol;
import com.modularminds.vittalium.model.User;
import com.modularminds.vittalium.repository.CustomerRepository;
import com.modularminds.vittalium.repository.RolRepository;
import com.modularminds.vittalium.repository.UserRepository;
import com.modularminds.vittalium.service.AuthService;
import com.modularminds.vittalium.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;  // ← NUEVO

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private String capitalizarNombre(String nombre) {
        if (nombre == null || nombre.isEmpty()) return nombre;

        // Convertir todo a minúsculas y capitalizar primera letra de cada palabra
        String[] palabras = nombre.toLowerCase().split(" ");
        StringBuilder resultado = new StringBuilder();

        for (String palabra : palabras) {
            if (palabra.length() > 0) {
                resultado.append(Character.toUpperCase(palabra.charAt(0)))
                        .append(palabra.substring(1))
                        .append(" ");
            }
        }

        return resultado.toString().trim();
    }


    @Override
    @Transactional
    public AuthResponseDTO register(RegisterDTO registerDTO) {
        // Validar que el email no exista
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Obtener rol "Cliente" (id_rol = 2)
        Rol rolCliente = rolRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("Rol Cliente no encontrado"));

        // Crear User con password encriptado
        User user = new User();
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword())); // ← Encriptar con BCrypt
        user.setIdRol(rolCliente.getIdRol());
        User savedUser = userRepository.save(user);

        // Crear Customer
        Customer customer = new Customer();
        customer.setName(registerDTO.getName());
        customer.setPhone(registerDTO.getPhone());
        customer.setIdUser(savedUser.getIdUser());
        Customer savedCustomer = customerRepository.save(customer);

        // Generar JWT token
        String token = jwtUtil.generateToken(
                savedUser.getIdUser(),
                savedUser.getEmail(),
                savedUser.getIdRol()
        );

        // Retornar DTO (sin password)
        return new AuthResponseDTO(
                token,
                savedUser.getIdUser(),
                savedUser.getEmail(),
                savedUser.getIdRol(),
                savedCustomer.getIdCustomer(),
                savedCustomer.getName(),
                "Usuario registrado exitosamente"
        );
    }

    @Override
    public AuthResponseDTO login(LoginDTO loginDTO) {
        // Buscar usuario por email
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        // Validar password con BCrypt
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        // Buscar customer asociado
        Customer customer = customerRepository.findByIdUser(user.getIdUser())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        // Generar JWT token
        String token = jwtUtil.generateToken(
                user.getIdUser(),
                user.getEmail(),
                user.getIdRol()
        );

        // Retornar DTO (sin password)
        return new AuthResponseDTO(
                token,
                user.getIdUser(),
                user.getEmail(),
                user.getIdRol(),
                customer.getIdCustomer(),
                customer.getName(),
                "Login exitoso"
        );
    }

    // ====================================
    // NUEVO: GOOGLE LOGIN
    // ====================================

    @Override
    @Transactional
    public AuthResponseDTO processGoogleLogin(GoogleIdToken.Payload payload) {
        String googleId = payload.getSubject();  // ID único de Google
        String email = payload.getEmail();
        String name = (String) payload.get("name");  // Nombre de Google para Customer

        // 1️⃣ Buscar por Google ID (recomendado)
        User existingUser = userRepository.findByGoogleSub(googleId).orElse(null);

        if (existingUser != null) {
            // Usuario ya existe con Google
            // Actualizar email por si cambió en Google
            existingUser.setEmail(email);
            userRepository.save(existingUser);

            // Buscar customer asociado
            Customer customer = customerRepository.findByIdUser(existingUser.getIdUser())
                    .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

            String token = jwtUtil.generateToken(
                    existingUser.getIdUser(),
                    existingUser.getEmail(),
                    existingUser.getIdRol()
            );

            return new AuthResponseDTO(
                    token,
                    existingUser.getIdUser(),
                    existingUser.getEmail(),
                    existingUser.getIdRol(),
                    customer.getIdCustomer(),
                    customer.getName(),
                    "Login con Google exitoso"
            );
        }

        // 2️⃣ Buscar por email (por si acaso)
        User userByEmail = userRepository.findByEmail(email).orElse(null);

        if (userByEmail != null) {
            // Usuario existe localmente - vincular con Google
            userByEmail.setGoogleSub(googleId);
            // Mantenemos su password por si quiere seguir usando login local
            userRepository.save(userByEmail);

            // Buscar customer asociado
            Customer customer = customerRepository.findByIdUser(userByEmail.getIdUser())
                    .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

            String token = jwtUtil.generateToken(
                    userByEmail.getIdUser(),
                    userByEmail.getEmail(),
                    userByEmail.getIdRol()
            );

            return new AuthResponseDTO(
                    token,
                    userByEmail.getIdUser(),
                    userByEmail.getEmail(),
                    userByEmail.getIdRol(),
                    customer.getIdCustomer(),
                    customer.getName(),
                    "Cuenta local vinculada con Google"
            );
        }

        // 3️⃣ Usuario completamente nuevo
        // Obtener rol "Cliente"
        Rol rolCliente = rolRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("Rol Cliente no encontrado"));

        // Crear User con datos de Google (SIN PASSWORD)
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setGoogleSub(googleId);
        newUser.setIdRol(rolCliente.getIdRol());
        // password se queda NULL para usuarios de Google
        User savedUser = userRepository.save(newUser);

        // Crear Customer con el nombre de Google
        // El teléfono lo dejamos vacío para que lo complete después
        Customer newCustomer = new Customer();
        newCustomer.setName(capitalizarNombre(name));  // Usamos el nombre de Google
        newCustomer.setPhone("");   // Teléfono vacío - el usuario lo completará después
        newCustomer.setIdUser(savedUser.getIdUser());
        Customer savedCustomer = customerRepository.save(newCustomer);

        // Generar JWT token
        String token = jwtUtil.generateToken(
                savedUser.getIdUser(),
                savedUser.getEmail(),
                savedUser.getIdRol()
        );

        return new AuthResponseDTO(
                token,
                savedUser.getIdUser(),
                savedUser.getEmail(),
                savedUser.getIdRol(),
                savedCustomer.getIdCustomer(),
                savedCustomer.getName(),
                "Registro con Google exitoso"
        );
    }
}