package com.example.ieltsSyntax.Configuration;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static dev.langchain4j.model.openai.OpenAiChatModelName.GPT_4_O_MINI;

@Configuration
public class LangChainConfiguration {

    @Value("${open-ai.service.api.key}")
    private String OPEN_AI_API_KEY;

    @Value("${gemini.service.api.key}")
    private String GEMINI_API_KEY;

    @Bean
    ChatLanguageModel chatLanguageModel(){
        return OpenAiChatModel.builder()
                .apiKey(OPEN_AI_API_KEY)
                .modelName(GPT_4_O_MINI)
                .maxCompletionTokens(50)
                .build();
    }

    @Bean
    ChatLanguageModel summaryChatLanguageModel() {
        return GoogleAiGeminiChatModel.builder()
                .apiKey(GEMINI_API_KEY)
                .modelName("gemini-1.5-flash")
                .build();
    }
}
