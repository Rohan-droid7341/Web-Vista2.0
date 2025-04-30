package com.quizrizz.repository;

import com.quizrizz.model.OtpVerification;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface OtpVerificationRepository extends MongoRepository<OtpVerification, String> {
    Optional<OtpVerification> findByEmail(String email);
    void deleteByEmail(String email);
}
