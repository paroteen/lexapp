export type Lawyer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  barNumber: string;
  location: string;
  expertise: string[];
  yearsOfExperience: number;
  rating: number;
  reviewCount: number;
  bio: string;
  verified: boolean;
  photoUrl: string;
  availability: {
    day: string;
    slots: string[];
  }[];
};

export const EXPERTISE_OPTIONS = [
  'Family Law',
  'Corporate Law',
  'Criminal Law',
  'Land Law',
  'Business Law',
  'Labor Law',
  'Tax Law',
  'Immigration Law',
];

export const LOCATIONS = [
  'Kigali',
  'Gasabo',
  'Kicukiro',
  'Nyarugenge',
  'Huye',
  'Musanze',
  'Rubavu',
  'Rusizi',
];

export const mockLawyers: Lawyer[] = [
  {
    id: '1',
    fullName: 'Marie Uwamahoro',
    email: 'marie.uwamahoro@lexrwanda.com',
    phone: '+250 788 123 456',
    barNumber: 'BAR-2015-001',
    location: 'Kigali',
    expertise: ['Family Law', 'Criminal Law'],
    yearsOfExperience: 8,
    rating: 4.8,
    reviewCount: 45,
    bio: 'Experienced lawyer specializing in family and criminal law. Dedicated to providing comprehensive legal support to families and individuals.',
    verified: true,
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    availability: [
      { day: 'Monday', slots: ['09:00', '10:00', '14:00', '15:00'] },
      { day: 'Wednesday', slots: ['09:00', '11:00', '14:00'] },
      { day: 'Friday', slots: ['10:00', '14:00', '16:00'] },
    ],
  },
  {
    id: '2',
    fullName: 'Jean Claude Nkunda',
    email: 'jc.nkunda@lexrwanda.com',
    phone: '+250 788 234 567',
    barNumber: 'BAR-2012-045',
    location: 'Gasabo',
    expertise: ['Corporate Law', 'Business Law'],
    yearsOfExperience: 12,
    rating: 4.9,
    reviewCount: 67,
    bio: 'Corporate lawyer with extensive experience in business formations, contracts, and commercial litigation.',
    verified: true,
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    availability: [
      { day: 'Tuesday', slots: ['09:00', '10:00', '11:00'] },
      { day: 'Thursday', slots: ['14:00', '15:00', '16:00'] },
      { day: 'Saturday', slots: ['10:00', '11:00'] },
    ],
  },
  {
    id: '3',
    fullName: 'Grace Mukamana',
    email: 'grace.mukamana@lexrwanda.com',
    phone: '+250 788 345 678',
    barNumber: 'BAR-2018-089',
    location: 'Kicukiro',
    expertise: ['Land Law', 'Criminal Law'],
    yearsOfExperience: 5,
    rating: 4.7,
    reviewCount: 32,
    bio: 'Specializing in land disputes and property rights. Committed to protecting client interests in complex land matters.',
    verified: true,
    photoUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
    availability: [
      { day: 'Monday', slots: ['10:00', '11:00', '15:00'] },
      { day: 'Wednesday', slots: ['09:00', '10:00', '14:00', '15:00'] },
      { day: 'Friday', slots: ['09:00', '10:00'] },
    ],
  },
  {
    id: '4',
    fullName: 'Patrick Habimana',
    email: 'patrick.habimana@lexrwanda.com',
    phone: '+250 788 456 789',
    barNumber: 'BAR-2010-023',
    location: 'Nyarugenge',
    expertise: ['Labor Law', 'Tax Law'],
    yearsOfExperience: 14,
    rating: 4.9,
    reviewCount: 89,
    bio: 'Expert in employment law and taxation. Helping businesses and individuals navigate complex labor and tax regulations.',
    verified: true,
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    availability: [
      { day: 'Monday', slots: ['09:00', '14:00'] },
      { day: 'Tuesday', slots: ['10:00', '11:00', '14:00', '15:00'] },
      { day: 'Thursday', slots: ['09:00', '10:00', '14:00'] },
    ],
  },
  {
    id: '5',
    fullName: 'Esther Mutesi',
    email: 'esther.mutesi@lexrwanda.com',
    phone: '+250 788 567 890',
    barNumber: 'BAR-2016-056',
    location: 'Huye',
    expertise: ['Family Law', 'Immigration Law'],
    yearsOfExperience: 7,
    rating: 4.8,
    reviewCount: 54,
    bio: 'Passionate about helping families and individuals with immigration matters and family law cases.',
    verified: true,
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    availability: [
      { day: 'Wednesday', slots: ['09:00', '10:00', '11:00', '14:00'] },
      { day: 'Thursday', slots: ['10:00', '15:00', '16:00'] },
      { day: 'Friday', slots: ['09:00', '14:00', '15:00'] },
    ],
  },
];
