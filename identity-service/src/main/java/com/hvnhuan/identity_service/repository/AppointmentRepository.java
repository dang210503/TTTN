package com.hvnhuan.identity_service.repository;

import com.hvnhuan.identity_service.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, String> {
    boolean existsByTitle(String title);
}
