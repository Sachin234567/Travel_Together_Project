package com.example.backend.dto;

public class JoinedDestinationResponse {
    private String userEmail;
    private String destinationName;

    public JoinedDestinationResponse(String userEmail, String destinationName) {
        this.userEmail = userEmail;
        this.destinationName = destinationName;
    }

    // Getters and Setters
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getDestinationName() {
        return destinationName;
    }

    public void setDestinationName(String destinationName) {
        this.destinationName = destinationName;
    }
}
