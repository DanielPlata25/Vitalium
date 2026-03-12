package com.modularminds.vittalium.service;

import com.modularminds.vittalium.model.User;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUser();

    Optional<User> getUserById(Long id);

    Optional<User> getUserByEmail(String email);

    User changeUserRole(Long userId, Long newRolId);
    
    void updatePasswordByEmail(String email, String newPassword);

    void deleteUser(Long userId);

    Boolean existsById(Long userId);
}
