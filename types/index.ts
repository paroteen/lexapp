export type DocumentType = 'Contract' | 'Affidavit' | 'Complaint Letter' | 'Land Agreement' | 'Power of Attorney' | 'Business Agreement';

export type GeneratedDocument = {
  id: string;
  type: DocumentType;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
};

export type CrimeReport = {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  location: string;
  anonymous: boolean;
  images: string[];
  status: 'pending' | 'reviewing' | 'resolved';
  createdAt: string;
};

export type Appointment = {
  id: string;
  lawyerId: string;
  citizenId: string;
  citizenName: string;
  lawyerName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};
