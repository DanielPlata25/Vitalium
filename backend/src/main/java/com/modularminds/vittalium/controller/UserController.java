package com.modularminds.vittalium.controller;

import com.modularminds.vittalium.dto.UserCuestomerDTO;
import com.modularminds.vittalium.model.Customer;
import com.modularminds.vittalium.model.Rol;
import com.modularminds.vittalium.model.User;
import com.modularminds.vittalium.repository.CustomerRepository;
import com.modularminds.vittalium.repository.RolRepository;
import com.modularminds.vittalium.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RolRepository rolRepository;

    @GetMapping
    public ResponseEntity<List<UserCuestomerDTO>> getAllUsers() {
        List<User> users = userService.getAllUser();
        List<UserCuestomerDTO> response = new ArrayList<>();

        for (User user : users) {
            Customer customer = customerRepository.findByIdUser(user.getIdUser()).orElse(null);
            Rol rol = rolRepository.findById(user.getIdRol()).orElse(null);

            UserCuestomerDTO dto = new UserCuestomerDTO();
            dto.setUserId(user.getIdUser());
            dto.setEmail(user.getEmail());
            dto.setRolId(user.getIdRol());
            dto.setRolName(rol != null ? rol.getRolName() : "Desconocido");
            dto.setUserCreatedAt(user.getCreatedAt());

            if (customer != null) {
                dto.setCustomerId(customer.getIdCustomer());
                dto.setName(customer.getName());
                dto.setPhone(customer.getPhone());
                dto.setCustomerCreatedAt(customer.getCreatedAt());
            }

            response.add(dto);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserCuestomerDTO> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Customer customer = customerRepository.findByIdUser(user.getIdUser()).orElse(null);
        Rol rol = rolRepository.findById(user.getIdRol()).orElse(null);

        UserCuestomerDTO dto = new UserCuestomerDTO();
        dto.setUserId(user.getIdUser());
        dto.setEmail(user.getEmail());
        dto.setRolId(user.getIdRol());
        dto.setRolName(rol != null ? rol.getRolName() : "Desconocido");
        dto.setUserCreatedAt(user.getCreatedAt());

        if (customer != null) {
            dto.setCustomerId(customer.getIdCustomer());
            dto.setName(customer.getName());
            dto.setPhone(customer.getPhone());
            dto.setCustomerCreatedAt(customer.getCreatedAt());
        }

        return ResponseEntity.ok(dto);
    }


    @PatchMapping("/{userId}/role")
    public ResponseEntity<?> changeUserRole(
            @PathVariable Long userId,
            @RequestParam Long rolId) {
        try {
            User updatedUser = userService.changeUserRole(userId, rolId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Rol actualizado exitosamente");
            response.put("userId", updatedUser.getIdUser());
            response.put("newRolId", updatedUser.getIdRol());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            String newPassword = body.get("newPassword");

            if (email == null || email.isBlank()) {
                throw new RuntimeException("El correo es obligatorio");
            }

            if (newPassword == null || newPassword.isBlank()) {
                throw new RuntimeException("La nueva contraseña es obligatoria");
            }

            userService.updatePasswordByEmail(email, newPassword);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Contraseña actualizada correctamente");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    @GetMapping("/exists-by-email")
    public ResponseEntity<?> existsByEmail(@RequestParam String email) {
        try {
            boolean exists = userService.getUserByEmail(email).isPresent();

            Map<String, Object> response = new HashMap<>();
            response.put("exists", exists);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Usuario eliminado exitosamente");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
