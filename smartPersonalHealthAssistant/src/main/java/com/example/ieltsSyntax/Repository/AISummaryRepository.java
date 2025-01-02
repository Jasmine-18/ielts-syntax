package com.example.ieltsSyntax.Repository;

import com.example.ieltsSyntax.Model.AISummary;
import com.example.ieltsSyntax.Model.AdvisorType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AISummaryRepository extends JpaRepository<AISummary, Long> {
    Optional<AISummary> findByAgentType(AdvisorType type);
}
