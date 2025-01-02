package com.example.ieltsSyntax.Controller;

import com.example.ieltsSyntax.DTO.FeedbackDTO;
import com.example.ieltsSyntax.Service.FeedbackService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://smart-health-ui-latest.onrender.com"})
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity getAllFeedback(Authentication authentication) {
        String username = authentication.getName();
        Collection<FeedbackDTO> response = feedbackService.getAllFeedbackByUsername(username);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity createFeedback(Authentication authentication,@RequestBody CreateFeedbackRequest request) {
        String username = authentication.getName();

        FeedbackDTO response = feedbackService.createFeedback(username, request.getContent());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Getter
    public static class CreateFeedbackRequest{
        private String content;
    }

}


