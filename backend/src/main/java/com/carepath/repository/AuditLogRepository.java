package com.carepath.repository;

import com.carepath.model.entity.AuditLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLogEntity, UUID> {
    List<AuditLogEntity> findByUserId(String userId);
    List<AuditLogEntity> findByResourceId(String resourceId);
}
