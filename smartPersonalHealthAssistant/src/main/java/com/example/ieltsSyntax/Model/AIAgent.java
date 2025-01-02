package com.example.ieltsSyntax.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Version;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AIAgent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(unique=true)
    private AdvisorType agentType;

    @Version
    private Integer version;

    public AIAgent(AdvisorType agentType) {
        this.agentType = agentType;
    }
}

