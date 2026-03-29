
import { Specialist, SpecialistCategory, Appointment, Referral } from './types';

export const SPECIALISTS: Specialist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Clinical Psychologist',
    category: SpecialistCategory.MIND,
    rating: 4.5,
    distance: '12 min walk',
    availability: 'Next week',
    price: '$110',
    photoUrl: 'https://picsum.photos/seed/doc1/200/200',
    tags: ['Anxiety', 'Depression', 'Student Discount'],
    requirements: ['Initial Assessment Form', 'UW Physician Note']
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    specialty: 'Orthopedic Specialist',
    category: SpecialistCategory.BONES,
    rating: 4.8,
    distance: '15 min bus',
    availability: 'Tomorrow',
    price: '$95',
    photoUrl: 'https://picsum.photos/seed/doc2/200/200',
    tags: ['Sports Injuries', 'Physio'],
    requirements: ['X-Ray/Ultrasound', 'Physician Referral']
  },
  {
    id: '3',
    name: 'Dr. Priya Patel',
    specialty: 'Endocrinologist',
    category: SpecialistCategory.HEART,
    rating: 4.9,
    distance: '20 min drive',
    availability: 'Today',
    price: '$0 (OHIP)',
    photoUrl: 'https://picsum.photos/seed/doc3/200/200',
    tags: ['Consultation', 'Thyroid'],
    requirements: ['TSH Bloodwork', '6-month history']
  }
];

export const MOCK_REFERRALS: Referral[] = [
  {
    id: 'ref-1',
    studentName: 'Aisha Rahman',
    studentId: '20984431',
    specialistName: 'Dr. Priya Patel',
    specialty: 'Endocrinology',
    status: 'triage',
    lastUpdated: '2 days ago',
    hasWorkup: true,
    notes: 'Awaiting doctor review of bloodwork.',
    coverageType: 'OHIP'
  },
  {
    id: 'ref-2',
    studentName: 'Aisha Rahman',
    studentId: '20984431',
    specialistName: 'Dr. James Chen',
    specialty: 'Orthopedics',
    status: 'declined',
    declineReason: 'Missing recent X-ray documentation. Specialist requires imaging from within 6 months.',
    lastUpdated: '5 hours ago',
    hasWorkup: false,
    coverageType: 'Private'
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    studentName: 'Justin Li',
    studentId: '20874421',
    time: '09:00 AM',
    type: 'Mental Health Assessment',
    status: 'confirmed'
  }
];
