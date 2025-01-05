package com.example.backend.repository;

import com.example.backend.model.QuickGoRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuickGoRouteRepository extends JpaRepository<QuickGoRoute, Long> {
    @Query(value = "SELECT q FROM QuickGoRoute q WHERE q.active = true AND " +
            "FUNCTION('distance', :latitude, :longitude, q.sourceLatitude, q.sourceLongitude) <= :radius")
    List<QuickGoRoute> findNearbyRoutes(double latitude, double longitude, double radius);
}
