import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

export interface Translations {
  common: {
    en: string;
    bn: string;
  };
}

export const TRANSLATIONS = {
  // Top corporate banner
  topBar: {
    headOfficeLabel: {
      en: 'UK Head Office (St Albans):',
      bn: 'ইউকে হেড অফিস (সেন্ট অ্যালবান্স):'
    },
    londonOfficeLabel: {
      en: 'London Office (Ilford):',
      bn: 'লন্ডন অফিস (ইলফোর্ড):'
    },
    gdprNotice: {
      en: 'UK Data Protection & GDPR Compliant',
      bn: 'ইউকে ডেটা সুরক্ষা ও জিডিপিআর (GDPR) অনুবর্তী'
    },
    clientPortal: {
      en: 'Client Portal',
      bn: 'ক্লায়েন্ট পোর্টাল'
    }
  },

  // Navigation Items
  nav: {
    home: { en: 'Overview', bn: 'সারসংক্ষেপ' },
    services: { en: 'Services', bn: 'সেবাসমূহ' },
    pricing: { en: 'Price List', bn: 'মূল্য তালিকা' },
    decoder: { en: 'Letter Decoder & Drafting', bn: 'চিঠি বিশ্লেষণ ও উত্তর লিখন' },
    travel: { en: 'Flights & Hotels', bn: 'ফ্লাইট ও হোটেল' },
    booking: { en: 'Book Appointment', bn: 'অ্যাপয়েন্টমেন্ট বুকিং' },
    upload: { en: 'Secure Upload', bn: 'নিরাপদ ডকুমেন্ট আপলোড' },
    offices: { en: 'Offices & Locations', bn: 'অফিস ও ঠিকানা' },
    contact: { en: 'Contact Us & Query', bn: 'যোগাযোগ ও অনুসন্ধান' },
    dashboard: { en: 'Client Dashboard', bn: 'ক্লায়েন্ট ড্যাশবোর্ড' },
    uploadDocCta: { en: 'Upload Letter / Doc', bn: 'চিঠি / ফাইল আপলোড' },
    tagline: {
      en: 'Administrative Support & Consultancy Services',
      bn: 'প্রশাসনিক সহায়তা ও ব্যবসায়িক কনসালটেন্সি সার্ভিস'
    }
  },

  // Hero Section
  hero: {
    badge: {
      en: 'UK Registered Administrative & Consultancy Partner',
      bn: 'যুক্তরাজ্যের নিবন্ধিত প্রশাসনিক ও কনসালটেন্সি সেবা'
    },
    bilingualNotice: {
      en: 'Bilingual Support in English & বাংলা (Bengali)',
      bn: 'ইংরেজি ও বাংলায় সম্পূর্ণ দ্বিভাষিক সেবা উপলব্ধ'
    },
    mainTitle: {
      en: 'Combined Office Administrative Support & Professional Consultancy Services in the UK',
      bn: 'যুক্তরাজ্যে সমন্বিত অফিস প্রশাসনিক সহায়তা ও প্রফেশনাল কনসালটেন্সি সার্ভিস'
    },
    leadParagraph: {
      en: 'End-to-end back-office operations, statutory letter triage & formal reply drafting (HMRC, Home Office, DWP, Councils), certified document translation, visa application processing, and corporate travel reservations.',
      bn: 'অফিস ব্যাক-অফিস অপারেশন, সরকারি ও বিধিবদ্ধ চিঠি ডিকোডিং এবং প্রাতিষ্ঠানিক জবাব প্রস্তুত (HMRC, Home Office, DWP, কাউন্সিল), প্রত্যয়িত অনুবাদ, যুক্তরাজ্য ভিসা আবেদন এবং কর্পোরেট ফ্লাইট ও হোটেল রিজার্ভেশন।'
    },
    primaryCta: {
      en: 'Book In-Person / Phone Consultation',
      bn: 'সরাসরি / ফোনে পরামর্শ বুক করুন'
    },
    secondaryCta: {
      en: 'Upload Letter for Immediate Triage',
      bn: 'জরুরি চিঠি বিশ্লেষণের জন্য আপলোড করুন'
    },
    priceListCta: {
      en: 'View Transparent Price List',
      bn: 'স্বচ্ছ মূল্য তালিকা দেখুন'
    },
    stats: {
      stat1Number: { en: '100%', bn: '১০০%' },
      stat1Label: { en: 'Statutory Compliance & GDPR', bn: 'বিধিবদ্ধ সম্মতি ও জিডিপিআর' },
      stat2Number: { en: '24-48h', bn: '২৪-৪৮ ঘণ্টা' },
      stat2Label: { en: 'Urgent Letter Reply Turnaround', bn: 'জরুরি চিঠি উত্তর ড্রাফটিং' },
      stat3Number: { en: '2 Locations', bn: '২টি প্রধান অফিস' },
      stat3Label: { en: 'St Albans & London Ilford', bn: 'সেন্ট অ্যালবান্স ও লন্ডন ইলফোর্ড' }
    },
    cards: {
      letters: {
        title: { en: 'Letter Decoding & Formal Reply', bn: 'চিঠি বিশ্লেষণ ও ফর্মাল জবাব' },
        desc: { en: 'Decode complex HMRC, Home Office & Council letters into clear steps with drafted replies.', bn: 'HMRC, Home Office ও কাউন্সিলের জটিল চিঠি বিশ্লেষণ ও সময়মতো উপযুক্ত জবাব প্রস্তুত।' }
      },
      visas: {
        title: { en: 'Visa & Forms Processing', bn: 'ভিসা আবেদন ও ফর্ম পূরণ' },
        desc: { en: 'Flawless UK visa forms, sworn certified translations, and document audit.', bn: 'ইউকে ভিসা ফর্ম পূরণ, প্রত্যয়িত আইনি অনুবাদ এবং প্রয়োজনীয় কাগজপত্র অডিট।' }
      },
      officeSupport: {
        title: { en: 'Office Admin Retainers', bn: 'অফিস অ্যাডমিন রিটেইনার' },
        desc: { en: 'Comprehensive post handling, billing management, and business communication.', bn: 'ডাক চিঠি গ্রহণ ও স্ক্যান, বিলিং ব্যবস্থাপনা এবং কর্পোরেট যোগাযোগ সমন্বয়।' }
      },
      travelDesk: {
        title: { en: 'Flights & Hotel Bookings', bn: 'ফ্লাইট ও হোটেল বুকিং' },
        desc: { en: 'IATA-grade flight tickets, visa reservation vouchers, and corporate hotels.', bn: 'ভিসা প্রমাণের জন্য সংরক্ষিত টিকিট, হোটেল ভাউচার এবং আন্তর্জাতিক ভ্রমণ সহায়তা।' }
      }
    }
  },

  // Services Section & Price List
  services: {
    headerBadge: {
      en: 'Transparent UK Pricing & Service Catalogue',
      bn: 'স্বচ্ছ ইউকে ফি ও সেবার তালিকা'
    },
    title: {
      en: 'Tailored Administrative Solutions & Standard Pricing',
      bn: 'প্রশাসনিক সমাধান ও নির্ধারিত মূল্য তালিকা'
    },
    subtitle: {
      en: 'Clear fixed fees and flexible retainers for businesses, entrepreneurs, and individuals navigating UK statutory procedures.',
      bn: 'ইউকে বিধিবদ্ধ কার্যক্রম পরিচালনাকারী প্রতিষ্ঠান, উদ্যোক্তা ও ব্যক্তিদের জন্য স্বচ্ছ নির্দিষ্ট ফি এবং নমনীয় রিটেইনার।'
    },
    tabs: {
      all: { en: 'All Services', bn: 'সকল সেবা' },
      admin: { en: 'Office Administration', bn: 'অফিস প্রশাসন' },
      letters: { en: 'Letters & Notices', bn: 'চিঠি ও নোটিশ' },
      visa: { en: 'Visa & Translation', bn: 'ভিসা ও অনুবাদ' },
      travel: { en: 'Travel Desk', bn: 'ভ্রমণ ডেস্ক' }
    },
    viewMode: {
      cards: { en: 'Detailed Service Cards', bn: 'বিস্তারিত সেবা কার্ড' },
      pricelist: { en: 'Itemized Price List & Tariff', bn: 'দফাভিত্তিক সম্পূর্ণ মূল্য তালিকা' }
    },
    bookServiceCta: { en: 'Book Consultation for This Service', bn: 'এই সেবার জন্য অ্যাপয়েন্টমেন্ট বুক করুন' },
    viewPricingButton: { en: 'View Detailed Price Breakdown', bn: 'বিস্তারিত মূল্য তালিকা দেখুন' },
    hidePricingButton: { en: 'Hide Price Breakdown', bn: 'মূল্য তালিকা লুকান' },
    turnaroundLabel: { en: 'Turnaround Time:', bn: 'প্রক্রিয়াকরণ সময়:' },
    suitableForLabel: { en: 'Best Suited For:', bn: 'যাদের জন্য প্রযোজ্য:' },
    fixedFee: { en: 'Fixed Fee', bn: 'নির্দিষ্ট ফি' },
    perMonth: { en: 'per month', bn: 'প্রতি মাসে' },
    perHour: { en: 'per hour', bn: 'প্রতি ঘণ্টায়' },
    perDocument: { en: 'per document', bn: 'প্রতি নথিতে' }
  },

  // Letter Decoder Tool
  decoder: {
    badge: {
      en: 'Statutory Correspondence Assistance',
      bn: 'ইউকে অফিশিয়াল চিঠি বিশ্লেষণ সেবা'
    },
    title: {
      en: 'Decoding Official Letters & Response Drafting Tool',
      bn: 'অফিসিয়াল চিঠি ডিকোডিং ও ফর্মাল উত্তর ড্রাফটিং টুল'
    },
    description: {
      en: 'Received a dense letter from HMRC, Home Office (UKVI), DWP, Courts, or Local Councils? Paste or select a letter template below to dissect legal jargon, discover strict deadlines, and generate a compliant formal response.',
      bn: 'এইচএমআরসি (HMRC), হোম অফিস, ডিডব্লিউপি (DWP), আদালত কিংবা স্থানীয় কাউন্সিল থেকে চিঠি পেয়েছেন? নিচে পেস্ট করুন বা টেমপ্লেট নির্বাচন করুন। তাৎক্ষণিক সারসংক্ষেপ, কঠোর সময়সীমা এবং ফর্মাল ড্রাফট তৈরি করুন।'
    },
    presetSelectorLabel: {
      en: 'Select a common UK statutory letter scenario:',
      bn: 'সাধারণ ইউকে বিধিবদ্ধ চিঠির দৃশ্যকল্প নির্বাচন করুন:'
    },
    inputLabel: {
      en: 'Official Letter Text (Paste or Edit):',
      bn: 'অফিসিয়াল চিঠির টেক্সট (পেস্ট বা এডিট করুন):'
    },
    senderAgencyLabel: {
      en: 'Issuing UK Authority / Agency:',
      bn: 'চিঠি প্রদানকারী ইউকে কর্তৃপক্ষ / সংস্থা:'
    },
    runButton: {
      en: 'Analyze Letter & Generate Formal Draft',
      bn: 'চিঠি বিশ্লেষণ ও প্রাতিষ্ঠানিক খসড়া তৈরি করুন'
    },
    analyzing: {
      en: 'Dissecting statutory text & deadlines...',
      bn: 'বিধিবদ্ধ টেক্সট ও সময়সীমা বিশ্লেষণ করা হচ্ছে...'
    },
    resultsHeader: {
      en: 'Analysis & Administrative Action Plan',
      bn: 'বিশ্লেষণ ও প্রশাসনিক কর্মপরিকল্পনা'
    },
    summaryLabel: { en: 'Plain-Language Summary', bn: 'সহজ ভাষায় সারসংক্ষেপ' },
    urgencyLabel: { en: 'Urgency Level', bn: 'জরুরিতার মাত্রা' },
    deadlineLabel: { en: 'Strict Statutory Deadline', bn: 'বিধিবদ্ধ সময়সীমা' },
    keyPointsLabel: { en: 'Key Obligations & Requirements', bn: 'মূল দায়িত্ব ও নির্দেশনাসমূহ' },
    recommendedActionLabel: { en: 'Recommended Next Step', bn: 'সুপারিশকৃত পরবর্তী পদক্ষেপ' },
    draftLabel: { en: 'Bespoke Formal Response Draft', bn: 'প্রস্তুতকৃত প্রাতিষ্ঠানিক জবাবের খসড়া' },
    copyDraftButton: { en: 'Copy Response Draft to Clipboard', bn: 'ড্রাফট ক্লিপবোর্ডে কপি করুন' },
    copiedFeedback: { en: 'Copied to Clipboard!', bn: 'ক্লিপবোর্ডে কপি সম্পন্ন!' },
    submitToOfficeButton: {
      en: 'Submit Direct to GX Trade Office for Professional Filing',
      bn: 'পেশাদার ফাইলিংয়ের জন্য সরাসরি জিএক্স ট্রেড অফিসে পাঠান'
    }
  },

  // Appointment Booking
  booking: {
    title: { en: 'Book an Appointment with Our Advisors', bn: 'আমাদের বিশেষজ্ঞদের সাথে অ্যাপয়েন্টমেন্ট বুক করুন' },
    subtitle: {
      en: 'Meet in person at our St Albans or London Ilford offices, or arrange a private telephone / video consultation.',
      bn: 'সেন্ট অ্যালবান্স অথবা লন্ডন ইলফোর্ড অফিসে সরাসরি সাক্ষাৎ করুন, অথবা ফোনে/ভিডিওতে পরামর্শ গ্রহণ করুন।'
    },
    step1: { en: '1. Select Service', bn: '১. সেবা নির্বাচন' },
    step2: { en: '2. Office & Date', bn: '২. অফিস ও সময়' },
    step3: { en: '3. Your Particulars', bn: '৩. আপনার বিবরণ' },
    step4: { en: '4. Confirmation', bn: '৪. নিশ্চিতকরণ' },
    officeSelection: { en: 'Choose Consultation Location:', bn: 'পরামর্শের স্থান নির্বাচন করুন:' },
    selectDate: { en: 'Select Preferred Date:', bn: 'পছন্দের তারিখ নির্বাচন করুন:' },
    selectTimeSlot: { en: 'Select Time Slot:', bn: 'সময় স্লট নির্বাচন করুন:' },
    urgencyToggle: { en: 'Mark as Urgent Case (<48h Deadline)', bn: 'জরুরি কেস হিসেবে চিহ্নিত করুন (<৪৮ ঘণ্টা সময়সীমা)' },
    clientName: { en: 'Client Full Name', bn: 'ক্লায়েন্টের পুরো নাম' },
    companyName: { en: 'Company / Trading Name (Optional)', bn: 'প্রতিষ্ঠানের নাম (ঐচ্ছিক)' },
    email: { en: 'Email Address', bn: 'ইমেইল ঠিকানা' },
    phone: { en: 'UK Phone Number', bn: 'ইউকে ফোন নম্বর' },
    notes: { en: 'Brief Overview of Your Matter', bn: 'আপনার বিষয়ে সংক্ষেপ বিবরণ' },
    backBtn: { en: 'Back', bn: 'পূর্ববর্তী' },
    nextBtn: { en: 'Continue to Next Step', bn: 'পরবর্তী ধাপে যান' },
    confirmBtn: { en: 'Confirm Appointment Booking', bn: 'অ্যাপয়েন্টমেন্ট নিশ্চিত করুন' },
    successTitle: { en: 'Appointment Successfully Booked!', bn: 'অ্যাপয়েন্টমেন্ট সফলভাবে নিশ্চিত হয়েছে!' }
  },

  // Secure Document Upload
  upload: {
    title: { en: 'Secure Encrypted Document Upload Vault', bn: 'নিরাপদ এনক্রিপ্টেড ডকুমেন্ট আপলোড ভল্ট' },
    subtitle: {
      en: 'Safely transmit official letters, visa application evidence, identity proofs, and corporate records for prompt processing.',
      bn: 'দ্রুত প্রক্রিয়াকরণের জন্য আপনার অফিশিয়াল চিঠি, ভিসা নথিপত্র, পাসপোর্ট কপি ও ব্যবসায়িক ফাইল নিরাপদে জমা দিন।'
    },
    dropzoneTitle: { en: 'Drag and drop your file here, or browse', bn: 'আপনার ফাইলটি এখানে ড্র্যাগ করে ফেলুন অথবা ব্রাউজ করুন' },
    dropzoneHint: { en: 'Supports PDF, JPG, PNG, DOCX up to 25MB. End-to-end 256-bit AES encryption.', bn: 'পিডিএফ, জেপিজি, পিএনজি ও ডকএক্স ফাইল (সর্বোচ্চ ২৫ মেগাবাইট)। ২৫৬-বিট এনক্রিপশনযুক্ত।' },
    chooseOffice: { en: 'Destination Office for Processing:', bn: 'প্রক্রিয়াকরণের জন্য নির্ধারিত অফিস:' },
    categoryLabel: { en: 'Document Classification:', bn: 'নথিপত্রের ধরন:' },
    urgencyLabel: { en: 'Processing Urgency:', bn: 'প্রক্রিয়াকরণের জরুরিতা:' },
    submitBtn: { en: 'Encrypt & Transmit to Office Desk', bn: 'এনক্রিপ্ট করে অফিসে প্রেরণ করুন' },
    recentUploads: { en: 'Recent Uploaded Documents', bn: 'সম্প্রতি আপলোডকৃত নথিপত্র' }
  },

  // Travel Desk
  travel: {
    title: { en: 'Corporate Travel Desk & Flight Reservations', bn: 'কর্পোরেট ট্রাভেল ডেস্ক ও ফ্লাইট রিজার্ভেশন' },
    subtitle: {
      en: 'Certified flight tickets, verifiable visa reservation itineraries, and hotel bookings tailored for business executives and private travelers.',
      bn: 'ব্যবসায়ী ও পর্যটকদের জন্য নিশ্চিত ফ্লাইট টিকিট, ভিসা আবেদনের জন্য যাচাইযোগ্য ভ্রমণ বুকিং এবং হোটেল রিজার্ভেশন।'
    },
    tripTypeFlightHotel: { en: 'Flight + Hotel Package', bn: 'ফ্লাইট + হোটেল প্যাকেজ' },
    tripTypeFlight: { en: 'Flight Only', bn: 'শুধু বিমান টিকিট' },
    tripTypeHotel: { en: 'Hotel Only', bn: 'শুধু হোটেল' },
    origin: { en: 'Departure Airport (e.g. LHR, LGW)', bn: 'প্রস্থানের বিমানবন্দর (যেমন: লন্ডন হিথ্রো)' },
    destination: { en: 'Destination Airport (e.g. DXB, DAC, JFK)', bn: 'গন্তব্যের বিমানবন্দর (যেমন: ঢাকা, দুবাই, জেএফকে)' },
    departureDate: { en: 'Departure Date', bn: 'যাত্রার তারিখ' },
    returnDate: { en: 'Return Date', bn: 'ফেরার তারিখ' },
    passengers: { en: 'Passengers', bn: 'যাত্রী সংখ্যা' },
    cabinClass: { en: 'Cabin Class', bn: 'কেবিন শ্রেণি' },
    requestQuoteBtn: { en: 'Request Tailored Travel Quotation', bn: 'ভ্রমণ কোটেশনের জন্য অনুরোধ পাঠান' }
  },

  // Client Dashboard
  dashboard: {
    title: { en: 'Corporate Client Portal & Live Cases', bn: 'কর্পোরেট ক্লায়েন্ট পোর্টাল ও চলমান কেস' },
    registeredClient: { en: 'Active Client Account', bn: 'সক্রিয় ক্লায়েন্ট অ্যাকাউন্ট' },
    companyLabel: { en: 'Registered Company:', bn: 'নিবন্ধিত প্রতিষ্ঠান:' },
    directorLabel: { en: 'Director / Primary Contact:', bn: 'পরিচালক / প্রধান যোগাযোগ:' },
    addressLabel: { en: 'Registered Address:', bn: 'নিবন্ধিত ঠিকানা:' },
    tabs: {
      cases: { en: 'Active Cases', bn: 'চলমান কেসসমূহ' },
      vault: { en: 'Document Vault', bn: 'ডকুমেন্ট ভল্ট' },
      messages: { en: 'Advisor Messaging', bn: 'পরামর্শকের সাথে বার্তা' }
    },
    status: {
      inProgress: { en: 'In Progress', bn: 'চলমান' },
      actionDrafted: { en: 'Action Drafted', bn: 'জবাব প্রস্তুত' },
      completed: { en: 'Completed', bn: 'সম্পন্ন' },
      underReview: { en: 'Under Review', bn: 'পর্যালোচনায়' }
    }
  },

  // Office Locations Section
  offices: {
    title: { en: 'Our UK Office Locations & Reception Hours', bn: 'আমাদের ইউকে অফিসসমূহ ও অভ্যর্থনা সময়' },
    subtitle: {
      en: 'Visit us in St Albans or London Ilford for in-person document drops, consultation meetings, or call our direct switchboards.',
      bn: 'নথি জমা বা মুখোমুখি সাক্ষাতের জন্য সেন্ট অ্যালবান্স অথবা লন্ডন ইলফোর্ড অফিসে আসুন, অথবা সরাসরি ফোন করুন।'
    },
    headOfficeTitle: { en: 'UK Head Office (St Albans)', bn: 'ইউকে হেড অফিস (সেন্ট অ্যালবান্স)' },
    londonOfficeTitle: { en: 'London Office (Ilford)', bn: 'লন্ডন অফিস (ইলফোর্ড)' },
    hoursLabel: { en: 'Office Hours:', bn: 'খোলা থাকার সময়:' },
    phoneLabel: { en: 'Telephone Switchboard:', bn: 'সরাসরি টেলিফোন:' },
    emailLabel: { en: 'Official Email:', bn: 'অফিসিয়াল ইমেইল:' },
    getDirections: { en: 'Get Driving / Transit Directions', bn: 'দিকনির্দেশনা দেখুন' }
  },

  // Contact Us & Query Form
  contact: {
    badge: {
      en: 'Official UK Advisory & Communication Desk',
      bn: 'অফিসিয়াল ইউকে পরামর্শ ও যোগাযোগ ডেস্ক'
    },
    title: {
      en: 'Contact Us & Submit a Business Inquiry',
      bn: 'যোগাযোগ করুন ও সরাসরি অনুসন্ধান পাঠান'
    },
    subtitle: {
      en: 'Need urgent advice on an official letter, HMRC notice, UK visa application, certified document translation, or general office support? Send your query directly to our consultants.',
      bn: 'অফিসিয়াল চিঠি, HMRC নোটিশ, ইউকে ভিসা আবেদন, প্রত্যয়িত অনুবাদ বা সাধারণ অফিস সহায়তায় জরুরি পরামর্শ দরকার? সরাসরি আমাদের বিশেষজ্ঞদের কাছে আপনার অনুসন্ধান পাঠান।'
    },
    directContactTitle: {
      en: 'Direct Contact Switchboards',
      bn: 'সরাসরি ফোন ও অফিস যোগাযোগ'
    },
    directContactSub: {
      en: 'Reach our team directly by phone, email, or schedule an in-person appointment.',
      bn: 'ফোন, ইমেইল অথবা সরাসরি অফিসে এসে পরামর্শ গ্রহণের সুযোগ।'
    },
    quickPresetsTitle: {
      en: 'Select a Query Category to Pre-fill:',
      bn: 'অনুসন্ধানের বিষয় নির্বাচন করে সহজে ফর্ম পূরণ করুন:'
    },
    fullName: { en: 'Full Name', bn: 'আপনার পুরো নাম' },
    fullNamePlaceholder: { en: 'e.g. Mahmud Hasan', bn: 'যেমন: মাহমুদ হাসান' },
    email: { en: 'Email Address', bn: 'ইমেইল ঠিকানা' },
    phone: { en: 'Phone / Mobile Number', bn: 'ফোন / মোবাইল নম্বর' },
    company: { en: 'Company / Business Name (Optional)', bn: 'প্রতিষ্ঠানের নাম (ঐচ্ছিক)' },
    category: { en: 'Inquiry Category', bn: 'অনুসন্ধানের ধরন' },
    preferredOffice: { en: 'Destination Office', bn: 'পছন্দের অফিস' },
    preferredContactMethod: { en: 'Preferred Response Channel', bn: 'উত্তরের পছন্দের মাধ্যম' },
    urgency: { en: 'Urgency Level', bn: 'জরুরিতার মাত্রা' },
    subject: { en: 'Query Subject', bn: 'জিজ্ঞাসার বিষয়' },
    subjectPlaceholder: {
      en: 'e.g. Urgent review needed for HMRC assessment letter received today',
      bn: 'যেমন: আজ প্রাপ্ত HMRC অ্যাসেসমেন্ট চিঠির জরুরি পর্যালোচনা প্রয়োজন'
    },
    message: { en: 'Detailed Message / Query Particulars', bn: 'বিস্তারিত অনুসন্ধান ও বার্তা' },
    messagePlaceholder: {
      en: 'Please provide details about your situation, any statutory deadlines, reference numbers, or specific questions for our advisory team...',
      bn: 'আপনার পরিস্থিতি, বিধিবদ্ধ ডেডলাইন বা সময়সীমা, রেফারেন্স নম্বর এবং আমাদের পরামর্শকদের কাছে আপনার সুনির্দিষ্ট প্রশ্নসমূহ উল্লেখ করুন...'
    },
    gdprConsent: {
      en: 'I consent to GX Trade securely processing my information in accordance with the UK Data Protection Act 2018 & GDPR.',
      bn: 'আমি ইউকে ডেটা প্রোটেকশন অ্যাক্ট ২০১৮ ও জিডিপিআর নীতিমালা অনুযায়ী আমার তথ্য প্রক্রিয়াকরণে সম্মতি দিচ্ছি।'
    },
    submitBtn: { en: 'Submit Official Inquiry', bn: 'অনুসন্ধান প্রেরণ করুন' },
    submitting: { en: 'Transmitting encrypted inquiry to advisors...', bn: 'পরামর্শকদের কাছে অনুসন্ধান পাঠানো হচ্ছে...' },
    successTitle: { en: 'Inquiry Received Successfully!', bn: 'আপনার অনুসন্ধান সফলভাবে গৃহীত হয়েছে!' },
    successSubtitle: {
      en: 'Our administrative compliance team has logged your inquiry. A confirmation receipt has been dispatched.',
      bn: 'আমাদের কমপ্লায়েন্স টিম আপনার অনুসন্ধান রেকর্ড করেছে এবং যাচাই শুরু করেছে।'
    },
    referenceLabel: { en: 'Query Reference Number:', bn: 'অনুসন্ধান রেফারেন্স নম্বর:' },
    assignedDeskLabel: { en: 'Assigned Advisory Desk:', bn: 'নির্ধারিত পরামর্শক ডেস্ক:' },
    expectedReplyLabel: { en: 'Estimated Response Time:', bn: 'প্রত্যাশিত প্রত্যুত্তর সময়:' },
    submitAnotherBtn: { en: 'Submit Another Query', bn: 'আরেকটি অনুসন্ধান পাঠান' },
    goToDashboardBtn: { en: 'View in Client Dashboard', bn: 'ক্লায়েন্ট ড্যাশবোর্ডে দেখুন' },
    bookAppointmentBtn: { en: 'Book Consultation Call / In-Person', bn: 'পরামর্শ বা সাক্ষাৎ বুক করুন' },
    faqTitle: { en: 'Frequently Asked Questions', bn: 'সাধারণ জিজ্ঞাসা ও উত্তর' }
  },

  // Footer
  footer: {
    aboutText: {
      en: 'GX Trade provides combined back-office support, statutory letter triage & response drafting, client form completion, certified translations, UK visa processing, and corporate flight/hotel travel management across the UK.',
      bn: 'জিএক্স ট্রেড ইউকে জুড়ে সমন্বিত ব্যাক-অফিস সহায়তা, বিধিবদ্ধ চিঠি বিশ্লেষণ ও ফর্মাল জবাব প্রস্তুত, ক্লায়েন্ট ফর্ম পূরণ, প্রত্যয়িত অনুবাদ, ইউকে ভিসা আবেদন এবং কর্পোরেট ফ্লাইট ও হোটেল বুকিং প্রদান করে।'
    },
    coreServices: { en: 'Core Services', bn: 'মূল সেবাসমূহ' },
    companyInfo: { en: 'Company Information', bn: 'প্রতিষ্ঠানের তথ্য' },
    contactHeadlines: { en: 'Office Contacts', bn: 'যোগাযোগের নম্বর' },
    copyright: {
      en: '© 2026 GX Trade (gxtrade.co.uk). All rights reserved.',
      bn: '© ২০২৬ জিএক্স ট্রেড (gxtrade.co.uk)। সর্বস্বত্ব সংরক্ষিত।'
    },
    registeredDisclaimer: {
      en: 'Registered in England and Wales. Compliant with the UK Data Protection Act 2018 & General Data Protection Regulation (GDPR).',
      bn: 'ইংল্যান্ড এবং ওয়েলসে নিবন্ধিত। ইউকে ডেটা প্রোটেকশন অ্যাক্ট ২০১৮ ও জিডিপিআর (GDPR) অনুবর্তী।'
    }
  },

  // Background Customizer
  backgroundCustomizer: {
    buttonLabel: { en: 'Customise Overview & Wallpaper', bn: 'ব্যাকগ্রাউন্ড ও ওয়ালপেপার কাস্টমাইজ করুন' },
    paletteTitle: { en: 'Overview Visual Style & Theme', bn: 'সারসংক্ষেপ পৃষ্ঠার থিম ও কালার' },
    uploadTitle: { en: 'Upload Custom Wallpaper Image', bn: 'পছন্দের ব্যাকগ্রাউন্ড ছবি আপলোড করুন' },
    quickPresets: { en: 'Quick Theme Presets:', bn: 'থিম প্রিসেট:' }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isBn: boolean;
  t: typeof TRANSLATIONS;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('gxtrade_lang');
      if (saved === 'bn' || saved === 'en') return saved;
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('gxtrade_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isBn: language === 'bn',
        t: TRANSLATIONS
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
