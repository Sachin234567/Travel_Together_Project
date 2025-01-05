package com.example.backend.controller;

import com.example.backend.model.Destination;
import com.example.backend.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DestinationController {

    @Autowired
    private DestinationService destinationService;

    @PostMapping("/add")
    public ResponseEntity<String> addDestination(@RequestBody Destination destination) {
        try {
            destinationService.addDestination(destination);
            return ResponseEntity.ok("Destination added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to add destination: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Destination>> getAllDestinations() {
        try {
            List<Destination> destinations = destinationService.getAllDestinations();
            return ResponseEntity.ok(destinations);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Search destinations by keyword
    @GetMapping("/search")
    public ResponseEntity<List<Destination>> searchDestinations(@RequestParam("keyword") String keyword) {
        try {
            List<Destination> destinations = destinationService.searchDestinations(keyword);
            return ResponseEntity.ok(destinations);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
}
