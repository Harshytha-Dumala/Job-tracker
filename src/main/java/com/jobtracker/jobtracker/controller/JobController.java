package com.jobtracker.jobtracker.controller;

import com.jobtracker.jobtracker.dto.JobDTO;
import com.jobtracker.jobtracker.exception.JobNotFoundException;
import com.jobtracker.jobtracker.model.Job;
import com.jobtracker.jobtracker.repository.JobRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    private JobDTO toDTO(Job job) {
        JobDTO dto = new JobDTO();
        dto.setId(job.getId());
        dto.setCompany(job.getCompany());
        dto.setRole(job.getRole());
        dto.setStatus(job.getStatus());
        dto.setDateApplied(job.getDateApplied());
        return dto;
    }

    private Job toEntity(JobDTO dto) {
        Job job = new Job();
        job.setCompany(dto.getCompany());
        job.setRole(dto.getRole());
        job.setStatus(dto.getStatus());
        return job;
    }

    @GetMapping
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @PostMapping
    public JobDTO addJob(@Valid @RequestBody JobDTO jobDTO) {
        Job job = toEntity(jobDTO);
        return toDTO(jobRepository.save(job));
    }

    @PutMapping("/{id}")
    public JobDTO updateJob(@PathVariable Long id, @Valid @RequestBody JobDTO jobDTO) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException(id));
        job.setCompany(jobDTO.getCompany());
        job.setRole(jobDTO.getRole());
        job.setStatus(jobDTO.getStatus());
        return toDTO(jobRepository.save(job));
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        if (!jobRepository.existsById(id)) {
            throw new JobNotFoundException(id);
        }
        jobRepository.deleteById(id);
    }
    @GetMapping("/search")
    public List<JobDTO> searchJobs(@RequestParam String company) {
        return jobRepository.findByCompanyContainingIgnoreCase(company)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }
}