package com.repository;

import java.util.*;
import com.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);  // 🔥 Add this
    boolean existsByEmail(String email);
}
