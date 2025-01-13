package com.example.ieltsSyntax.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LLMApiAdvisorResponseDTO {
    String advice;
    Double confidenceLevel;
}
