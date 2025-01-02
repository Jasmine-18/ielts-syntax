package com.example.ieltsSyntax.Repository;

import com.example.ieltsSyntax.Model.AIAdvisor;
import com.example.ieltsSyntax.Model.AdvisorType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AIAdvisorRepository extends JpaRepository<AIAdvisor, Long> {
    Optional<AIAdvisor> findByAgentType(AdvisorType type);
}
