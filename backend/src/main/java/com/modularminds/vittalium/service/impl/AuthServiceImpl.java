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
}