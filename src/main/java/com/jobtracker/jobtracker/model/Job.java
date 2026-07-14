package com.jobtracker.jobtracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
@Table(name = "job", uniqueConstraints = @UniqueConstraint(columnNames = {"company", "role"}))
@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Company name is required")
    private String company;

    @NotBlank(message = "Role is required")
    private String role;

    @NotBlank(message = "Status is required")
    private String status;

    private LocalDate dateApplied;

    @PrePersist
    protected void onCreate() {
        dateApplied = LocalDate.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getDateApplied() { return dateApplied; }
    public void setDateApplied(LocalDate dateApplied) { this.dateApplied = dateApplied; }
}