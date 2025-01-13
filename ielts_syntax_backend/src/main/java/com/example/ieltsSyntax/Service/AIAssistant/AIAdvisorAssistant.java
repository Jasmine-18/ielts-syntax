package com.example.ieltsSyntax.Service.AIAssistant;


import com.example.ieltsSyntax.DTO.LLMApiAdvisorResponseDTO;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;

public interface AIAdvisorAssistant {
    @SystemMessage("""
            {{advisorTemplate}}

            Given a question, \
            formulate an advice that would be the most relevant to provide the user \
            with a knowledge base of you role, following the health profile and conversation log.
            
            You should follow the following rules when generating the advice:
              - Always prioritize the question over the conversation log.
              - Ignore any conversation log that is not directly related to the question.
              - Only attempt to answer if a question was posed.
              - The question should be at most 2 sentences.
              - Give a confidence level that determines how related is the message to your role domain expertise

              HEALTH PROFILE: {{healthProfile}}

              CONVERSATION LOG: {{conversationLog}}
            """)
    LLMApiAdvisorResponseDTO provideAdvice(@V("advisorTemplate") String advisorType,
                                           @V("healthProfile") String healthProfile,
                                           @V("conversationLog") String conversationLog,
                                           @UserMessage String message);
}
