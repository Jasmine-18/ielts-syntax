package com.example.ieltsSyntax.DTO;

import com.example.ieltsSyntax.Model.AIAdvisor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AIAdvisorDTO {
    private Long id;
    private String template;

    public AIAdvisorDTO(AIAdvisor ai) {
        this.id = ai.getId();
        this.template = ai.getTemplate();
    }
}
