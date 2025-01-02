package com.example.ieltsSyntax.Model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AIAdvisor extends AIAgent {

    @Basic(fetch = FetchType.EAGER)
    @Column(columnDefinition = "TEXT")
    private String template;

    public AIAdvisor(AdvisorType agentType, String template) {
        super(agentType);
        this.template = template;
    }
}

