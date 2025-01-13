package com.example.ieltsSyntax.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class LLMApiSummaryResponseDTO {
    String summary;
}
