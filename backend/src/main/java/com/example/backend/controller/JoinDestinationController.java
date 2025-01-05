package com.example.backend.controller;

import com.example.backend.service.JoinDestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class JoinDestinationController {

    @Autowired
    private JoinDestinationService joinDestinationService;

    @PostMapping("/join")
    public ResponseEntity<String> joinDestination(@RequestBody JoinDestinationRequest joinDestinationRequest) {
        String email = joinDestinationRequest.getEmail();
        String destinationName = joinDestinationRequest.getDestinationName();

        String result = joinDestinationService.joinDestination(email, destinationName);

        if (result.contains("Successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    public static class JoinDestinationRequest {
        private String email;
        private String destinationName;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getDestinationName() {
            return destinationName;
        }

        public void setDestinationName(String destinationName) {
            this.destinationName = destinationName;
        }
    }
}
