package com.carepath.dto;

import com.carepath.model.enums.ReferralStatus;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateReferralRequest {
    private UUID patientId;
    private UUID specialistId;
    private String patientNotes;
}
