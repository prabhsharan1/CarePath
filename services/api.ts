/**
 * CarePath API Service
 * Handles communication between the React frontend and the Spring Boot backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export interface Referral {
  id: string;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
  patientNotes: string;
  patientId: string;
  patientEmail: string;
  referrerId: string;
  referrerEmail: string;
  specialistId: string;
  specialistEmail: string;
  createdAt: string;
  documents: Array<{
    id: string;
    fileUrl: string;
    documentType: string;
  }>;
}

export const referralApi = {
  /**
   * Fetches referrals for the currently authenticated user.
   * @param token The JWT from Firebase/Auth0
   */
  async getMyReferrals(token: string): Promise<Referral[]> {
    const response = await fetch(`${API_BASE_URL}/referrals/my`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch referrals');
    }

    return response.json();
  },

  /**
   * Creates a new referral.
   * @param token The JWT from Firebase/Auth0
   * @param data The referral data
   */
  async createReferral(token: string, data: {
    patientId: string;
    specialistId: string;
    patientNotes: string;
  }): Promise<Referral> {
    const response = await fetch(`${API_BASE_URL}/referrals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create referral');
    }

    return response.json();
  }
};
