package com.example.ieltsSyntax;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class IeltsSyntaxApplication {

	private static final Logger logger = LoggerFactory.getLogger(IeltsSyntaxApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(IeltsSyntaxApplication.class, args);
		logger.info("Ielts Syntax Application is running!");
	}

}
