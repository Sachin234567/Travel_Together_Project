package com.example.backend.controller;

import com.example.backend.model.Message;
import com.example.backend.model.Conversation;
import com.example.backend.service.MessagingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MessagingController {

    @Autowired
    private MessagingService messagingService;

    @GetMapping("/conversations")
    public List<Conversation> getAllConversations() {
        return messagingService.getAllConversations();
    }

    @GetMapping("/conversations/{id}/messages")
    public List<Message> getMessagesByConversation(@PathVariable Long id) {
        return messagingService.getMessagesByConversation(id);
    }

    @PostMapping("/messages")
    public Message sendMessage(@RequestBody Message message) {
        // Ensure the message is linked to a conversation
        return messagingService.sendMessage(message);
    }

    @PostMapping("/conversations")
    public Conversation createConversation(@RequestBody Conversation conversation) {
        return messagingService.createConversation(conversation);
    }
}
