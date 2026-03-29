package com.carepath.dto;

import com.carepath.model.enums.ReferralStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReferralDTO {
    private UUID id;
    private ReferralStatus status;
    private String patientNotes;
    private UUID patientId;
    private String patientEmail;
    private UUID referrerId;
    private String referrerEmail;
    private UUID specialistId;
    private String specialistEmail;
    private List<DocumentDTO> documents;
    private Instant createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DocumentDTO {
        private UUID id;
        private String fileUrl;
        private String documentType;
    }
}
