package com.modularminds.vittalium.service.impl;

import com.modularminds.vittalium.model.User;
import com.modularminds.vittalium.repository.CustomerRepository;
import com.modularminds.vittalium.repository.UserRepository;
import com.modularminds.vittalium.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User changeUserRole(Long userId, Long newRolId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID" + userId));

        if (newRolId != 1L && newRolId != 2L) {
            throw new RuntimeException("Rol inválido. Debe ser 1 (Admin) o 2 (Cliente)");
        }

        user.setIdRol(newRolId);
        return userRepository.save(user);
    }

    @Override
    public void updatePasswordByEmail(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("Usuario no encontrado con ID: " + userId);
        }

        customerRepository.deleteByIdUser(userId);
        userRepository.deleteById(userId);
    }

    @Override
    public Boolean existsById(Long userId) {
        return userRepository.existsById(userId);
    }
}