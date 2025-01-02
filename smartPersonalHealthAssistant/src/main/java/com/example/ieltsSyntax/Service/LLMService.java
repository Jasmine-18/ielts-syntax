package com.example.ieltsSyntax.Service;

import com.example.ieltsSyntax.DTO.AIAdvisorDTO;
import com.example.ieltsSyntax.DTO.LLMApiSummaryResponseDTO;
import com.example.ieltsSyntax.Exception.CustomException;
import com.example.ieltsSyntax.Model.AIAdvisor;
import com.example.ieltsSyntax.Model.AISummary;
import com.example.ieltsSyntax.Model.AdvisorType;
import com.example.ieltsSyntax.Model.Feedback;
import com.example.ieltsSyntax.Repository.AIAdvisorRepository;
import com.example.ieltsSyntax.Repository.AISummaryRepository;
import com.example.ieltsSyntax.Service.AIAssistant.AISummaryAssistant;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.service.AiServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class LLMService {

    private static final Logger log = LoggerFactory.getLogger(LLMService.class);
    private final ChatLanguageModel chatLanguageModel;
    private final ChatLanguageModel summaryChatLanguageModel;
    private final AIAdvisorRepository aiAdvisorRepository;
    private final AISummaryRepository aiSummaryRepository;

    @Value("${use.api.key}")
    private String USE_API_KEY;
    private final int DEFAULT_SUMMARY_CHUNK_SIZE = 50;

    @Autowired
    public LLMService(
            ChatLanguageModel chatLanguageModel,
            ChatLanguageModel summaryChatLanguageModel,
            AIAdvisorRepository aiAdvisorRepository,
            AISummaryRepository aiSummaryRepository
    ) {
        this.chatLanguageModel = chatLanguageModel;
        this.summaryChatLanguageModel = summaryChatLanguageModel;
        this.aiAdvisorRepository = aiAdvisorRepository;
        this.aiSummaryRepository = aiSummaryRepository;
    }



    public String generatePromptWithInput(AdvisorType type, String healthData, String firstName, String lastName, String query) {
        AIAdvisor ai = aiAdvisorRepository.findByAgentType(type)
                .orElseThrow(()-> new CustomException("Advisor Type not found", HttpStatus.BAD_REQUEST));
        String template = ai.getTemplate();
        return String.format(template, healthData, firstName, lastName, query);
    }

    public Collection<AIAdvisorDTO> getAllAiAgent() {
        Collection<AIAdvisor> ai = aiAdvisorRepository.findAll();
        Collection<AIAdvisorDTO> aiAdvisorDTOS = new ArrayList<>();
        for (AIAdvisor aiAdvisor : ai) {
            AIAdvisorDTO dto = new AIAdvisorDTO(aiAdvisor);
            aiAdvisorDTOS.add(dto);
        }
        return aiAdvisorDTOS;
    }

    @Transactional
    public AIAdvisorDTO  getAiAgentByType(AdvisorType type) {
        AIAdvisor ai = aiAdvisorRepository.findByAgentType(type)
                .orElseThrow(()-> new CustomException("AI Advisor type not found.", HttpStatus.BAD_REQUEST));

        return new AIAdvisorDTO(ai);
    }

    public LLMApiSummaryResponseDTO getSummaryFromLLM(List<Feedback> feedbacks) {
        // Return dummy response if "use api key" is not specified to prevent reaching limit
        if (!"true".equalsIgnoreCase(USE_API_KEY)) {
            return LLMApiSummaryResponseDTO.builder()
                    .summary("""
                            * **User Experience:** Users found the chatbot sometimes struggled with understanding\s
                            their input, leading to frustration. Response times were also an issue, with users experiencing\s
                            delays in receiving answers.
                            * **Functionality:** Users appreciated the chatbot's availability for quick questions, but\s
                            expressed a desire for more frequent updates to its advice, as well as a feature to schedule\s
                            video calls with real doctors.
                            * **Content & Specificity:**  Users found the general health tips helpful, but wanted more\s
                            specific recommendations and detailed follow-up questions after providing health data. Some\s
                            users also felt the advice lacked personalization and sometimes contradicted itself.
                            * **Medical History & Data:**  Users found it difficult to input their medical history, and\s
                            the chatbot sometimes struggled to understand specific medical terms.
                            * **Additional Features:**  Users expressed a desire for more holistic wellness features\s
                            such as meditation and breathing exercises, a mood tracker, and emergency advice options.
                            * **Mental Health:**  The AI psychologist feature received positive feedback, with users\s
                            highlighting its usefulness in managing anxiety.
                            * **Overall Satisfaction:**  Despite some drawbacks, users expressed overall satisfaction\s
                            with the chatbot's ability to improve their health, particularly in managing cholesterol levels.
                            * **Coordination:** Some users reported receiving conflicting advice from different chatbot\s
                            roles, highlighting the need for better coordination between features.
                            * **Positive Impact:** Users appreciated the chatbot's convenience and its ability to provide\s
                            helpful advice, with some even stating it made their lives easier.
                            * **Improvements:** Users provided specific suggestions for improvements, including better\s
                            understanding of user input, more detailed recommendations,  a more comprehensive mood tracker,\s
                            and improved integration of medical history.
                          """)
                    .build();
        }

        if (CollectionUtils.isEmpty(feedbacks)) {
            return LLMApiSummaryResponseDTO.builder()
                    .summary(null)
                    .build();
        }

        Optional<AISummary> aiSummary = aiSummaryRepository.findByAgentType(AdvisorType.SUMMARY);

        int chunkSize = DEFAULT_SUMMARY_CHUNK_SIZE;
        if (aiSummary.isPresent()) chunkSize = aiSummary.get().getChunkSize();
        ArrayList<ArrayList<Feedback>> feedbackChunks = splitFeedbacksIntoChunks(feedbacks, chunkSize);

        AISummaryAssistant summarizer = AiServices.builder(AISummaryAssistant.class)
                .chatLanguageModel(summaryChatLanguageModel)
                .build();

        ArrayList<String> chunkSummaries = new ArrayList<>();
        try {
            List<CompletableFuture<String>> futures = new ArrayList<>();
            for (int i = 0; i < feedbackChunks.size(); i++) {
                int index = i;
                CompletableFuture<String> future = CompletableFuture
                        .supplyAsync(() -> summarizer.summarizeText(convertFeedbackListToString(feedbackChunks.get(index))));
                futures.add(future);
            }

            // Wait for all futures to complete and collect the results
            CompletableFuture<Void> allDone = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                    .thenAccept(v -> futures.forEach(f -> f.thenAccept(chunkSummaries::add)));
            allDone.get();
        } catch (ExecutionException | InterruptedException e) {
            log.error("Error getting summary");
        }

        String finalSummary;
        if (chunkSummaries.size() > 1) {
            finalSummary = summarizer.summarizeText(convertFeedbackStringListToString(chunkSummaries));
        } else {
            finalSummary = chunkSummaries.get(0);
        }

        return LLMApiSummaryResponseDTO.builder()
                .summary(finalSummary)
                .build();
    }

    private ArrayList<ArrayList<Feedback>> splitFeedbacksIntoChunks(List<Feedback> feedbacks, int chunkSize) {
        ArrayList<ArrayList<Feedback>> feedbackChunks = new ArrayList<>();

        Iterator<Feedback> it = feedbacks.iterator();
        ArrayList<Feedback> singleChunk = new ArrayList<>();
        while (it.hasNext()) {
            singleChunk.add(it.next());
            if (singleChunk.size() >= chunkSize) {
                feedbackChunks.add(singleChunk);
                singleChunk = new ArrayList<>();
            }
        }
        if (!CollectionUtils.isEmpty(singleChunk)) feedbackChunks.add(singleChunk);

        return feedbackChunks;
    }

    private String convertFeedbackListToString(List<Feedback> feedbacks) {
        StringBuilder sb = new StringBuilder();
        for (Feedback feedback : feedbacks) {
            sb.append(feedback.getContent()).append("\n\n");
        }
        return sb.toString();
    }

    private String convertFeedbackStringListToString(List<String> feedbacks) {
        StringBuilder sb = new StringBuilder();
        for (String feedback : feedbacks) {
            sb.append(feedback).append("\n\n");
        }
        return sb.toString();
    }

    private ArrayList<String> generateDummyFeedback() {
        ArrayList<String> feedbacks = new ArrayList<>();
        feedbacks.add("I love the app, thank you for making my life easier!");
        feedbacks.add("The chatbot struggled with understanding my input sometimes, which was frustrating.");
        feedbacks.add("It’s great for daily health tips, but I wish there was an option for emergency advice too.");
        feedbacks.add("It’s good overall, but I’d prefer more frequent updates to its advice as new medical guidelines come out.");
        feedbacks.add("I love how the health assistant is always available for quick questions—no waiting for appointments!");
        feedbacks.add("Sometimes, the health advice feels a bit too general. I’d like even more specific recommendations.");
        feedbacks.add("I received conflicting advice between the dietitian and the trainer roles—could use better coordination there.");
        feedbacks.add("The AI psychologist has been a great resource for dealing with my anxiety.");
        feedbacks.add("It’s helpful, but I wish I could schedule a video call with a real doctor directly through the app.");
        feedbacks.add("I wasn’t sure how to input my medical history, so it took me some time to set everything up.");
        feedbacks.add("Sometimes it took a some time to get a response from the health assistant, it's quite annoying.");
        feedbacks.add("The chatbot's recommendations helped me improve my cholesterol levels, very satisfied!");
        feedbacks.add("It would be nice to have more detailed follow-up questions after I provide my health data.");
        feedbacks.add("I like that I can log my vitals, but sometimes the system doesn’t understand specific medical terms I use.");
        feedbacks.add("It’d be nice if it had a mood tracker feature that ties into mental health advice.");
        feedbacks.add("The chatbot recognized my symptoms of stress and offered really helpful relaxation techniques.");
        feedbacks.add("I wish there were more holistic wellness features like meditation or breathing exercises.");

        return feedbacks;
    }
}
