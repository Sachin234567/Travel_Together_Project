package com.example.backend.service;

import com.example.backend.model.Message;
import com.example.backend.model.Conversation;
import com.example.backend.repository.MessageRepository;
import com.example.backend.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessagingService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    // Fetch all conversations
    public List<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }

    // Fetch messages by conversation ID
    public List<Message> getMessagesByConversation(Long conversationId) {
        return messageRepository.findByConversationId(conversationId);
    }

    // Save a new message
    public Message sendMessage(Message message) {
        // Ensure the conversation exists and associate the message with it
        Conversation conversation = conversationRepository.findById(message.getConversation().getId())
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        message.setConversation(conversation);
        message.setTimestamp(java.time.LocalDateTime.now()); // Add timestamp
        return messageRepository.save(message);
    }

    // Create a new conversation if necessary
    public Conversation createConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }
}
