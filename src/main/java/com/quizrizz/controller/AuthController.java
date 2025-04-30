package com.quizrizz.controller;

import com.quizrizz.model.User;
import com.quizrizz.service.UserService;
import com.quizrizz.service.OtpService;
import com.quizrizz.service.EmailService;
import com.quizrizz.dto.LoginRequest;
import com.quizrizz.dto.SignupRequest;
import com.quizrizz.dto.OtpRequest;
import com.quizrizz.dto.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private OtpService otpService;
    
    @Autowired
    private EmailService emailService;
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        try {
            User user = new User();
            user.setFullName(signupRequest.getFullName());
            user.setEmail(signupRequest.getEmail());
            user.setMobile(signupRequest.getMobile());
            user.setGender(signupRequest.getGender());
            user.setRole(signupRequest.getRole());
            user.setEducation(signupRequest.getEducation());
            user.setPassword(signupRequest.getPassword());
            
            User savedUser = userService.registerUser(user);
            
            // Send welcome email
            emailService.sendWelcomeEmail(savedUser.getEmail(), savedUser.getFullName());
            
            UserResponse response = new UserResponse(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail()
            );
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userService.findByEmail(loginRequest.getEmail());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            if (userService.verifyPassword(user, loginRequest.getPassword())) {
                UserResponse response = new UserResponse(
                    user.getId(),
                    user.getFullName(),
                    user.getEmail()
                );
                
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }
    
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody OtpRequest otpRequest) {
        try {
            // Check if user exists
            if (!userService.findByEmail(otpRequest.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            
            otpService.generateAndSendOtp(otpRequest.getEmail());
            return ResponseEntity.ok("OTP sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send OTP");
        }
    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest otpRequest) {
        boolean isValid = otpService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtp());
        
        if (isValid) {
            Optional<User> userOpt = userService.findByEmail(otpRequest.getEmail());
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                UserResponse response = new UserResponse(
                    user.getId(),
                    user.getFullName(),
                    user.getEmail()
                );
                
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
    }
}
