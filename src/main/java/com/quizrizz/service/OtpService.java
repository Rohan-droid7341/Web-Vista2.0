package com.quizrizz.service;

import com.quizrizz.model.OtpVerification;
import com.quizrizz.repository.OtpVerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {
    
    @Autowired
    private OtpVerificationRepository otpVerificationRepository;
    
    @Autowired
    private EmailService emailService;
    
    // OTP expiry time in minutes
    private static final int OTP_EXPIRY_MINUTES = 10;
    
    public void generateAndSendOtp(String email) {
        // Generate a 6-digit OTP
        String otp = generateOtp();
        
        // Calculate expiry time
        Date expiryDate = new Date(System.currentTimeMillis() + OTP_EXPIRY_MINUTES * 60 * 1000);
        
        // Save or update OTP in database
        Optional<OtpVerification> existingOtp = otpVerificationRepository.findByEmail(email);
        OtpVerification otpVerification;
        
        if (existingOtp.isPresent()) {
            otpVerification = existingOtp.get();
            otpVerification.setOtp(otp);
            otpVerification.setExpiryDate(expiryDate);
            otpVerification.setUsed(false);
        } else {
            otpVerification = new OtpVerification();
            otpVerification.setEmail(email);
            otpVerification.setOtp(otp);
            otpVerification.setExpiryDate(expiryDate);
            otpVerification.setUsed(false);
        }
        
        otpVerificationRepository.save(otpVerification);
        
        // Send OTP via email
        emailService.sendOtpEmail(email, otp);
    }
    
    public boolean verifyOtp(String email, String otp) {
        Optional<OtpVerification> otpVerificationOpt = otpVerificationRepository.findByEmail(email);
        
        if (otpVerificationOpt.isPresent()) {
            OtpVerification otpVerification = otpVerificationOpt.get();
            
            // Check if OTP is valid, not used, and not expired
            if (otpVerification.getOtp().equals(otp) && 
                !otpVerification.isUsed() && 
                otpVerification.getExpiryDate().after(new Date())) {
                
                // Mark OTP as used
                otpVerification.setUsed(true);
                otpVerificationRepository.save(otpVerification);
                
                return true;
            }
        }
        
        return false;
    }
    
    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}
