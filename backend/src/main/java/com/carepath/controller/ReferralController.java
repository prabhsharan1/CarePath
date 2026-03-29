package com.carepath.controller;

import com.carepath.dto.CreateReferralRequest;
import com.carepath.dto.ReferralDTO;
import com.carepath.service.ReferralService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/referrals")
@RequiredArgsConstructor
public class ReferralController {

    private final ReferralService referralService;

    @GetMapping("/my")
    public ResponseEntity<List<ReferralDTO>> getMyReferrals(@AuthenticationPrincipal Jwt jwt) {
        // The 'sub' claim in the JWT is typically the auth provider's UID
        String authProviderUid = jwt.getSubject();
        return ResponseEntity.ok(referralService.getMyReferrals(authProviderUid));
    }

    @PostMapping
    public ResponseEntity<ReferralDTO> createReferral(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody CreateReferralRequest request) {
        String authProviderUid = jwt.getSubject();
        return ResponseEntity.ok(referralService.createReferral(authProviderUid, request));
    }
}
