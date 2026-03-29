package com.carepath.repository;

import com.carepath.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByAuthProviderUid(String authProviderUid);
    Optional<UserEntity> findByEmail(String email);
}
