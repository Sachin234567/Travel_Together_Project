package com.example.backend.service;

import com.example.backend.model.Destination;
import com.example.backend.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    // Add a new destination
    public Destination addDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    // Fetch all destinations
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    // Search and filter destinations
    public List<Destination> searchDestinations(String keyword) {
        return destinationRepository.findByNameContainingIgnoreCase(keyword);
    }
}
