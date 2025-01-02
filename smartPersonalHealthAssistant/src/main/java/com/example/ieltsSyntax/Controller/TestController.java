package com.example.ieltsSyntax.Controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/api/auth")
public class TestController {

    @GetMapping("/invalidate-session")
    public String invalidateSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);  // Do not create a new session if one doesn't exist

        if (session != null) {
            String sessionId = session.getId();
            System.out.println("Invalidating session with ID: " + sessionId);
            session.invalidate();  // Manually invalidate the session
        } else {
            System.out.println("No active session found to invalidate.");
        }

        return "Session invalidated (or none existed)";

    }

    @GetMapping("/session-info")
    public String sessionInfo(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return "No active session";
        }
        return "Session ID: " + session.getId() +
                " | Creation Time: " + new Date(session.getCreationTime()) +
                " | Last Accessed Time: " + new Date(session.getLastAccessedTime());
    }
}
