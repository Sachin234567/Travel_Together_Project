package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username); // Assuming email is used as username

        // Check if the user is present
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }

        // Return user details with authorities if needed
        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.get().getEmail()) // Use .get() to get the User object from Optional
                .password(user.get().getPassword())
                .roles("USER") // Replace with dynamic role fetching if needed
                .build();
    }
}
