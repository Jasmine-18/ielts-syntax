package com.example.ieltsSyntax.Service.AIAssistant;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;

public interface AISummaryAssistant {
    @SystemMessage("""
            You are a helpful AI assistant.
            You are an AI assistant that helps to summarize information.
            You should provide a concise summary in strictly NO MORE \s
            than 10 BULLET POINT, grouping relevant context in one.
            The summary format should be in PLAIN TEXT WITHOUT FORMATTING.
            The text that you will need to summarize is a compilation \s
            of user feedbacks for a health assistant chatbot.
           """)
    @UserMessage("""
            Please provide a summary in PLAIN TEXT WITHOUT FORMATTING \s
            for the following text
                TEXT:
                {{content}}
           """)
    String summarizeText(@V("content") String content);
}
