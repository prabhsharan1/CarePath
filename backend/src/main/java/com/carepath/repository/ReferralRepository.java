package com.carepath.repository;

import com.carepath.model.entity.ReferralEntity;
import com.carepath.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReferralRepository extends JpaRepository<ReferralEntity, UUID> {
    
    @Query("SELECT r FROM ReferralEntity r WHERE r.referrer = :user OR r.specialist = :user")
    List<ReferralEntity> findAllByUser(@Param("user") UserEntity user);
    
    List<ReferralEntity> findByReferrer(UserEntity referrer);
    
    List<ReferralEntity> findBySpecialist(UserEntity specialist);
}
