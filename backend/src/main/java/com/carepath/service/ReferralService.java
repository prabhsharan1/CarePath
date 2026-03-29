package com.carepath.service;

import com.carepath.dto.CreateReferralRequest;
import com.carepath.dto.ReferralDTO;
import com.carepath.model.entity.AuditLogEntity;
import com.carepath.model.entity.ReferralEntity;
import com.carepath.model.entity.UserEntity;
import com.carepath.model.enums.ReferralStatus;
import com.carepath.repository.AuditLogRepository;
import com.carepath.repository.ReferralRepository;
import com.carepath.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReferralService {

    private final ReferralRepository referralRepository;
    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;

    @Transactional(readOnly = true)
    public List<ReferralDTO> getMyReferrals(String authProviderUid) {
        UserEntity user = userRepository.findByAuthProviderUid(authProviderUid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<ReferralEntity> referrals;
        if (user.getRole().name().equals("STUDENT")) {
            referrals = referralRepository.findAll().stream()
                    .filter(r -> r.getPatient().getId().equals(user.getId()))
                    .collect(Collectors.toList());
        } else {
            referrals = referralRepository.findAllByUser(user);
        }

        // Audit the view action
        auditLogRepository.save(AuditLogEntity.builder()
                .userId(authProviderUid)
                .action("LIST_REFERRALS")
                .details("User listed their referrals")
                .build());

        return referrals.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public ReferralDTO createReferral(String authProviderUid, CreateReferralRequest request) {
        UserEntity referrer = userRepository.findByAuthProviderUid(authProviderUid)
                .orElseThrow(() -> new RuntimeException("Referrer not found"));

        UserEntity patient = userRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        UserEntity specialist = userRepository.findById(request.getSpecialistId())
                .orElseThrow(() -> new RuntimeException("Specialist not found"));

        ReferralEntity referral = ReferralEntity.builder()
                .status(ReferralStatus.PENDING)
                .patientNotes(request.getPatientNotes())
                .patient(patient)
                .referrer(referrer)
                .specialist(specialist)
                .build();

        ReferralEntity saved = referralRepository.save(referral);

        // Audit the creation
        auditLogRepository.save(AuditLogEntity.builder()
                .userId(authProviderUid)
                .action("CREATE_REFERRAL")
                .resourceId(saved.getId().toString())
                .details("New referral created for patient: " + patient.getEmail())
                .build());

        return convertToDTO(saved);
    }

    private ReferralDTO convertToDTO(ReferralEntity entity) {
        return ReferralDTO.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .patientNotes(entity.getPatientNotes())
                .patientId(entity.getPatient().getId())
                .patientEmail(entity.getPatient().getEmail())
                .referrerId(entity.getReferrer().getId())
                .referrerEmail(entity.getReferrer().getEmail())
                .specialistId(entity.getSpecialist().getId())
                .specialistEmail(entity.getSpecialist().getEmail())
                .createdAt(entity.getCreatedAt())
                .documents(entity.getDocuments() != null ? entity.getDocuments().stream()
                        .map(doc -> ReferralDTO.DocumentDTO.builder()
                                .id(doc.getId())
                                .fileUrl(doc.getFileUrl())
                                .documentType(doc.getDocumentType().name())
                                .build())
                        .collect(Collectors.toList()) : List.of())
                .build();
    }
}
