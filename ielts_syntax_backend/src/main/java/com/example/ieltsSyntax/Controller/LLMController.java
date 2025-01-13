package com.example.ieltsSyntax.Controller;

import com.example.ieltsSyntax.DTO.AIAdvisorDTO;
import com.example.ieltsSyntax.Model.AdvisorType;
import com.example.ieltsSyntax.Service.LLMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/auth/llm")
public class LLMController {

    @Autowired
    private LLMService llmService;

    @PostMapping
//    public AIAdvisorDTO savePrompt(@RequestBody AddAdvisorRequest request) {
//        return llmService.addAdvisor(request.getType(), request.getTemplate());
//    }

    @GetMapping
    public Collection<AIAdvisorDTO> getAllAiAgent() {
        return llmService.getAllAiAgent();
    }

    @GetMapping("/agent")
    public AIAdvisorDTO getAiAgent(@RequestParam AdvisorType type){
        return llmService.getAiAgentByType(type);
    }
}