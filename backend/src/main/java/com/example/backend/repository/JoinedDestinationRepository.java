package com.example.backend.repository;

import com.example.backend.model.JoinedDestination;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JoinedDestinationRepository extends JpaRepository<JoinedDestination, Long> {
    @Query("SELECT jd FROM JoinedDestination jd JOIN FETCH jd.user JOIN FETCH jd.destination")
    List<JoinedDestination> findByUserId(Long userId);
}
