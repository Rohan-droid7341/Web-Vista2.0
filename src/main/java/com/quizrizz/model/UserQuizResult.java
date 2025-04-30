package com.quizrizz.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(collection = "user_quiz_results")
public class UserQuizResult {
    @Id
    private String id;
    
    private String userId;
    private String quizId;
    private int score;
    private int totalQuestions;
    private List<UserAnswer> userAnswers;
    private Date completedAt;
    private long timeSpentInSeconds;

    // Nested UserAnswer class
    public static class UserAnswer {
        private String questionId;
        private int selectedOptionIndex;
        private boolean isCorrect;
        
        // Getters and Setters
        public String getQuestionId() {
            return questionId;
        }

        public void setQuestionId(String questionId) {
            this.questionId = questionId;
        }

        public int getSelectedOptionIndex() {
            return selectedOptionIndex;
        }

        public void setSelectedOptionIndex(int selectedOptionIndex) {
            this.selectedOptionIndex = selectedOptionIndex;
        }

        public boolean isCorrect() {
            return isCorrect;
        }

        public void setCorrect(boolean isCorrect) {
            this.isCorrect = isCorrect;
        }
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public List<UserAnswer> getUserAnswers() {
        return userAnswers;
    }

    public void setUserAnswers(List<UserAnswer> userAnswers) {
        this.userAnswers = userAnswers;
    }

    public Date getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Date completedAt) {
        this.completedAt = completedAt;
    }

    public long getTimeSpentInSeconds() {
        return timeSpentInSeconds;
    }

    public void setTimeSpentInSeconds(long timeSpentInSeconds) {
        this.timeSpentInSeconds = timeSpentInSeconds;
    }
}
