package com.example.ieltsSyntax.DTO;

import com.example.ieltsSyntax.Model.Feedback;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class FeedbackDTO {
    private Long id;
    private LocalDateTime timestamp;
    private String content;
    private String status;

    public FeedbackDTO() {}

    public FeedbackDTO(Long id, LocalDateTime timestamp, String content, String status) {
        this.id = id;
        this.timestamp = timestamp;
        this.content = content;
        this.status = status;
    }

    public FeedbackDTO(Feedback entity) {
        this.id = entity.getId();
        this.content = entity.getContent();
        this.timestamp = entity.getTimestamp();
        this.status = entity.getStatus();
    }
}
