package com.quizrizz.service;

import com.quizrizz.model.User;
import com.quizrizz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User registerUser(User user) {
        // Check if user already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        
        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Set creation and update dates
        Date now = new Date();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);
        
        // Set default values
        user.setVerified(false);
        user.setSubscriptionPlan("basic");
        
        return userRepository.save(user);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public boolean verifyPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
    
    public User updateUser(User user) {
        user.setUpdatedAt(new Date());
        return userRepository.save(user);
    }
    
    public void verifyUser(String userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setVerified(true);
            user.setUpdatedAt(new Date());
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }
    
    public void updateSubscription(String userId, String plan) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setSubscriptionPlan(plan);
            user.setUpdatedAt(new Date());
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
