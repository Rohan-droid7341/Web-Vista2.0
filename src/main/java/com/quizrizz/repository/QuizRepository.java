package com.quizrizz.repository;

import com.quizrizz.model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface QuizRepository extends MongoRepository<Quiz, String> {
    List<Quiz> findBySubject(String subject);
    List<Quiz> findByDifficulty(String difficulty);
    List<Quiz> findBySubjectAndDifficulty(String subject, String difficulty);
    List<Quiz> findByIsPublic(boolean isPublic);
}
