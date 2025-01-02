package com.example.ieltsSyntax.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class FeedbackListAndSummaryDTO {
    private ArrayList<FeedbackDTO> feedbacks;
    private String summary;
}
