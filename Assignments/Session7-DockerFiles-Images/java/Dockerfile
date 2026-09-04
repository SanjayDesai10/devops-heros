FROM java-app:latest
WORKDIR /app
COPY Main.java .
RUN javac Main.java
EXPOSE 8080
CMD ["java", "Main"]
