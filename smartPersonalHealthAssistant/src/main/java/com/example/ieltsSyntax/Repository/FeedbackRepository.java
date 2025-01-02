package com.example.ieltsSyntax.Repository;

import com.example.ieltsSyntax.Model.Feedback;
import com.example.ieltsSyntax.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Collection<Feedback> findAllByUser(User user);
}
