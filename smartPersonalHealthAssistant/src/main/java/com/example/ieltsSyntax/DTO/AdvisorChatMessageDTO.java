package com.example.ieltsSyntax.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class AdvisorChatMessageDTO {
    private String speaker;
    private String message;
    private LocalDateTime timestamp;
}
