package com.example.ieltsSyntax.Service;

import com.example.ieltsSyntax.Model.ResetToken;
import com.example.ieltsSyntax.Model.User;
import com.example.ieltsSyntax.Repository.ResetTokenRepository;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private Configuration freemarkerConfig;

    @Autowired
    private ResetTokenRepository resetTokenRepository;

    private static final int EXPIRATION_MINUTES = 15;

    @Value("${reset.base.url}")
    private String resetBaseUrl;

    public String sendPasswordRecoveryEmail(User user, Map<String, Object> model) throws MessagingException, IOException, TemplateException {
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES);
        ResetToken resetToken = new ResetToken(token, expiryDate, user);
        resetTokenRepository.save(resetToken);

        String resetLink = resetBaseUrl+"/reset?token="+resetToken.getToken();

        model.put("resetLink", resetLink);

        // Create a MIME message
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, "UTF-8");

        // Load the FreeMarker template
        Template template = freemarkerConfig.getTemplate("recover_email_template.ftl");

        // Merge the model with the template into a string
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);

        // Set the email properties
        helper.setTo(user.getEmail());
        helper.setSubject("Smart Personal Health Assistant Password Recovery");
        helper.setText(html, true); // true = isHtml

        // Send the email
        mailSender.send(mimeMessage);

        System.out.println("Email sent successfully to "+ user.getEmail());

        return resetLink;
    }
}
