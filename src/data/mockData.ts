import {
  BookingAppointment,
  ClientCase,
  CompanyProfile,
  OfficeLocation,
  PortalMessage,
  TravelInquiry,
  UploadedDocument
} from '../types';

export const DEFAULT_CLIENT_COMPANY: CompanyProfile = {
  companyName: 'Global Enterprise & Company Ltd',
  companyType: 'Active Private Limited Company (UK Registered)',
  registeredOffice: '114 Lock Studios, 7 Corsican Square, Bow, London',
  postcode: 'E3 3YD',
  registrationStatus: 'Active',
  primaryContact: 'Mahmud Hasan',
  email: 'mahmud.bd.sust@gmail.com',
  phone: '07700 900123',
  domain: 'gxtrade.co.uk',
  primaryOffice: 'St Albans Head Office',
  clientSince: 'October 2026'
};

export const OFFICE_LOCATIONS = {
  headOffice: {
    name: 'UK Head Office (St Albans)',
    city: 'St Albans',
    county: 'Hertfordshire',
    country: 'United Kingdom',
    phone: '01727301083',
    formattedPhone: '01727 301083',
    email: 'Info@gxtrade.co.uk',
    hours: 'Monday – Friday: 09:00 – 18:00 | Saturday: 10:00 – 14:00',
    description: 'Executive administrative headquarters, strategic consultancy, and corporate compliance hub.',
    tagline: 'Principal Administration & Compliance Centre'
  },
  londonOffice: {
    name: 'London Office (Ilford)',
    street: '143 Cranbrook Road',
    town: 'Ilford, Essex',
    postcode: 'IG1 4PU',
    country: 'United Kingdom',
    phone: '02035813133',
    formattedPhone: '020 3581 3133',
    email: 'Info@gxtrade.co.uk',
    hours: 'Monday – Friday: 09:30 – 18:30 | Saturday: 10:00 – 16:00',
    description: 'Walk-in document drop-off, visa applications processing desk, letter drafting & translation services.',
    tagline: 'Client Document, Visa & Travel Center'
  }
};

export const INITIAL_CASES: ClientCase[] = [
  {
    id: 'case-1',
    caseRef: 'GXT-VSA-2026-081',
    title: 'UK Standard Visitor Visa (Executive Delegate for Global Enterprise & Company Ltd)',
    serviceType: 'Visa Application Processing',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    status: 'In Progress',
    progressPercent: 75,
    openedDate: '02 Oct 2026',
    targetCompletionDate: '15 Oct 2026',
    assignedOffice: 'London Ilford Office',
    assignedAdvisor: 'Farhan Rahman (Senior Immigration Consultant)',
    latestUpdate: 'Company sponsorship letter on 114 Lock Studios letterhead verified. Submission scheduled for biometric booking in London.',
    documentCount: 4
  },
  {
    id: 'case-2',
    caseRef: 'GXT-LTR-2026-114',
    title: 'HMRC Statutory Clarification Notice: Global Enterprise & Company Ltd (Bow, London)',
    serviceType: 'Official Letter Decoding & Response',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    status: 'Action Drafted',
    progressPercent: 90,
    openedDate: '05 Oct 2026',
    targetCompletionDate: '11 Oct 2026',
    assignedOffice: 'St Albans Head Office',
    assignedAdvisor: 'Eleanor Vance (Head of Administrative Compliance)',
    latestUpdate: 'Letter dissected into plain English. Formal 3-page response ready citing registered office at 114 Lock Studios, Bow, London, E3 3YD.',
    documentCount: 2
  },
  {
    id: 'case-3',
    caseRef: 'GXT-TRV-2026-042',
    title: 'Corporate Travel Management: London to Dubai (Global Enterprise Delegation)',
    serviceType: 'Flight & Hotel Booking',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    status: 'Completed',
    progressPercent: 100,
    openedDate: '28 Sep 2026',
    targetCompletionDate: '04 Oct 2026',
    assignedOffice: 'St Albans Head Office',
    assignedAdvisor: 'David Sterling (Corporate Travel Coordinator)',
    latestUpdate: 'Emirates return business flights confirmed. JW Marriott Marquis hotel reservation voucher issued for executive delegates.',
    documentCount: 3
  },
  {
    id: 'case-4',
    caseRef: 'GXT-TRN-2026-065',
    title: 'Certified Multilingual Translation & Corporate Compliance Filing',
    serviceType: 'Document Translation',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    status: 'Under Review',
    progressPercent: 50,
    openedDate: '07 Oct 2026',
    targetCompletionDate: '14 Oct 2026',
    assignedOffice: 'London Ilford Office',
    assignedAdvisor: 'Priya Sharma (Sworn Translation Lead)',
    latestUpdate: 'Overseas correspondent commercial agreement and banking verification submitted for certified translation & apostille review.',
    documentCount: 2
  }
];

export const INITIAL_DOCUMENTS: UploadedDocument[] = [
  {
    id: 'doc-101',
    fileName: 'HMRC_Statutory_Notice_Global_Enterprise_Bow_E3.pdf',
    fileSize: '1.4 MB',
    fileType: 'application/pdf',
    uploadDate: '05 Oct 2026, 14:20',
    category: 'Official Letter',
    status: 'Decoded',
    notes: 'Addressed to Global Enterprise & Company Ltd, 114 Lock Studios, 7 Corsican Square, Bow, London, E3 3YD.',
    office: 'St Albans Head Office',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    caseRef: 'GXT-LTR-2026-114',
    decodedAnalysis: {
      summary: 'HMRC notice requesting commercial administrative filing records for Global Enterprise & Company Ltd at registered office 114 Lock Studios, 7 Corsican Square, Bow, London, E3 3YD. 30-day statutory window provided; no penalty has been levied.',
      senderAgency: 'HM Revenue & Customs (HMRC)',
      urgency: 'Medium',
      deadlineDate: '24 Oct 2026',
      keyPoints: [
        'Client: Global Enterprise & Company Ltd',
        'Registered Address verified: 114 Lock Studios, 7 Corsican Square, Bow, London, E3 3YD',
        'Routine clarification regarding trade income classification & business filings',
        '30-day statutory response window provided (no penalty if answered on time)'
      ],
      recommendedAction: 'Submit formal clarification letter via recorded delivery with supporting company ledgers and registered office proof.',
      draftedResponse: 'To: HM Revenue & Customs\nLocal Compliance Services\nReference: Notice Ref CF-90284/2026\n\nDear Officer,\n\nRe: Global Enterprise & Company Ltd\nRegistered Office: 114 Lock Studios, 7 Corsican Square, Bow, London, E3 3YD\nCompany Status: Active Private Limited Company\n\nWe act on behalf of the registered taxpayer, Global Enterprise & Company Ltd. In response to your correspondence dated 02 October 2026, please find enclosed the requested explanatory schedule and supporting reconciliation records.\n\nShould you require any further documentation, kindly direct correspondence to our appointed representatives at GX Trade (St Albans Office: 01727 301083 / Info@gxtrade.co.uk).\n\nYours sincerely,\nGX Trade Client Services Desk\nOn behalf of Mahmud Hasan, Director'
    }
  },
  {
    id: 'doc-102',
    fileName: 'Companies_House_Certificate_Global_Enterprise_Ltd.pdf',
    fileSize: '2.4 MB',
    fileType: 'application/pdf',
    uploadDate: '03 Oct 2026, 10:15',
    category: 'Business Compliance',
    status: 'Completed',
    notes: 'Certificate of Incorporation & Register of Officers: 114 Lock Studios, 7 Corsican Square, Bow, London, E3 3YD.',
    office: 'St Albans Head Office',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    caseRef: 'GXT-LTR-2026-114'
  },
  {
    id: 'doc-103',
    fileName: 'Global_Enterprise_Sponsorship_Passport_Pack.pdf',
    fileSize: '3.8 MB',
    fileType: 'application/pdf',
    uploadDate: '02 Oct 2026, 11:05',
    category: 'Visa Document',
    status: 'Completed',
    notes: 'Certified corporate sponsorship evidence for UK Standard Visitor Visa application.',
    office: 'London Ilford Office',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    caseRef: 'GXT-VSA-2026-081'
  },
  {
    id: 'doc-104',
    fileName: 'Flight_Hotel_Vouchers_Dubai_Delegation_Nov2026.pdf',
    fileSize: '890 KB',
    fileType: 'application/pdf',
    uploadDate: '04 Oct 2026, 16:30',
    category: 'Travel ID & Passport',
    status: 'Completed',
    notes: 'Final confirmed corporate itinerary issued by GX Trade Travel Desk for Global Enterprise & Company Ltd executive trip.',
    office: 'St Albans Head Office',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    caseRef: 'GXT-TRV-2026-042'
  }
];

export const INITIAL_APPOINTMENTS: BookingAppointment[] = [
  {
    id: 'apt-201',
    referenceNo: 'GXT-BK-7892',
    service: 'Official Letter Decoding & Response',
    office: 'St Albans Head Office',
    date: '2026-10-14',
    timeSlot: '11:00 AM - 12:00 PM',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    clientPhone: '07700 900123',
    notes: 'Review HMRC draft response for Global Enterprise & Company Ltd (114 Lock Studios, Bow) and execute corporate representation mandate.',
    status: 'Confirmed',
    createdAt: '06 Oct 2026',
    urgency: 'Normal'
  },
  {
    id: 'apt-202',
    referenceNo: 'GXT-BK-8104',
    service: 'Visa Application Processing',
    office: 'London Ilford Office',
    date: '2026-10-18',
    timeSlot: '02:30 PM - 03:30 PM',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    clientPhone: '07700 900123',
    notes: 'Biometric document handover and visa portal submission verification for Global Enterprise & Company Ltd overseas director.',
    status: 'Confirmed',
    createdAt: '07 Oct 2026',
    urgency: 'Normal'
  }
];

export const INITIAL_TRAVEL_INQUIRIES: TravelInquiry[] = [
  {
    id: 'trv-301',
    referenceNo: 'TRV-LHR-DXB-991',
    type: 'flight_hotel',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    clientPhone: '07700 900123',
    origin: 'London Heathrow (LHR)',
    destination: 'Dubai International (DXB)',
    departureDate: '2026-11-12',
    returnDate: '2026-11-19',
    passengers: 2,
    cabinClass: 'Business',
    hotelNights: 7,
    rooms: 1,
    hotelStars: '5 Star Luxury',
    budgetNotes: 'Direct flights (Emirates). Corporate billing issued to Global Enterprise & Company Ltd, 114 Lock Studios, Bow, London, E3 3YD.',
    status: 'Confirmed & Booked',
    createdAt: '28 Sep 2026',
    quoteDetails: {
      airlineOrHotel: 'Emirates EK002 / JW Marriott Marquis Dubai',
      estimatedCost: '£3,420 (Corporate invoice issued)',
      flightDetails: 'LHR 14:15 -> DXB 00:25 (+1) | Business Class Lounge Access & Chauffeur Transfer',
      hotelDetails: 'Deluxe Executive Suite, Daily Breakfast, Flexible Corporate Cancellation',
      expiresIn: 'Tickets Issued'
    }
  },
  {
    id: 'trv-302',
    referenceNo: 'TRV-LGW-IST-442',
    type: 'flight',
    clientName: 'Mahmud Hasan',
    companyName: 'Global Enterprise & Company Ltd',
    clientEmail: 'mahmud.bd.sust@gmail.com',
    clientPhone: '07700 900123',
    origin: 'London Gatwick (LGW)',
    destination: 'Istanbul Airport (IST)',
    departureDate: '2026-12-05',
    returnDate: '2026-12-12',
    passengers: 1,
    cabinClass: 'Premium Economy',
    budgetNotes: 'Trade delegation transit options with 2x 23kg check-in baggage.',
    status: 'Quotation Prepared',
    createdAt: '08 Oct 2026',
    quoteDetails: {
      airlineOrHotel: 'Turkish Airlines TK1982',
      estimatedCost: '£485 return per passenger',
      flightDetails: 'Direct flight, includes 2x 23kg baggage and priority boarding',
      expiresIn: 'Quote valid for 48 hours'
    }
  }
];

export const INITIAL_MESSAGES: PortalMessage[] = [
  {
    id: 'msg-1',
    sender: 'advisor',
    senderName: 'Eleanor Vance (St Albans Office)',
    timestamp: '06 Oct 2026, 15:45',
    text: 'Good afternoon Mr Hasan. We have completed the formal review of the HMRC correspondence for Global Enterprise & Company Ltd. The recommended response citing your registered address at 114 Lock Studios, 7 Corsican Square, Bow, London, E3 3YD is ready under Case GXT-LTR-2026-114.',
    caseRef: 'GXT-LTR-2026-114',
    isRead: true
  },
  {
    id: 'msg-2',
    sender: 'client',
    senderName: 'Mahmud Hasan (Global Enterprise & Company Ltd)',
    timestamp: '06 Oct 2026, 16:10',
    text: 'Thank you Eleanor, that was remarkably swift. The breakdown regarding our Bow office accounts is clear. I will bring the printed company statutory documents to our St Albans appointment on the 14th.',
    caseRef: 'GXT-LTR-2026-114',
    isRead: true
  },
  {
    id: 'msg-3',
    sender: 'advisor',
    senderName: 'Farhan Rahman (London Ilford Office)',
    timestamp: '08 Oct 2026, 10:20',
    text: 'Hello Mahmud, the visa sponsorship bundle for Global Enterprise & Company Ltd is progressing smoothly. You can reach our Ilford desk on 020 3581 3133 if you need any adjustments before next week.',
    caseRef: 'GXT-VSA-2026-081',
    isRead: false
  }
];

export const SAMPLE_LETTER_TEMPLATES = [
  {
    title: 'HMRC Statutory Clarification Notice',
    sender: 'HM Revenue & Customs - Personal & Corporate Tax Audit',
    text: `HM REVENUE & CUSTOMS\nLocal Compliance Services\nReference: TAX/COMP/2026-8819\nDate: 04 October 2026\n\nNotice of Compliance Verification\n\nDear Sir/Madam,\n\nWe are currently carrying out a formal review of your commercial administrative filings for the tax year ending 2025/2026. Under paragraph 1 of Schedule 36 to the Finance Act 2008, you are required to furnish this office with the specific information and documentation set out in the schedule below within thirty (30) days from the date of this notice.\n\nFailure to comply with an information notice may incur an initial statutory penalty of £300, and ongoing daily default penalties.\n\nRequired:\n1. Detailed records of combined administrative expenses.\n2. Bank reconciliation statements for the third quarter.\n3. Clarification on overseas trade agency representation.\n\nPlease deliver all requested items to the address shown above by 03 November 2026.`,
    presetAnalysis: {
      summary: 'HMRC routine compliance check requiring expense schedules and bank reconciliations within 30 days. This is not an accusation of fraud or unpaid taxes, but statutory information gathering.',
      senderAgency: 'HM Revenue & Customs (HMRC)',
      urgency: 'Medium' as const,
      deadlineDate: '03 Nov 2026',
      keyPoints: [
        'Issued under Schedule 36 to the Finance Act 2008',
        'Standard 30-day statutory deadline to reply (03 Nov 2026)',
        '£300 penalty applies ONLY if ignored past the statutory deadline',
        'Requires administrative expense ledger and bank reconciliation records'
      ],
      recommendedAction: 'GX Trade will compile your reconciliation schedule and draft a formal compliance covering letter before the 30-day deadline.',
      draftedResponse: `To: HM Revenue & Customs\nLocal Compliance Services\nReference: TAX/COMP/2026-8819\n\nDear Compliance Officer,\n\nRe: Notice of Compliance Verification - Response & Documentation Schedule\n\nWe represent the taxpayer in relation to your notice dated 04 October 2026 under Schedule 36 to the Finance Act 2008.\n\nPlease find enclosed the formal reconciliation of combined administrative expenses alongside certified third-quarter bank statements and documentation of trade activities.\n\nAll queries should be directed to our appointed administrative consultants at GX Trade (St Albans Head Office: 01727 301083 / Email: Info@gxtrade.co.uk).\n\nYours faithfully,\nAuthorized Representative\nGX Trade Client Services`
    }
  },
  {
    title: 'UK Visas & Immigration (UKVI) Request for Further Evidence',
    sender: 'UK Visas and Immigration - Home Office Direct',
    text: `HOME OFFICE\nUK Visas & Immigration\nRef: VSA-601928-UK\nDate: 01 October 2026\n\nRequest for Additional Information - Application for Entry Clearance\n\nDear Applicant,\n\nWe are currently reviewing your visa application. Before we can reach a decision on your eligibility under the Immigration Rules, you are required to provide additional evidence to satisfy the decision-maker regarding your accommodation and financial maintenance in the United Kingdom.\n\nPlease provide:\n1. Proof of guaranteed hotel or resident accommodation for the full duration of stay.\n2. Confirmed return air travel itinerary or booking reservation.\n3. Bank statement certifying sufficient funds for independent maintenance.\n\nYou must provide this documentation within 10 working days. If we do not receive this evidence, your application may be determined on the information currently available.`,
    presetAnalysis: {
      summary: 'Home Office has placed your visa application on hold pending proof of accommodation, round-trip flight booking, and financial subsistence. You have 10 working days to submit.',
      senderAgency: 'UK Visas & Immigration (Home Office)',
      urgency: 'High' as const,
      deadlineDate: '15 Oct 2026',
      keyPoints: [
        'Application is active and not rejected',
        'Strict 10 working-day window to upload requested evidence',
        'Crucial requirements: Verifiable accommodation, flight itinerary & maintenance funds',
        'Submission can be carried out through the UKVI digital evidence portal'
      ],
      recommendedAction: 'GX Trade Travel Desk can immediately issue verified flight reservations and hotel booking vouchers, which our immigration consultants will package with an accompanying explanatory submission.',
      draftedResponse: `To: UK Visas & Immigration\nDecision Making Centre\nRef: VSA-601928-UK\n\nDear Entry Clearance Officer,\n\nRe: Submission of Further Evidence - Application Reference VSA-601928-UK\n\nIn response to your request dated 01 October 2026, the applicant hereby submits the complete supplementary evidentiary package:\n\n1. Confirmed round-trip flight reservation issued by GX Trade Travel Services (Booking Ref: TRV-UKVI-889).\n2. Confirmed accommodation reservation voucher for the full duration of stay.\n3. Updated certified 6-month bank statement accompanied by an independent financial maintenance schedule.\n\nWe trust this fulfills all requirements. Please contact GX Trade (London Ilford Office: 020 3581 3133) for any immediate verification.\n\nYours faithfully,\nGX Trade Visa Support Desk`
    }
  },
  {
    title: 'Local Council Business Rates & Premises Classification',
    sender: 'Hertfordshire & Redbridge Municipal Billing Authority',
    text: `LOCAL AUTHORITY FINANCE & REVENUES\nBusiness Rates Department\nAccount Reference: BR-449102-L\n\nRe: Notice of Valuation Office Agency Reassessment & Empty Property Relief\n\nNotice is hereby given that the non-domestic rateable value for the commercial hereditament has been updated. Please complete and return the attached occupancy schedule within 21 days to prevent loss of small business multiplier relief and mandatory rate discounts.\n\nFailure to declare proper administrative usage may result in standard backdated assessment.`,
    presetAnalysis: {
      summary: 'Local authority billing inquiry asking to verify property occupancy and administrative business usage to preserve small business rate discounts.',
      senderAgency: 'Local Council Revenues Authority',
      urgency: 'Medium' as const,
      deadlineDate: '28 Oct 2026',
      keyPoints: [
        'Rates relief check to ensure discounted business rate continues',
        'Requires declaration of office administrative occupancy',
        '21-day timeline from date of delivery'
      ],
      recommendedAction: 'Complete the official local council declaration form, certified with GX Trade administrative tenancy or occupancy statement.',
      draftedResponse: `To: Revenues & Business Rates Department\nAccount Reference: BR-449102-L\n\nDear Rates Officer,\n\nRe: Formal Return of Commercial Occupancy Declaration\n\nPlease find attached the signed occupancy declaration schedule confirming continuous operational use of the premises for office administrative support and consultancy services.\n\nWe request formal confirmation that small business relief remains active without interruption.\n\nYours faithfully,\nAuthorized Representative`
    }
  }
];
