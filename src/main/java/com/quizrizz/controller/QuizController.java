package com.quizrizz.controller;

import com.quizrizz.model.Quiz;
import com.quizrizz.model.UserQuizResult;
import com.quizrizz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*")
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    
    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getPublicQuizzes());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getQuizById(@PathVariable String id) {
        Optional<Quiz> quiz = quizService.getQuizById(id);
        return quiz.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<Quiz>> getQuizzesBySubject(@PathVariable String subject) {
        return ResponseEntity.ok(quizService.getQuizzesBySubject(subject));
    }
    
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<Quiz>> getQuizzesByDifficulty(@PathVariable String difficulty) {
        return ResponseEntity.ok(quizService.getQuizzesByDifficulty(difficulty));
    }
    
    @GetMapping("/subject/{subject}/difficulty/{difficulty}")
    public ResponseEntity<List<Quiz>> getQuizzesBySubjectAndDifficulty(
            @PathVariable String subject, 
            @PathVariable String difficulty) {
        return ResponseEntity.ok(quizService.getQuizzesBySubjectAndDifficulty(subject, difficulty));
    }
    
    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Quiz createdQuiz = quizService.createQuiz(quiz);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuiz);
    }
    
    @PostMapping("/results")
    public ResponseEntity<UserQuizResult> saveQuizResult(@RequestBody UserQuizResult result) {
        UserQuizResult savedResult = quizService.saveQuizResult(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedResult);
    }
    
    @GetMapping("/results/user/{userId}")
    public ResponseEntity<List<UserQuizResult>> getUserQuizResults(@PathVariable String userId) {
        return ResponseEntity.ok(quizService.getUserQuizResults(userId));
    }
    
    @GetMapping("/results/user/{userId}/quiz/{quizId}")
    public ResponseEntity<List<UserQuizResult>> getUserQuizResultsByQuiz(
            @PathVariable String userId, 
            @PathVariable String quizId) {
        return ResponseEntity.ok(quizService.getUserQuizResultsByQuiz(userId, quizId));
    }
}
