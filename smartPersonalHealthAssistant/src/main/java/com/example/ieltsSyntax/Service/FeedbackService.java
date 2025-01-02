package com.example.ieltsSyntax.Service;

import com.example.ieltsSyntax.DTO.FeedbackDTO;
import com.example.ieltsSyntax.DTO.FeedbackListAndSummaryDTO;
import com.example.ieltsSyntax.DTO.LLMApiSummaryResponseDTO;
import com.example.ieltsSyntax.Exception.CustomException;
import com.example.ieltsSyntax.Model.Feedback;
import com.example.ieltsSyntax.Model.User;
import com.example.ieltsSyntax.Repository.FeedbackRepository;
import com.example.ieltsSyntax.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LLMService llmService;

    @Autowired
    private FeedbackRepository feedbackRepository;

    //    1. create feedback
//    2. view feedback
//    3. tech team get feedback list
    @Transactional
    public Collection<FeedbackDTO> getAllFeedbackByUsername(String username) { // "user"
        //       1. validate the user is a registered user
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException(("User not found with username " + username), HttpStatus.UNAUTHORIZED));
//        2. get all feedback by RegisterUser
        Collection<Feedback> feedbacks = feedbackRepository.findAllByUser(user);
        List<FeedbackDTO> dtos = new ArrayList<>();
        for (Feedback feedback : feedbacks){
            dtos.add(new FeedbackDTO(feedback));
        }
        return dtos;
    }

    public FeedbackListAndSummaryDTO getFeedbackListAndSummary(String role) {

        List<Feedback> feedbacks = feedbackRepository.findAll();

        // Set Status to REVIEWED
        feedbacks.forEach(feedback -> {
            feedback.setStatus("REVIEWED");
            feedbackRepository.save(feedback);
        });

        LLMApiSummaryResponseDTO summary = llmService.getSummaryFromLLM(feedbacks);

        return FeedbackListAndSummaryDTO.builder()
                .feedbacks(feedbacks.stream()
                        .map(FeedbackDTO::new)
                        .collect(Collectors.toCollection(ArrayList::new)))
                .summary(summary.getSummary())
                .build();
    }

    @Transactional
    public FeedbackDTO createFeedback(String username, String content) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException(("User not found with username " + username), HttpStatus.UNAUTHORIZED));

        Feedback feedback = new Feedback();
        feedback.setContent(content);
        feedback.setTimestamp(LocalDateTime.now());
        feedback.setUser(user);
        feedback.setStatus("SUBMITTED");

        feedbackRepository.save(feedback);

        return new FeedbackDTO(feedback);

    }


}
