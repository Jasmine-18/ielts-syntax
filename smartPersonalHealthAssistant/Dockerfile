# Start with a base image that includes Java
FROM openjdk:17-jdk-slim

# Add a volume pointing to /tmp
VOLUME /tmp

# Copy the built JAR file from the build/libs directory to the Docker container
COPY build/libs/smartPersonalHealthAssistant-0.0.1-SNAPSHOT.jar /app.jar

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app.jar"]