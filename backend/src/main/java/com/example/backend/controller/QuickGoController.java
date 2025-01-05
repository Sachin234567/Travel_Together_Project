package com.example.backend.controller;

import com.example.backend.model.QuickGoRoute;
import com.example.backend.model.User;
import com.example.backend.service.QuickGoService;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quick-go")
public class QuickGoController {

    @Autowired
    private QuickGoService quickGoService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createRoute(@RequestBody QuickGoRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        quickGoService.createRoute(userOpt.get(), request.getSrcLat(), request.getSrcLng(),
                request.getDestLat(), request.getDestLng());
        return ResponseEntity.ok("Route created successfully!");
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<QuickGoRoute>> findNearbyRoutes(
            @RequestParam double latitude, @RequestParam double longitude, @RequestParam double radius) {
        List<QuickGoRoute> routes = quickGoService.findNearbyRoutes(latitude, longitude, radius);
        return ResponseEntity.ok(routes);
    }
    public static class QuickGoRequest {
        private String email;
        private double srcLat;
        private double srcLng;
        private double destLat;
        private double destLng;
    
        // Getters and Setters
        public String getEmail() {
            return email;
        }
    
        public void setEmail(String email) {
            this.email = email;
        }
    
        public double getSrcLat() {
            return srcLat;
        }
    
        public void setSrcLat(double srcLat) {
            this.srcLat = srcLat;
        }
    
        public double getSrcLng() {
            return srcLng;
        }
    
        public void setSrcLng(double srcLng) {
            this.srcLng = srcLng;
        }
    
        public double getDestLat() {
            return destLat;
        }
    
        public void setDestLat(double destLat) {
            this.destLat = destLat;
        }
    
        public double getDestLng() {
            return destLng;
        }
    
        public void setDestLng(double destLng) {
            this.destLng = destLng;
        }
    }
    
}
