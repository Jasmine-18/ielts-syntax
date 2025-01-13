package com.example.ieltsSyntax.Model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class AISummary extends AIAgent {
    private int chunkSize;
}


