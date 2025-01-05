package com.example.backend.service;

import com.example.backend.model.QuickGoRoute;
import com.example.backend.model.User;
import com.example.backend.repository.QuickGoRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuickGoService {

    @Autowired
    private QuickGoRouteRepository quickGoRouteRepository;

    public List<QuickGoRoute> findNearbyRoutes(double latitude, double longitude, double radius) {
        return quickGoRouteRepository.findNearbyRoutes(latitude, longitude, radius);
    }

    public QuickGoRoute createRoute(User user, double srcLat, double srcLng, double destLat, double destLng) {
        QuickGoRoute route = new QuickGoRoute();
        route.setUser(user);
        route.setSourceLatitude(srcLat);
        route.setSourceLongitude(srcLng);
        route.setDestinationLatitude(destLat);
        route.setDestinationLongitude(destLng);
        route.setActive(true);
        return quickGoRouteRepository.save(route);
    }
}
