
export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  category: SpecialistCategory;
  rating: number;
  distance: string;
  availability: string;
  price: string;
  photoUrl: string;
  tags: string[];
  requirements: string[]; // e.g., ["Bloodwork", "Ultrasound"]
}

export enum SpecialistCategory {
  MIND = 'Mind',
  HEART = 'Heart',
  BRAIN = 'Brain',
  EYE = 'Eye',
  BONES = 'Bones',
  GENERAL = 'General'
}

export interface Referral {
  id: string;
  studentName: string;
  studentId: string;
  specialistName: string;
  specialty: string;
  status: 'sent' | 'triage' | 'accepted' | 'declined' | 'booked';
  declineReason?: string;
  lastUpdated: string;
  hasWorkup: boolean;
  notes?: string;
  coverageType: 'OHIP' | 'Private' | 'Mixed';
}

export interface Appointment {
  id: string;
  studentName: string;
  studentId: string;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export type UserRole = 'student' | 'specialist' | 'referrer';
export type ReferralStatus = 'idle' | 'sending' | 'confirmed';
