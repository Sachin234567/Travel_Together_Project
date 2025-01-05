package com.example.backend.repository;

import com.example.backend.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
    // To find destinations where the name contains the given string,
    // case-insensitive
    List<Destination> findByNameContainingIgnoreCase(String name);

    // To find a destination exactly by its name
    Optional<Destination> findByName(String destinationName);
}
