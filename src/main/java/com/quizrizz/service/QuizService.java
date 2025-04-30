package com.quizrizz.service;

import com.quizrizz.model.Quiz;
import com.quizrizz.model.UserQuizResult;
import com.quizrizz.repository.QuizRepository;
import com.quizrizz.repository.UserQuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
    
    @Autowired
    private QuizRepository quizRepository;
    
    @Autowired
    private UserQuizResultRepository userQuizResultRepository;
    
    public Quiz createQuiz(Quiz quiz) {
        Date now = new Date();
        quiz.setCreatedAt(now);
        quiz.setUpdatedAt(now);
        return quizRepository.save(quiz);
    }
    
    public Optional<Quiz> getQuizById(String id) {
        return quizRepository.findById(id);
    }
    
    public List<Quiz> getQuizzesBySubject(String subject) {
        return quizRepository.findBySubject(subject);
    }
    
    public List<Quiz> getQuizzesByDifficulty(String difficulty) {
        return quizRepository.findByDifficulty(difficulty);
    }
    
    public List<Quiz> getQuizzesBySubjectAndDifficulty(String subject, String difficulty) {
        return quizRepository.findBySubjectAndDifficulty(subject, difficulty);
    }
    
    public List<Quiz> getPublicQuizzes() {
        return quizRepository.findByIsPublic(true);
    }
    
    public UserQuizResult saveQuizResult(UserQuizResult result) {
        result.setCompletedAt(new Date());
        return userQuizResultRepository.save(result);
    }
    
    public List<UserQuizResult> getUserQuizResults(String userId) {
        return userQuizResultRepository.findByUserId(userId);
    }
    
    public List<UserQuizResult> getUserQuizResultsByQuiz(String userId, String quizId) {
        return userQuizResultRepository.findByUserIdAndQuizId(userId, quizId);
    }
}
