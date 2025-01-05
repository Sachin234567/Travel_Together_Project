package com.example.backend.service;

import com.example.backend.model.Destination;
import com.example.backend.model.JoinedDestination;
import com.example.backend.model.User;
import com.example.backend.repository.DestinationRepository;
import com.example.backend.repository.JoinedDestinationRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JoinDestinationService {

    @Autowired
    private JoinedDestinationRepository joinedDestinationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private MailService mailService;

    // Logic to join a destination
    public String joinDestination(String email, String destinationName) {
        // Find the user by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return "User not registered. Please sign up or log in.";
        }

        // Find the destination by name
        Optional<Destination> destinationOptional = destinationRepository.findByName(destinationName);
        if (destinationOptional.isEmpty()) {
            return "Invalid destination name: " + destinationName;
        }

        // Retrieve the user and destination objects
        User user = userOptional.get();
        Destination destination = destinationOptional.get();

        // Create a new JoinedDestination object to associate the user with the
        // destination
        JoinedDestination joinedDestination = new JoinedDestination();
        joinedDestination.setUser(user);
        joinedDestination.setDestination(destination);

        // Save the joined destination
        joinedDestinationRepository.save(joinedDestination);

        // Send the confirmation email
        sendJoinEmail(user.getEmail(), destination.getName());

        return "Successfully joined the destination!";
    }

    private void sendJoinEmail(String email, String destinationName) {
        String subject = "Successfully Joined a Destination!";
        String text = "Dear User,\n\nYou have successfully joined the destination: " + destinationName + ".\n\nHappy Traveling!\n\nBest Regards,\nTravel Together Team";
        mailService.sendEmail(email, subject, text);
    }
}
