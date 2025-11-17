import { User } from '../contexts/AuthContext';

export const TEST_ACCOUNTS: (User & { password: string })[] = [
  {
    id: 'test-citizen-1',
    role: 'citizen',
    email: 'citizen@test.com',
    password: 'test123',
    data: {
      fullName: 'John Mugisha',
      nationalId: '1198712345678910',
      phone: '+250 788 111 222',
      email: 'citizen@test.com',
    },
  },
  {
    id: 'test-lawyer-1',
    role: 'lawyer',
    email: 'lawyer@test.com',
    password: 'test123',
    data: {
      fullName: 'Marie Uwamahoro',
      phone: '+250 788 123 456',
      email: 'lawyer@test.com',
      barNumber: 'BAR-2015-001',
      location: 'Kigali',
      expertise: ['Family Law', 'Criminal Law'],
      yearsOfExperience: 8,
      verified: true,
    },
  },
  {
    id: 'test-lawyer-2',
    role: 'lawyer',
    email: 'lawyer.pending@test.com',
    password: 'test123',
    data: {
      fullName: 'Samuel Habimana',
      phone: '+250 788 333 444',
      email: 'lawyer.pending@test.com',
      barNumber: 'BAR-2023-088',
      location: 'Gasabo',
      expertise: ['Business Law', 'Corporate Law'],
      yearsOfExperience: 2,
      verified: false,
    },
  },
];
