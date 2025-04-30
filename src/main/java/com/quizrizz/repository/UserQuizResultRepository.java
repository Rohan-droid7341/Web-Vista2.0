package com.quizrizz.repository;

import com.quizrizz.model.UserQuizResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface UserQuizResultRepository extends MongoRepository<UserQuizResult, String> {
    List<UserQuizResult> findByUserId(String userId);
    List<UserQuizResult> findByUserIdAndQuizId(String userId, String quizId);
}
