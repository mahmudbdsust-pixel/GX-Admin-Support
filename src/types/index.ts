export type OfficeLocation = 'St Albans Head Office' | 'London Ilford Office' | 'Virtual / Telephone Consultation';

export type ServiceType = 
  | 'Office Administrative Support'
  | 'Official Letter Decoding & Response'
  | 'Form Completion & Compliance'
  | 'Document Translation'
  | 'Visa Application Processing'
  | 'Flight & Hotel Booking'
  | 'General Business Consultancy';

export type DocumentCategory = 
  | 'Official Letter'
  | 'Visa Document'
  | 'Form to Fill'
  | 'Translation Certification'
  | 'Business Compliance'
  | 'Travel ID & Passport';

export type CaseStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'In Progress' 
  | 'Action Drafted' 
  | 'Completed' 
  | 'Awaiting Client Input';

export interface DecodedLetterAnalysis {
  summary: string;
  senderAgency: string;
  urgency: 'Standard' | 'Medium' | 'High' | 'Immediate Action';
  deadlineDate?: string;
  keyPoints: string[];
  recommendedAction: string;
  draftedResponse: string;
}

export interface CompanyProfile {
  companyName: string;
  tradingAs?: string;
  companyType: string;
  registeredOffice: string;
  postcode: string;
  registrationStatus: string;
  primaryContact: string;
  email: string;
  phone: string;
  domain: string;
  primaryOffice: OfficeLocation;
  clientSince: string;
}

export interface UploadedDocument {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  category: DocumentCategory;
  status: 'Received' | 'In Triage' | 'Decoded' | 'Translated' | 'Completed';
  notes?: string;
  office: OfficeLocation;
  clientName: string;
  companyName?: string;
  clientEmail: string;
  caseRef?: string;
  fileDataUrl?: string;
  decodedAnalysis?: DecodedLetterAnalysis;
}

export interface BookingAppointment {
  id: string;
  referenceNo: string;
  service: ServiceType;
  office: OfficeLocation;
  date: string;
  timeSlot: string;
  clientName: string;
  companyName?: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
  status: 'Confirmed' | 'Pending Review' | 'Completed' | 'Rescheduled';
  createdAt: string;
  urgency: 'Normal' | 'Urgent';
}

export interface TravelInquiry {
  id: string;
  referenceNo: string;
  type: 'flight' | 'hotel' | 'flight_hotel';
  clientName: string;
  companyName?: string;
  clientEmail: string;
  clientPhone: string;
  origin?: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  hotelNights?: number;
  rooms?: number;
  hotelStars?: string;
  budgetNotes?: string;
  status: 'Quotation Prepared' | 'Searching Options' | 'Confirmed & Booked';
  createdAt: string;
  quoteDetails?: {
    airlineOrHotel: string;
    estimatedCost: string;
    flightDetails?: string;
    hotelDetails?: string;
    expiresIn?: string;
  };
}

export interface ClientCase {
  id: string;
  caseRef: string;
  title: string;
  serviceType: ServiceType;
  clientName: string;
  companyName?: string;
  clientEmail: string;
  status: CaseStatus;
  progressPercent: number;
  openedDate: string;
  targetCompletionDate: string;
  assignedOffice: OfficeLocation;
  assignedAdvisor: string;
  latestUpdate: string;
  documentCount: number;
}

export interface PortalMessage {
  id: string;
  sender: 'client' | 'advisor';
  senderName: string;
  timestamp: string;
  text: string;
  caseRef?: string;
  isRead?: boolean;
}

export interface ContactInquiry {
  id: string;
  referenceNo: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  category: ServiceType | 'Urgent Notice Triage' | 'General Inquiry';
  preferredOffice: OfficeLocation;
  urgency: 'Normal' | 'Urgent' | 'Critical';
  preferredContactMethod: 'Email' | 'Phone Call' | 'WhatsApp';
  subject: string;
  message: string;
  createdAt: string;
  status: 'Received' | 'Assigned' | 'Responded';
}

