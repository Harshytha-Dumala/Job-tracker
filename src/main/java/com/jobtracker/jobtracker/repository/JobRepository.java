package com.jobtracker.jobtracker.repository;

import com.jobtracker.jobtracker.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCompanyContainingIgnoreCase(String company);
}