package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendGreetingEmail(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Welcome to Travel Together!");
        message.setText("Dear " + name
                + ",\n\nThank you for signing up for Travel Together. We're excited to have you on board!\n\nHappy Traveling!\nTravel Together Team");

        mailSender.send(message);
    }
}