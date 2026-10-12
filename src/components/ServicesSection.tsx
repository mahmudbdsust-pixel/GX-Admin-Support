import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  Languages, 
  Plane, 
  Hotel, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Check, 
  Clock, 
  HelpCircle,
  FileCheck2,
  CalendarCheck2,
  Tag,
  ChevronDown,
  ChevronUp,
  Receipt,
  Sparkles
} from 'lucide-react';
import { ServiceType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServicesSectionProps {
  onSelectService: (service: ServiceType) => void;
  defaultViewMode?: 'cards' | 'pricelist';
}

interface PriceItem {
  name: string;
  nameBn?: string;
  price: string;
  unit: string;
  unitBn?: string;
  description: string;
  descriptionBn?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectService,
  defaultViewMode = 'cards' 
}) => {
  const { language, isBn } = useLanguage();
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<'all' | 'admin' | 'letters' | 'visa' | 'travel'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'pricelist'>(defaultViewMode);
  const [expandedPricingCard, setExpandedPricingCard] = useState<string | null>(null);

  const togglePricing = (id: string) => {
    setExpandedPricingCard(expandedPricingCard === id ? null : id);
  };

  const services = [
    {
      id: 'admin',
      type: 'Office Administrative Support' as ServiceType,
      title: isBn ? 'সমন্বিত অফিস প্রশাসনিক সহায়তা ও ব্যাক-অফিস সার্ভিস' : 'Combined Office Administrative Support & Service',
      category: 'admin',
      tagline: isBn ? 'যুক্তরাজ্যের ব্যবসা ও পরিচালকদের জন্য নির্ভরযোগ্য ব্যাক-অফিস অপারেশন' : 'End-to-end back-office operations for UK firms and sole traders',
      priceStarting: isBn ? 'মাসে £৩৫০ থেকে' : 'From £350 / mo',
      priceBilling: isBn ? 'মাসিক রিটেইনার অথবা £৩৫/ঘণ্টা অন-ডিমান্ড' : 'Flexible monthly retainer or £35/hr ad-hoc',
      description: isBn 
        ? 'দৈনন্দিন অফিস ব্যবস্থাপনা, ডাকযোগে আসা চিঠিপত্র গ্রহণ ও ডিজিটাল স্ক্যানিং, ইনভয়েস ও ফাইল সংরক্ষণ, শিডিউলিং এবং ক্লায়েন্ট যোগাযোগের সার্বিক সমন্বয়।'
        : 'Comprehensive day-to-day office management including correspondence handling, scheduling, invoice and document filing, client records archiving, and administrative task coordination.',
      features: isBn ? [
        'ডেডিকেটেড ইউকে পোস্টাল ঠিকানা ব্যবস্থাপনা ও ডিজিটাল স্ক্যানিং',
        'ইনভয়েস, বিলিং ও রসিদ নথিপত্র সুশৃঙ্খলভাবে সংগঠন',
        'ব্যবসায়িক চিঠিপত্র তৈরি ও টেলিফোন অভ্যর্থনা সমন্বয়',
        'ক্যালেন্ডার ডায়েরি পরিচালনা ও কর্পোরেট অ্যাপয়েন্টমেন্ট নির্ধারণ'
      ] : [
        'Dedicated UK postal address handling & digital triage',
        'Invoice, billing & receipt document organization',
        'Business correspondence drafting & phone reception coordination',
        'Diary management & corporate appointments setup'
      ],
      turnaround: isBn ? 'ধারাবাহিক / ডেডিকেটেড রিটেইনার' : 'Continuous / Dedicated retainers',
      suitableFor: isBn ? 'ক্ষুদ্র ও মাঝারি প্রতিষ্ঠান, প্রবাসী ফার্ম, ব্যস্ত পরিচালকবৃন্দ' : 'Small & medium enterprises, overseas firms, busy directors',
      pricingList: [
        { 
          name: isBn ? 'অ্যাড-হক প্রশাসনিক সহায়তা' : 'Ad-hoc Administrative Assistance', 
          price: '£35', 
          unit: isBn ? 'প্রতি ঘণ্টা' : 'per hour', 
          description: isBn ? 'অন-ডিমান্ড প্রশাসনিক সহায়তা, ফাইল ফরম্যাটিং ও তাৎক্ষণিক কাজ' : 'Flexible on-demand administrative support, document formatting, and filing' 
        },
        { 
          name: isBn ? 'পোস্টাল মেইল গ্রহণ ও ডিজিটাল স্ক্যান' : 'Basic Postal Mail Triage & Digital Scan', 
          price: '£150', 
          unit: isBn ? 'প্রতি মাসে' : 'per month', 
          description: isBn ? 'চিঠিপত্র সংগ্রহ, গোপনীয়ভাবে স্ক্যান এবং ডিজিটাল ফরোয়ার্ডিং' : 'Mail collection, confidential opening, scanning & digital forwarding' 
        },
        { 
          name: isBn ? 'স্ট্যান্ডার্ড ব্যাক-অফিস রিটেইনার' : 'Standard Back-Office Retainer', 
          price: '£350', 
          unit: isBn ? 'প্রতি মাসে' : 'per month', 
          description: isBn ? 'প্রতি মাসে ১৫ ঘণ্টা পর্যন্ত চিঠিপত্র, ফোন ও ক্যালেন্ডার সমন্বয়' : 'Up to 15 hours/mo correspondence, phone answering & calendar coordination' 
        },
        { 
          name: isBn ? 'পূর্ণাঙ্গ কর্পোরেট প্রশাসন' : 'Comprehensive Corporate Administration', 
          price: '£750', 
          unit: isBn ? 'প্রতি মাসে' : 'per month', 
          description: isBn ? 'প্রতি মাসে ৩৫ ঘণ্টা পর্যন্ত ব্যাক-অফিস অপারেশন ও রেকর্ড সংরক্ষণ' : 'Up to 35 hours/mo back-office operations, bookkeeping prep & record archiving' 
        }
      ] as PriceItem[]
    },
    {
      id: 'letters',
      type: 'Official Letter Decoding & Response' as ServiceType,
      title: isBn ? 'অফিসিয়াল চিঠি ডিকোডিং ও ফর্মাল উত্তর ড্রাফটিং' : 'Decoding Official Letters & Response Drafting',
      category: 'letters',
      tagline: isBn ? 'সরকারি নোটিশ সহজ ভাষায় বুঝুন এবং যথাসময়ে প্রাতিষ্ঠানিক জবাব দিন' : 'Break down complex government notices & reply formally',
      priceStarting: isBn ? '£৯৫ নির্দিষ্ট ফি থেকে' : 'From £95 fixed fee',
      priceBilling: isBn ? 'চিঠিপিছু স্পষ্ট নির্দিষ্ট ফি' : 'Clear fixed fee per correspondence',
      description: isBn 
        ? 'HMRC, Home Office, DWP, কাউন্টি কোর্ট বা স্থানীয় কাউন্সিল থেকে জটিল চিঠি পেয়েছেন? আমাদের বিশেষজ্ঞরা আইনগত পরিভাষা সহজ ভাষায় ব্যাখ্যা করেন, বিধিবদ্ধ ডেডলাইন চিহ্নিত করেন এবং ইউকে স্ট্যান্ডার্ড অনুযায়ী ফর্মাল জবাব ড্রাফট করেন।'
        : 'Receive dense statutory correspondence from HMRC, Home Office, Department for Work and Pensions (DWP), County Courts, or Local Councils? We translate the legal jargon into plain English, highlight immediate deadlines, and draft formal, legally compliant reply letters.',
      features: isBn ? [
        'সহজ ভাষায় চিঠির বিশ্লেষণ ও জরুরিতার মাত্রা নির্ধারণ',
        'বিধিবদ্ধ সময়সীমা ও জরিমানার ঝুঁকি চিহ্নিতকরণ',
        'ইউকে স্ট্যান্ডার্ড অনুযায়ী প্রাতিষ্ঠানিক জবাব প্রস্তুত',
        'কভার শিডিউল তৈরি ও ট্র্যাকড ডেলিভারিতে প্রেরণের ব্যবস্থা'
      ] : [
        'Plain English letter breakdown & urgency assessment',
        'Identification of statutory deadlines & risk penalties',
        'Bespoke professional response letter drafting',
        'Representation cover notes & tracked postage dispatch'
      ],
      turnaround: isBn ? '২৪ – ৪৮ ঘণ্টা' : '24 – 48 Hours',
      suitableFor: isBn ? 'সরকারি ও বিধিবদ্ধ নোটিশের মুখোমুখি ব্যক্তি ও ব্যবসায়ী' : 'Individuals & company owners facing regulatory deadlines',
      pricingList: [
        { 
          name: isBn ? 'বিধিবদ্ধ নোটিশ বিশ্লেষণ ও ডেডলাইন রিভিউ' : 'Statutory Notice Triage & Breakdown', 
          price: '£95', 
          unit: isBn ? 'নির্দিষ্ট ফি' : 'fixed fee', 
          description: isBn ? 'সহজ ভাষায় চিঠির ব্যাখ্যা, বিধিবদ্ধ ডেডলাইন যাচাই ও ঝুঁকি পর্যালোচনা' : 'Plain English breakdown, statutory deadline verification, risk review' 
        },
        { 
          name: isBn ? 'পূর্ণাঙ্গ বিশ্লেষণ ও প্রাতিষ্ঠানিক জবাব প্রস্তুত' : 'Full Triage & Formal Response Drafting', 
          price: '£160', 
          unit: isBn ? 'নির্দিষ্ট ফি' : 'fixed fee', 
          description: isBn ? 'আইনি পর্যালোচনা ও ইউকে স্ট্যান্ডার্ড অনুযায়ী কাস্টমাইজড ফর্মাল জবাব প্রস্তুত' : 'Comprehensive legal review + bespoke formal reply drafted to UK standards' 
        },
        { 
          name: isBn ? 'জরুরি পর্যালোচনা (<২৪ ঘণ্টা ডেডলাইন)' : 'Emergency Triage (<24h Deadline)', 
          price: '£240', 
          unit: isBn ? 'নির্দিষ্ট ফি' : 'fixed fee', 
          description: isBn ? 'একই দিনে তাৎক্ষণিক বিশেষজ্ঞ বরাদ্দ ও দ্রুত উত্তর প্রস্তুত' : 'Same-day urgent advisor allocation & expedited reply drafting' 
        },
        { 
          name: isBn ? 'রয়্যাল মেইল স্পেশাল ডেলিভারি প্রেরণ' : 'Royal Mail Special Delivery Dispatch', 
          price: '£45', 
          unit: isBn ? 'প্রতি ফাইল' : 'per filing', 
          description: isBn ? 'কভার শিডিউল প্রস্তুত ও রেজিস্টার্ড ট্র্যাকড ডাকযোগে প্রেরণ' : 'Cover schedule preparation, tracked delivery & filing confirmation certificate' 
        }
      ] as PriceItem[]
    },
    {
      id: 'forms',
      type: 'Form Completion & Compliance' as ServiceType,
      title: isBn ? 'ক্লায়েন্ট ফর্ম পূরণ ও প্রত্যয়িত নথি অনুবাদ' : 'Client Form Filling & Document Translation',
      category: 'letters',
      tagline: isBn ? 'সঠিক সরকারি ফর্ম পূরণ ও বহুভাষিক স্বীকৃত সার্টিফিকেট অনুবাদ' : 'Certified multi-language translation and accurate form completion',
      priceStarting: isBn ? 'পৃষ্ঠাপ্রতি £৪৫ থেকে' : 'From £45 / page',
      priceBilling: isBn ? 'ফর্ম পূরণ £৭৫ থেকে · প্রত্যয়িত অনুবাদ £৪৫/পৃষ্ঠা' : 'Form filling from £75 · Sworn translation from £45/page',
      description: isBn 
        ? 'জটিল সরকারি, ব্যাংকিং, কোম্পানিজ হাউস ও নিয়ন্ত্রক সংস্থার ফর্ম নির্ভুলভাবে পূরণ। পাশাপাশি হোম অফিস, আদালত ও ইউকে কর্তৃপক্ষের কাছে গ্রহণযোগ্য প্রত্যয়িত সার্টিফায়েড অনুবাদ (বাংলা, ইংরেজি ও অন্যান্য ভাষা)।'
        : 'Expert completion of complex government, banking, Companies House, and regulatory forms. We ensure complete business compliance and provide certified document translations (European, South Asian, Middle Eastern languages) valid for official UK authorities.',
      features: isBn ? [
        'যুক্তরাজ্যের সরকারি ও ব্যাংকিং ফর্ম নির্ভুলভাবে পূরণ',
        'হোম অফিস ও আদালতে গ্রহণযোগ্য প্রত্যয়িত সার্টিফায়েড অনুবাদ',
        'ইউকে কমপ্লায়েন্স ও নিয়মনীতি অনুযায়ী যাচাই',
        'অ্যাপোস্টিল (Apostille) ও নোটারি লিগালাইজেশন সমন্বয়'
      ] : [
        'Accurate completion of statutory UK government & banking forms',
        'Sworn certified translation for official submission',
        'Compliance check against UK standards & guidelines',
        'Apostille and notary legalization coordination'
      ],
      turnaround: isBn ? '১ – ৩ কার্যদিবস' : '1 – 3 Working Days',
      suitableFor: isBn ? 'যুক্তরাজ্যে নতুন আগমনকারী, আন্তর্জাতিক ব্যবসায়ী, কমপ্লায়েন্স অডিট' : 'New UK arrivals, international businesses, compliance audits',
      pricingList: [
        { 
          name: isBn ? 'প্রত্যয়িত অফিসিয়াল অনুবাদ (বাংলা/ইংরেজি)' : 'Certified Document Translation', 
          price: '£45', 
          unit: isBn ? 'প্রতি পৃষ্ঠা' : 'per page', 
          description: isBn ? 'হোম অফিস/ব্যাংকের জন্য অফিসিয়াল সিল ও নির্ভুলতার সনদসহ অনুবাদ' : 'Official certified sworn stamp & statement of accuracy for Home Office/Banks' 
        },
        { 
          name: isBn ? 'ব্যবসায়িক চুক্তি ও আইনি দলিল অনুবাদ' : 'Commercial Legal & Contract Translation', 
          price: '£65', 
          unit: isBn ? 'প্রতি পৃষ্ঠা' : 'per page', 
          description: isBn ? 'কর্পোরেট চুক্তি, আর্থিক বিবরণী ও ট্রেড ডকুমেন্ট অনুবাদ' : 'Specialized corporate contracts, financial statements & trade agreements' 
        },
        { 
          name: isBn ? 'স্ট্যান্ডার্ড সরকারি ফর্ম পূরণ' : 'Standard Government Form Completion', 
          price: '£75', 
          unit: isBn ? 'প্রতি ফর্ম' : 'per form', 
          description: isBn ? 'কাউন্সিল ট্যাক্স, ডিডব্লিউপি ও সাধারণ স্থানীয় আবেদনপত্র পূরণ' : 'Council tax, DWP, standard local council & registrar application forms' 
        },
        { 
          name: isBn ? 'জটিল রেগুলেটরি ও ব্যাংক ফর্ম' : 'Complex Regulatory & Bank Forms', 
          price: '£130', 
          unit: isBn ? 'প্রতি ফর্ম' : 'per form', 
          description: isBn ? 'কোম্পানিজ হাউস ফাইলিং, কর্পোরেট ব্যাংকিং ম্যান্ডেট ও কেওয়াইসি প্যাক' : 'Companies House filings, corporate banking mandates, KYC packs' 
        },
        { 
          name: isBn ? 'ফরেন অফিস (FCDO) অ্যাপোস্টিল সেবা' : 'FCDO Apostille Legalisation Service', 
          price: '£85', 
          unit: isBn ? 'প্রতি নথি + সরকারি ফি' : 'per document + gov fee', 
          description: isBn ? 'যুক্তরাজ্যের পররাষ্ট্র দপ্তর (FCDO) থেকে আন্তর্জাতিক আইনি প্রমাণীকরণ' : 'Foreign, Commonwealth & Development Office apostille legalization' 
        }
      ] as PriceItem[]
    },
    {
      id: 'visa',
      type: 'Visa Application Processing' as ServiceType,
      title: isBn ? 'ভিসা আবেদন প্রক্রিয়াকরণ ও যাচাইকরণ' : 'Visa Application Processing & Verification',
      category: 'visa',
      tagline: isBn ? 'যুক্তরাজ্য ও আন্তর্জাতিক ভিজিটর এবং এন্ট্রি ক্লিয়ারেন্স আবেদন' : 'UK and international entry clearance & visitor applications',
      priceStarting: isBn ? 'আবেদনকারীপ্রতি £২৫০ থেকে' : 'From £250 / applicant',
      priceBilling: isBn ? 'সর্বসাকুল্যে সম্পূর্ণ প্যাকেজ' : 'All-inclusive representation packages',
      description: isBn 
        ? 'ইউকে স্ট্যান্ডার্ড ভিজিটর ভিসা, ফ্যামিলি ভিসা, স্কিল্ড ওয়ার্কার, বিজনেস ভিসা ও শেনজেন ভিসার জন্য প্রমাণপত্র যাচাই, স্পনসর ও কভার লেটার প্রস্তুত এবং নির্ভুল অনলাইন আবেদন সহায়তা।'
        : 'Structured assistance for UK Standard Visitor Visas, Family Visas, Skilled Worker applications, Business Visas, and Schengen entry. We verify your evidence, prepare tailored sponsor/cover letters, and verify every submission to maximize approval chances.',
      features: isBn ? [
        'যোগ্যতা যাচাই ও নথিপত্রের গভীর অডিট',
        'স্পনসর লেটার ও বিস্তারিত কভার লেটার ড্রাফটিং',
        'ডিজিটাল ভিসা পোর্টালে ফর্ম পূরণ ও ফি পেমেন্ট সহায়তা',
        'লন্ডন ও যুক্তরাজ্যের সেন্টারে বায়োমেট্রিক অ্যাপয়েন্টমেন্ট নির্ধারণ'
      ] : [
        'Comprehensive eligibility check & document audit',
        'Cover letter & sponsor documentation drafting',
        'Digital visa portal form completion & fee submission',
        'Biometric appointment scheduling in London & UK centres'
      ],
      turnaround: isBn ? 'কেসের ওপর নির্ভরশীল (জরুরি অপশন উপলব্ধ)' : 'Case dependent (Expedited options available)',
      suitableFor: isBn ? 'পর্যটক, ব্যবসায়িক প্রতিনিধি, আত্মীয়স্বজন, শিক্ষার্থী' : 'Tourists, business delegates, visiting relatives, students',
      pricingList: [
        { 
          name: isBn ? 'ইউকে স্ট্যান্ডার্ড ভিজিটর ভিসা (ভ্রমণ/পারিবারিক)' : 'UK Standard Visitor Visa (Tourism/Family)', 
          price: '£250', 
          unit: isBn ? 'প্রতি আবেদনকারী' : 'per applicant', 
          description: isBn ? 'নথিপত্র অডিট, কভার লেটার ও ইউকেভিআই সাবমিশন ও বায়োমেট্রিক বুকিং' : 'Evidence audit, cover letter drafting, UKVI digital submission & biometric booking' 
        },
        { 
          name: isBn ? 'বিজনেস ভিজিটর ও প্রতিনিধি ভিসা' : 'Business Visitor & Delegation Visa', 
          price: '£350', 
          unit: isBn ? 'প্রতি আবেদনকারী' : 'per applicant', 
          description: isBn ? 'কর্পোরেট স্পনসরশিপ শিডিউল, ব্যবসায়িক ভ্রমণসূচি ও ইনভিটেশন যাচাই' : 'Corporate sponsorship schedule, business itinerary & invitation verification' 
        },
        { 
          name: isBn ? 'শেনজেন ইউরোপিয়ান ভিসা ফাইল প্রস্তুত' : 'Schengen European Visa File Prep', 
          price: '£195', 
          unit: isBn ? 'প্রতি আবেদনকারী' : 'per applicant', 
          description: isBn ? 'ভিএফএস/টিএলএস অ্যাপয়েন্টমেন্ট, সম্পূর্ণ ডসিয়ার যাচাই ও দূতাবাস ফাইল' : 'VFS/TLS appointments, complete dossier check & embassy itinerary pack' 
        },
        { 
          name: isBn ? 'স্কিল্ড ওয়ার্কার / স্পনসর ফাইল অডিট' : 'Skilled Worker / Sponsor File Audit', 
          price: '£490', 
          unit: isBn ? 'প্রতি আবেদনকারী' : 'per applicant', 
          description: isBn ? 'সিওএস (CoS) যাচাই, রক্ষণাবেক্ষণ প্রমাণ ও ইউকেভিআই সম্মতি রিভিউ' : 'Certificate of sponsorship check, maintenance evidence & UKVI compliance review' 
        },
        { 
          name: isBn ? 'স্পাউস ও ফ্যামিলি সেটেলমেন্ট ফাইল' : 'Spouse & Family Settlement Clearance', 
          price: '£650', 
          unit: isBn ? 'প্রতি আবেদনকারী' : 'per applicant', 
          description: isBn ? 'আর্থিক থ্রেশহোল্ড মূল্যায়ন ও পারিবারিক সম্পর্কের প্রামাণ্য নথির বান্ডেল' : 'Detailed financial threshold evaluation & comprehensive relationship bundle' 
        }
      ] as PriceItem[]
    },
    {
      id: 'travel',
      type: 'Flight & Hotel Booking' as ServiceType,
      title: isBn ? 'বিমান টিকিট ও হোটেল রিজার্ভেশন ডেস্ক' : 'Air Tickets & Hotel Reservations',
      category: 'travel',
      tagline: isBn ? 'কর্পোরেট ভ্রমণ ও ব্যক্তিগত ফ্লাইট-হোটেল রিজার্ভেশন' : 'Corporate travel itineraries and personalized booking desk',
      priceStarting: isBn ? 'বুকিংপ্রতি £৩৫ থেকে' : 'From £35 / booking',
      priceBilling: isBn ? 'টিকিটের মূল্যের উপর কোনো লুকানো অতিরিক্ত ফি নেই' : 'Zero hidden fees on airline & hotel fares',
      description: isBn 
        ? 'কর্পোরেট দল ও সাধারণ যাত্রীদের জন্য সেরা রুটের ফ্লাইট টিকিট, ব্যবসায়িক হোটেল রেট, ভিসা আবেদনের উপযোগী ভেরিফায়েবল বুকিং ভাউচার এবং ২৪/৭ রি-বুকিং সহায়তা।'
        : 'Full travel management for individuals and corporate teams. We find optimal flight routes with flexible cancellation, negotiate business hotel rates, issue verified booking vouchers, and handle urgent itinerary changes.',
      features: isBn ? [
        'ইকোনমি ও বিজনেস ক্লাসের সেরা বিমান ভাড়া প্রদান',
        'বিশ্বজুড়ে যাচাইকৃত কর্পোরেট ও পারিবারিক হোটেল রিজার্ভেশন',
        'ভিসা আবেদনের জন্য তাৎক্ষণিক যাচাইযোগ্য ফ্লাইট ও হোটেল ভাউচার',
        '২৪/৭ ফ্লাইট রিশিডিউলিং ও ভ্রমণ পরিবর্তন সহায়তা'
      ] : [
        'Competitive global airfare sourcing (Economy, Premium, Business)',
        'Vetted corporate & leisure hotel reservations worldwide',
        'Flight reservation vouchers suitable for visa evidence',
        '24/7 rebooking and travel disruption support'
      ],
      turnaround: isBn ? 'তাৎক্ষণিক কোটেশন / একই দিনে টিকিট ইস্যু' : 'Instant quotes / Same-day ticketing',
      suitableFor: isBn ? 'ব্যবসায়িক প্রতিনিধি, পরিচালকবৃন্দ, পরিবার ও ভ্রমণপিপাসু' : 'Business delegations, executives, vacationers, family groups',
      pricingList: [
        { 
          name: isBn ? 'ইকোনমি ফ্লাইট বুকিং সেবা' : 'Economy Flight Booking Service', 
          price: '£35', 
          unit: isBn ? 'প্রতি যাত্রী' : 'per passenger', 
          description: isBn ? 'ফ্লাইট সার্চ, সিট নির্বাচন ও ২৩ কেজি লাগেজ সহ টিকিট ইস্যু' : 'Airfare sourcing, seat selection, 23kg check-in baggage & ticket issuance' 
        },
        { 
          name: isBn ? 'এক্সিকিউটিভ ও বিজনেস ক্লাস ডেস্ক' : 'Executive & Business Class Itinerary Desk', 
          price: '£55', 
          unit: isBn ? 'প্রতি যাত্রী' : 'per passenger', 
          description: isBn ? 'লাউঞ্জ সুবিধা, প্রিমিয়াম সার্ভিস ও কর্পোরেট ইনভয়েস' : 'Priority lounge access, chauffeur link, corporate billing invoice' 
        },
        { 
          name: isBn ? 'ভিসা কনফার্মড ফ্লাইট ও হোটেল রিজার্ভেশন প্যাক' : 'Visa Flight & Hotel Reservation Pack', 
          price: '£50', 
          unit: isBn ? 'সম্পূর্ণ প্যাক' : 'complete pack', 
          description: isBn ? 'ভিসা আবেদনের জন্য যাচাইযোগ্য কনফার্মড টিকিট ও হোটেল ভাউচার' : 'Verifiable confirmed flight reservation & hotel voucher recognized by UKVI' 
        },
        { 
          name: isBn ? 'কর্পোরেট হোটেল সোর্সিং ও বুকিং' : 'Corporate Hotel Sourcing & Booking', 
          price: isBn ? 'ফ্রি' : 'Free', 
          unit: isBn ? 'ফ্লাইটের সাথে / একক £৩০' : 'with flight / £30 alone', 
          description: isBn ? 'কর্পোরেট রেট, প্রাতরাশ অন্তর্ভুক্ত ও ফ্লেক্সিবল বাতিল সুবিধা' : 'Negotiated business rates, breakfast included, flexible corporate cancellation' 
        }
      ] as PriceItem[]
    },
    {
      id: 'consultancy',
      type: 'General Business Consultancy' as ServiceType,
      title: isBn ? 'প্রশাসনিক ও ব্যবসায়িক স্ট্র্যাটেজিক কনসালটেন্সি' : 'Administrative & Strategic Consultancy Service',
      category: 'admin',
      tagline: isBn ? 'যুক্তরাজ্যে ব্যবসা পরিচালনা ও নিয়মকানুনের ওপর বিশেষায়িত পরামর্শ' : 'Specialized advisory for business setup and operations',
      priceStarting: isBn ? 'সেশনপ্রতি £৭৫ থেকে' : 'From £75 / session',
      priceBilling: isBn ? 'সেন্ট অ্যালবান্স, ইলফোর্ড অথবা ভিডিও/ফোনে পরামর্শ' : 'Consultations at St Albans, Ilford or Online',
      description: isBn 
        ? 'যুক্তরাজ্যের প্রশাসনিক নিয়ম, কমপ্লায়েন্স ও অপারেশনাল বিষয়ে প্রতিষ্ঠান ও ব্যক্তিদের জন্য বিশেষজ্ঞ পরামর্শ। সেন্ট অ্যালবান্স ও ইলফোর্ড অফিসে সরাসরি অথবা নিরাপদ ভিডিও/ফোনে আলোচনা।'
        : 'Practical advisory services for individuals and companies navigating UK administrative requirements, operational procedures, compliance standards, and expansion planning. Both in-person at our St Albans and Ilford offices and via secure remote consultations.',
      features: isBn ? [
        'ব্যবসা কাঠামো ও প্রশাসনিক সেটআপের রোডম্যাপ',
        'অপারেশনাল পদ্ধতি ও প্রাথমিক চুক্তিসমূহ পর্যালোচনা',
        'ব্যক্তিগত প্রশাসনিক জটিলতা ও কাউন্সিল পেপারওয়ার্ক সমাধান',
        'সেন্ট অ্যালবান্স ও লন্ডন অফিসে মুখোমুখি কনসালটেশন'
      ] : [
        'Business structure & administrative setup roadmap',
        'Review of standard operating procedures & contracts',
        'Individual administrative guidance & council paperwork support',
        'Direct consultation at St Albans Head Office or Ilford London'
      ],
      turnaround: isBn ? 'নির্ধারিত সেশন (১ ঘণ্টা থেকে পূর্ণাঙ্গ পরামর্শ)' : 'Scheduled sessions (1 hour to multi-day advisory)',
      suitableFor: isBn ? 'নতুন উদ্যোক্তা, ইউকেতে প্রসারমান কোম্পানি, সাধারণ সেবাগ্রহীতা' : 'Entrepreneurs, expanding foreign businesses, individuals',
      pricingList: [
        { 
          name: isBn ? 'প্রাথমিক প্রশাসনিক কনসালটেশন' : 'Initial Administrative Consultation', 
          price: '£75', 
          unit: isBn ? '৪৫ মিনিট' : '45 mins', 
          description: isBn ? 'সরাসরি সেন্ট অ্যালবান্স/ইলফোর্ডে অথবা ফোনে গোপনীয় পরামর্শ' : 'In-person at St Albans, Ilford London, or confidential phone/video consultation' 
        },
        { 
          name: isBn ? 'পূর্ণাঙ্গ ব্যবসায়িক কৌশল ও রূপরেখা' : 'Comprehensive Business Strategy Advisory', 
          price: '£150', 
          unit: isBn ? '৯০ মিনিট' : '90 mins', 
          description: isBn ? 'বিস্তারিত প্রশাসনিক রোডম্যাপ ও কমপ্লায়েন্স ডিজাইন' : 'In-depth operating roadmap, administrative compliance & process design' 
        },
        { 
          name: isBn ? 'কর্পোরেট অপারেটিং ও কমপ্লায়েন্স অডিট' : 'Corporate Operating & Compliance Audit', 
          price: '£450', 
          unit: isBn ? 'পূর্ণাঙ্গ' : 'comprehensive', 
          description: isBn ? 'প্রতিষ্ঠানের নথিপত্র ও বিধিবদ্ধ কমপ্লায়েন্সের পূর্ণাঙ্গ অডিট' : 'Full review of corporate paperwork, record keeping & statutory compliance' 
        },
        { 
          name: isBn ? 'ব্যক্তিগত পেপারওয়ার্ক ও আপিল পরামর্শ' : 'Personal Administrative Advisory & Appeals', 
          price: '£65', 
          unit: isBn ? 'প্রতি ঘণ্টা' : 'per hour', 
          description: isBn ? 'ব্যক্তিগত অফিসিয়াল চিঠির জটিলতা ও আপিল সহায়তা' : 'Assistance with personal paperwork disputes, appeals & official correspondence' 
        }
      ] as PriceItem[]
    }
  ];

  const filteredServices = selectedServiceFilter === 'all' 
    ? services 
    : services.filter(s => s.category === selectedServiceFilter);

  return (
    <section id="services-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md mb-3">
            <Receipt className="w-3.5 h-3.5" />
            <span>{isBn ? 'স্বচ্ছ ইউকে ফি ও সেবার তালিকা' : 'Official Price Schedule & Services'}</span>
            <span aria-hidden="true">·</span>
            <span>gxtrade.co.uk</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {isBn ? 'সেবাসমূহ ও স্বচ্ছ মূল্য তালিকা' : 'Services & Transparent Price List'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {isBn 
              ? 'কোনো গোপন চার্জ নেই, সম্পূর্ণ স্বচ্ছ ও নির্ধারিত ফি। সেন্ট অ্যালবান্স ও লন্ডন ইলফোর্ড অফিসের অভিজ্ঞ বিশেষজ্ঞদের দ্বারা প্রতিটি সেবা সম্পন্ন হয়।'
              : 'Clear, upfront pricing with no hidden charges. All services are performed by qualified consultants at our St Albans and London Ilford offices.'}
          </p>

          {/* Toggle between Card View and Master Price Schedule */}
          <div className="mt-6 inline-flex p-1 bg-slate-200 rounded-lg">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center gap-2 ${
                viewMode === 'cards' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isBn ? 'বিস্তারিত সেবা কার্ড' : 'Service Cards & Features'}</span>
            </button>
            <button
              onClick={() => setViewMode('pricelist')}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center gap-2 ${
                viewMode === 'pricelist' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Receipt className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {isBn 
                  ? `সম্পূর্ণ ফি তালিকা (${services.reduce((acc, s) => acc + s.pricingList.length, 0)}টি আইটেম)` 
                  : `Complete Master Price List (${services.reduce((acc, s) => acc + s.pricingList.length, 0)} Items)`}
              </span>
            </button>
          </div>

          {/* Category filters (active in cards view) */}
          {viewMode === 'cards' && (
            <div className="mt-4 flex flex-wrap justify-center gap-1.5 p-1 bg-slate-200/80 rounded-lg max-w-xl mx-auto">
              <button
                onClick={() => setSelectedServiceFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedServiceFilter === 'all' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isBn ? `সকল সেবা (${services.length})` : `All Services (${services.length})`}
              </button>
              <button
                onClick={() => setSelectedServiceFilter('admin')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedServiceFilter === 'admin' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isBn ? 'অফিস সাপোর্ট' : 'Office Support'}
              </button>
              <button
                onClick={() => setSelectedServiceFilter('letters')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedServiceFilter === 'letters' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isBn ? 'চিঠি ও ফর্ম' : 'Letters & Forms'}
              </button>
              <button
                onClick={() => setSelectedServiceFilter('visa')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedServiceFilter === 'visa' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isBn ? 'ভিসা সেবা' : 'Visas'}
              </button>
              <button
                onClick={() => setSelectedServiceFilter('travel')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedServiceFilter === 'travel' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isBn ? 'ফ্লাইট ও হোটেল' : 'Flights & Hotels'}
              </button>
            </div>
          )}
        </div>

        {/* VIEW 1: SERVICE CARDS WITH INTEGRATED PRICING DROPDOWNS */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((svc) => (
              <div 
                key={svc.id}
                className="bg-white rounded-xl border border-slate-200/90 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div>
                  {/* Top Price Kicker */}
                  <div className="flex items-center justify-between text-xs mb-3 border-b border-slate-100 pb-3">
                    <span className="font-semibold text-slate-500">{svc.tagline}</span>
                    <span className="font-extrabold text-xs text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
                      {svc.priceStarting}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {svc.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isBn ? 'প্রক্রিয়াকরণ সময়:' : 'Turnaround:'} <strong>{svc.turnaround}</strong></span>
                  </div>

                  {/* Feature checklist */}
                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {isBn ? 'অন্তর্ভুক্ত সেবাসমূহ:' : 'Included Services:'}
                    </p>
                    {svc.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable itemized pricing panel */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => togglePricing(svc.id)}
                      className="w-full flex items-center justify-between text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-amber-700" />
                        <span>
                          {isBn 
                            ? `বিস্তারিত ফি তালিকা দেখুন (${svc.pricingList.length}টি অপশন)` 
                            : `View Itemized Price List (${svc.pricingList.length} Options)`}
                        </span>
                      </span>
                      {expandedPricingCard === svc.id ? (
                        <ChevronUp className="w-4 h-4 text-amber-700" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-amber-700" />
                      )}
                    </button>

                    {expandedPricingCard === svc.id && (
                      <div className="mt-3 space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs animate-fade-in">
                        {svc.pricingList.map((p, pIdx) => (
                          <div key={pIdx} className="border-b border-slate-200/70 pb-2 last:border-none last:pb-0">
                            <div className="flex justify-between items-baseline font-bold text-slate-900">
                              <span>{p.name}</span>
                              <span className="text-amber-700 font-mono text-xs">{p.price} <span className="text-[10px] text-slate-500 font-normal">{p.unit}</span></span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">{p.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom action button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectService(svc.type)}
                    className="w-full py-2.5 px-4 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <CalendarCheck2 className="w-4 h-4" />
                    <span>{isBn ? 'এই সেবার জন্য বুকিং / অনুসন্ধান' : 'Book / Inquire for this Service'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: COMPLETE MASTER PRICE SCHEDULE TABLE */}
        {viewMode === 'pricelist' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {isBn ? 'অফিসিয়াল ফি শিডিউল' : 'Official Schedule of Fees'}
                </span>
                <h3 className="text-xl font-bold mt-1">
                  {isBn ? 'জিএক্স ট্রেড ইউকে সম্পূর্ণ মূল্য তালিকা' : 'GX Trade UK Complete Price Tariff'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn 
                    ? 'সেন্ট অ্যালবান্স হেড অফিস এবং লন্ডন ইলফোর্ড উভয় শাখায় নির্ধারিত মানসম্মত ফি।' 
                    : 'Standard professional fees applicable across St Albans Head Office & London Ilford branches.'}
                </p>
              </div>
              <div className="text-xs text-slate-300 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
                <span>{isBn ? 'সরাসরি হেল্পডেস্ক:' : 'Direct Desk:'} <strong>01727 301083</strong> / <strong>020 3581 3133</strong></span>
              </div>
            </div>

            <div className="divide-y divide-slate-200">
              {services.map((svcGroup) => (
                <div key={svcGroup.id} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                        <span>{svcGroup.title}</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{svcGroup.tagline}</p>
                    </div>
                    <button
                      onClick={() => onSelectService(svcGroup.type)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-amber-600 transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
                    >
                      {isBn ? 'এই সেবা বুক করুন' : 'Book This Service'}
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                          <th className="py-2.5 px-3">{isBn ? 'সেবার বিবরণ' : 'Service Item'}</th>
                          <th className="py-2.5 px-3">{isBn ? 'নির্ধারিত ফি' : 'Fee / Rate'}</th>
                          <th className="py-2.5 px-3">{isBn ? 'বিলিং ভিত্তি' : 'Billing Basis'}</th>
                          <th className="py-2.5 px-3">{isBn ? 'যা যা অন্তর্ভুক্ত রয়েছে' : 'Coverage & What is Included'}</th>
                          <th className="py-2.5 px-3 text-right">{isBn ? 'পদক্ষেপ' : 'Action'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {svcGroup.pricingList.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-3 font-bold text-slate-900">
                              {item.name}
                            </td>
                            <td className="py-3 px-3 font-mono font-bold text-amber-800 text-sm">
                              {item.price}
                            </td>
                            <td className="py-3 px-3 text-slate-600 font-medium">
                              {item.unit}
                            </td>
                            <td className="py-3 px-3 text-slate-600 max-w-md">
                              {item.description}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => onSelectService(svcGroup.type)}
                                className="text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
                              >
                                {isBn ? 'নির্বাচন' : 'Select'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Guarantee Notice */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>{isBn ? 'স্থায়ী ফি স্বচ্ছতা নিশ্চয়তা:' : 'Fixed Price Transparency:'}</strong>{' '}
                  {isBn 
                    ? 'কাজের শুরুতে নির্ধারিত কোটেশন অপরিবর্তনীয়। সরকারি বিধিবদ্ধ ফি (যেমন: ইউকেভিআই ভিসা ফি, এফসিডিও অ্যাপোস্টিল ফি) সরাসরি প্রকৃত খরচে প্রদান করা হয়।' 
                    : 'Quotes agreed prior to instruction are binding. Government statutory application fees (e.g., UKVI visa fees, FCDO apostille fees) are disbursed directly at cost.'}
                </span>
              </div>
              <button
                onClick={() => setViewMode('cards')}
                className="text-slate-700 hover:text-slate-900 font-semibold underline shrink-0 cursor-pointer"
              >
                {isBn ? 'কার্ড ভিউতে ফিরে যান' : 'Return to Cards View'}
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
