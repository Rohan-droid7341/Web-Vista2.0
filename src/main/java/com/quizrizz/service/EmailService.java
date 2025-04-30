package com.quizrizz.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your QuizRizz OTP");
        message.setText("Your OTP for QuizRizz is: " + otp + "\nThis OTP is valid for 10 minutes.");
        
        mailSender.send(message);
    }
    
    public void sendWelcomeEmail(String to, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Welcome to QuizRizz!");
        message.setText("Hi " + name + ",\n\nWelcome to QuizRizz! We're excited to have you on board.\n\nStart exploring our quizzes and enhance your knowledge today!\n\nBest regards,\nThe QuizRizz Team");
        
        mailSender.send(message);
    }
}
