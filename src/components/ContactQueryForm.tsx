import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  HelpCircle, 
  FileText, 
  UploadCloud, 
  Calendar, 
  ArrowRight, 
  MessageSquare, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Briefcase, 
  ChevronDown,
  Globe,
  Lock
} from 'lucide-react';
import { OFFICE_LOCATIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { ContactInquiry, OfficeLocation, ServiceType } from '../types';

interface ContactQueryFormProps {
  onSubmitInquiry?: (inquiry: ContactInquiry) => void;
  onNavigateToBooking?: () => void;
  onNavigateToUpload?: () => void;
  onNavigateToDashboard?: () => void;
}

interface PresetQuery {
  id: string;
  badge: { en: string; bn: string };
  category: ServiceType | 'Urgent Notice Triage' | 'General Inquiry';
  subject: { en: string; bn: string };
  message: { en: string; bn: string };
  urgency: 'Normal' | 'Urgent' | 'Critical';
}

const PRESET_QUERIES: PresetQuery[] = [
  {
    id: 'hmrc-letter',
    badge: { en: 'HMRC / Council Letter', bn: 'HMRC / কাউন্সিল চিঠি' },
    category: 'Official Letter Decoding & Response',
    subject: { 
      en: 'Urgent review & response drafting for HMRC Statutory Notice', 
      bn: 'HMRC বিধিবদ্ধ নোটিশের জরুরি পর্যালোচনা ও জবাব প্রস্তুত' 
    },
    message: { 
      en: 'I recently received a formal notice from HMRC regarding tax assessment / compliance clarification. I require assistance decoding the requirements, calculating the strict deadline, and drafting a formal reply citing our UK registered office.',
      bn: 'আমি সম্প্রতি HMRC থেকে একটি আনুষ্ঠানিক নোটিশ পেয়েছি। নির্দেশনাবলী বিশ্লেষণ, সময়সীমা নিশ্চিতকরণ এবং ইউকে নিবন্ধিত অফিসের রেফারেন্স সহ উপযুক্ত জবাব তৈরির জন্য পরামর্শ প্রয়োজন।'
    },
    urgency: 'Urgent'
  },
  {
    id: 'visa-application',
    badge: { en: 'UK Visa & Immigration', bn: 'ইউকে ভিসা ও ইমিগ্রেশন' },
    category: 'Visa Application Processing',
    subject: { 
      en: 'UK Visa application form check & supporting document review', 
      bn: 'ইউকে ভিসা আবেদন ফর্ম যাচাই ও প্রয়োজনীয় ডকুমেন্টস অডিট' 
    },
    message: { 
      en: 'We are preparing a UK visa application (Standard Visitor / Skilled Worker / Business Delegate). We need an expert audit of our application forms, bank statements, and company sponsorship letters before formal UKVI submission.',
      bn: 'আমরা ইউকে ভিসা আবেদন প্রস্তুত করছি। ফর্ম পূরণ, ব্যাংক স্টেটমেন্ট এবং স্পনসরশিপ ডকুমেন্টসের নিখুঁত অডিট ও যাচাইয়ের জন্য সহায়তা প্রয়োজন।'
    },
    urgency: 'Normal'
  },
  {
    id: 'certified-translation',
    badge: { en: 'Certified Translation', bn: 'প্রত্যয়িত বাংলা-ইংরেজি অনুবাদ' },
    category: 'Document Translation',
    subject: { 
      en: 'Certified translation request (Bengali to English / UKVI legal standard)', 
      bn: 'প্রত্যয়িত অনুবাদ অনুরোধ (বাংলা থেকে ইংরেজি / ইউকেভিআই মানদণ্ড)' 
    },
    message: { 
      en: 'I have official foreign language certificates (trade license, nikahnama, bank statements, legal deeds) requiring sworn certified translation with certification stamp for UK official submission.',
      bn: 'আমার কিছু মূল সনদপত্র ও ব্যবসায়িক নথির (ট্রেড লাইসেন্স, নিকাহনামা, দলিল ইত্যাদি) ইউকে সরকারি ব্যবহারের জন্য প্রত্যয়িত (certified) অনুবাদ প্রয়োজন।'
    },
    urgency: 'Normal'
  },
  {
    id: 'admin-retainer',
    badge: { en: 'Office Admin & Post Retainer', bn: 'অফিস ডাক ও অ্যাডমিন রিটেইনার' },
    category: 'Office Administrative Support',
    subject: { 
      en: 'Monthly Office Administration & Postal Forwarding Retainer inquiry', 
      bn: 'মাসিক অফিস প্রশাসন ও ডাক ফরোয়ার্ডিং রিটেইনার প্যাকেজ' 
    },
    message: { 
      en: 'Our company requires ongoing business support: registered office postal management, statutory post scanning, telephone answering, and regular correspondence handling.',
      bn: 'আমাদের ব্যবসায়ী প্রতিষ্ঠানের জন্য নিয়মিত ডাক চিঠি স্ক্যানিং, কর্পোরেট টেলিফোন রিসিভিং এবং অ্যাডমিন ব্যবস্থাপনার রিটেইনার সেবা দরকার।'
    },
    urgency: 'Normal'
  },
  {
    id: 'travel-reservation',
    badge: { en: 'Flight & Hotel Desk', bn: 'বিমান টিকিট ও হোটেল ডেস্ক' },
    category: 'Flight & Hotel Booking',
    subject: { 
      en: 'Corporate flight reservation & verifiable hotel itinerary booking', 
      bn: 'কর্পোরেট ফ্লাইট টিকিট ও ভিসা রিজার্ভেশন ভাউচার বুকিং' 
    },
    message: { 
      en: 'Looking for tailored flight tickets and verified hotel reservation confirmation vouchers suitable for executive business travel and embassy visa documentation.',
      bn: 'কর্পোরেট কর্মকর্তা অথবা ভিসা আবেদনের জন্য নিশ্চিত বিমান টিকিট ও হোটেল রিজার্ভেশন কোটেশন প্রয়োজন।'
    },
    urgency: 'Normal'
  }
];

export const ContactQueryForm: React.FC<ContactQueryFormProps> = ({
  onSubmitInquiry,
  onNavigateToBooking,
  onNavigateToUpload,
  onNavigateToDashboard
}) => {
  const { language, isBn, t } = useLanguage();

  // Form State
  const [fullName, setFullName] = useState('Mahmud Hasan');
  const [email, setEmail] = useState('mahmud.bd.sust@gmail.com');
  const [phone, setPhone] = useState('07700 900123');
  const [companyName, setCompanyName] = useState('Global Enterprise & Company Ltd');
  const [category, setCategory] = useState<ServiceType | 'Urgent Notice Triage' | 'General Inquiry'>('Official Letter Decoding & Response');
  const [preferredOffice, setPreferredOffice] = useState<OfficeLocation>('St Albans Head Office');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent' | 'Critical'>('Urgent');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'Email' | 'Phone Call' | 'WhatsApp'>('Email');
  const [subject, setSubject] = useState('Urgent review & response drafting for HMRC Statutory Notice');
  const [message, setMessage] = useState(
    'I recently received an official notice requiring clarification on registered company records. Please advise on response drafting and statutory compliance deadlines.'
  );
  const [consentChecked, setConsentChecked] = useState(true);

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<ContactInquiry | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Handle Preset Selection
  const handleSelectPreset = (preset: PresetQuery) => {
    setCategory(preset.category);
    setSubject(preset.subject[language]);
    setMessage(preset.message[language]);
    setUrgency(preset.urgency);
    setFormError(null);
  };

  // Handle Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError(isBn ? 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।' : 'Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError(isBn ? 'একটি বৈধ ইমেইল ঠিকানা প্রদান করুন।' : 'Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setFormError(isBn ? 'অনুগ্রহ করে যোগাযোগের একটি ফোন নম্বর লিখুন।' : 'Please provide a contact phone number.');
      return;
    }
    if (!subject.trim()) {
      setFormError(isBn ? 'অনুগ্রহ করে অনুসন্ধানের বিষয় বা শিরোনাম লিখুন।' : 'Please specify a query subject.');
      return;
    }
    if (!message.trim() || message.trim().length < 15) {
      setFormError(isBn ? 'অনুগ্রহ করে আপনার অনুসন্ধানের বিস্তারিত বিবরণ লিখুন (কমপক্ষে ১৫ অক্ষর)।' : 'Please provide more details about your inquiry (at least 15 characters).');
      return;
    }
    if (!consentChecked) {
      setFormError(isBn ? 'ডেটা প্রক্রিয়াকরণ ও জিডিপিআর সম্মতির বক্সে টিক দিন।' : 'Please check the consent box to proceed.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const referenceNo = `GXT-QRY-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newInquiry: ContactInquiry = {
        id: `inquiry-${Date.now()}`,
        referenceNo,
        fullName,
        email,
        phone,
        companyName: companyName.trim() || undefined,
        category,
        preferredOffice,
        urgency,
        preferredContactMethod,
        subject,
        message,
        createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Received'
      };

      setSubmittedInquiry(newInquiry);
      setIsSubmitting(false);

      if (onSubmitInquiry) {
        onSubmitInquiry(newInquiry);
      }
    }, 700);
  };

  const handleCopyReference = (refNo: string) => {
    navigator.clipboard.writeText(refNo);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleResetForm = () => {
    setSubmittedInquiry(null);
    setSubject('');
    setMessage('');
    setFormError(null);
  };

  const faqs = [
    {
      q: {
        en: 'How quickly will an advisor respond to my query?',
        bn: 'পরামর্শকরা কত দ্রুত আমার অনুসন্ধানের উত্তর দেবেন?'
      },
      a: {
        en: 'For inquiries marked as Urgent or Critical, our duty compliance team acknowledges within 2 to 4 business hours. Standard inquiries are addressed within the same business day (during 09:00 - 18:00 UK time).',
        bn: 'জরুরি (Urgent/Critical) হিসেবে চিহ্নিত অনুসন্ধানের ক্ষেত্রে আমাদের কমপ্লায়েন্স টিম ২ থেকে ৪ কর্মঘণ্টার মধ্যে সাড়া দেয়। সাধারণ অনুসন্ধানসমূহ একই কার্যদিবসের মধ্যে সমাধান করা হয়।'
      }
    },
    {
      q: {
        en: 'Can I discuss my matter in Bengali (বাংলা)?',
        bn: 'আমি কি বাংলায় (Bengali) আলোচনা ও সহায়তা পেতে পারি?'
      },
      a: {
        en: 'Yes, absolutely! We have dedicated bilingual caseworkers and senior advisors at both our St Albans and London Ilford offices fluent in English and Bengali.',
        bn: 'হ্যাঁ, অবশ্যই! আমাদের সেন্ট অ্যালবান্স হেড অফিস এবং লন্ডন ইলফোর্ড ডেস্কে সম্পূর্ণ বাংলা এবং ইংরেজি জানা অভিজ্ঞ কনসালট্যান্ট ও পরামর্শক রয়েছেন।'
      }
    },
    {
      q: {
        en: 'What if I have an impending statutory deadline from HMRC or the Home Office?',
        bn: 'যদি আমার HMRC বা হোম অফিসের চিঠি জমা দেওয়ার ডেডলাইন অত্যন্ত সন্নিকটে থাকে?'
      },
      a: {
        en: 'Please select "Urgent" or "Critical" in the inquiry form and paste the statutory agency and date. You can also utilize our interactive Letter Decoder Tool or upload your notice directly for immediate formal drafting.',
        bn: 'অনুগ্রহ করে ফর্মে "Urgent" নির্বাচন করুন এবং সংস্থার নাম ও সময়সীমা উল্লেখ করুন। তাৎক্ষণিক খসড়া তৈরির জন্য আপনি আমাদের "Letter Decoder Tool" ব্যবহার করতে পারেন বা ফাইল আপলোড করতে পারেন।'
      }
    },
    {
      q: {
        en: 'Can I visit in person at St Albans or London Ilford without an appointment?',
        bn: 'অ্যাপয়েন্টমেন্ট ছাড়া সরাসরি অফিসে এসে ফাইল জমা দেওয়া যাবে কি?'
      },
      a: {
        en: 'Our London Ilford desk welcomes walk-ins for rapid document drop-off and certified translations between 09:30 and 18:30 (Mon-Fri). For thorough strategic consultations at St Albans Head Office, we strongly recommend booking in advance.',
        bn: 'লন্ডন ইলফোর্ড ডেস্কে জরুরি ফাইল ড্রপ ও অনুবাদের জন্য সরাসরি ওয়াক-ইন সুবিধা রয়েছে। সেন্ট অ্যালবান্স হেড অফিসে দীর্ঘ প্রাতিষ্ঠানিক আলোচনার জন্য অগ্রিম বুকিং সুপারিশ করা হয়।'
      }
    }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full mb-3 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.contact.badge[language]}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">gxtrade.co.uk</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {t.contact.title[language]}
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {t.contact.subtitle[language]}
          </p>
        </div>

        {/* Quick Contact Switchboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {/* St Albans Head Office */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded">
                  {isBn ? 'হেড অফিস (সেন্ট অ্যালবান্স)' : 'Head Office'}
                </span>
                <Building2 className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">St Albans, Hertfordshire</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBn ? 'কৌশলগত প্রশাসন ও কমপ্লায়েন্স কেন্দ্র' : 'Executive Administration & Compliance'}
                </p>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <a href={`tel:${OFFICE_LOCATIONS.headOffice.phone}`} className="font-mono font-bold text-slate-900 hover:text-amber-700">
                    {OFFICE_LOCATIONS.headOffice.formattedPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <a href={`mailto:${OFFICE_LOCATIONS.headOffice.email}`} className="text-slate-700 hover:text-amber-700">
                    {OFFICE_LOCATIONS.headOffice.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Mon - Fri: 09:00 - 18:00</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{isBn ? 'সরাসরি ফোন করুন' : 'Direct Switchboard'}</span>
              <a 
                href={`tel:${OFFICE_LOCATIONS.headOffice.phone}`}
                className="font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>{isBn ? 'কল করুন' : 'Call Now'}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* London Office (Ilford) */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100/80 px-2.5 py-0.5 rounded">
                  {isBn ? 'লন্ডন অফিস (ইলফোর্ড)' : 'London Desk'}
                </span>
                <Building2 className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">143 Cranbrook Road, Ilford</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBn ? 'ডকুমেন্ট ড্রপ, অনুবাদ ও ভিসা কেন্দ্র' : 'Document Drop, Visa & Translation Desk'}
                </p>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <a href={`tel:${OFFICE_LOCATIONS.londonOffice.phone}`} className="font-mono font-bold text-slate-900 hover:text-sky-700">
                    {OFFICE_LOCATIONS.londonOffice.formattedPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <a href={`mailto:${OFFICE_LOCATIONS.londonOffice.email}`} className="text-slate-700 hover:text-sky-700">
                    {OFFICE_LOCATIONS.londonOffice.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Mon - Fri: 09:30 - 18:30 | Sat: 10:00 - 16:00</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{isBn ? 'ওয়াক-ইন ড্রপ-অফ' : 'Walk-in Welcome'}</span>
              <a 
                href={`tel:${OFFICE_LOCATIONS.londonOffice.phone}`}
                className="font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
              >
                <span>{isBn ? 'কল করুন' : 'Call Now'}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Urgent Notice & Digital Helpdesk */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 border border-slate-700 shadow-md flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                  {isBn ? 'জরুরি বিধিবদ্ধ সহায়তা' : 'Urgent Statutory Hotline'}
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">HMRC & Court Deadline Notice</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isBn ? 'সময়সীমা < ৪৮ ঘণ্টা থাকলে অগ্রাধিকার ভিত্তিতে প্রসেস করা হয়' : 'Priority dispatch for letters with deadlines under 48 hours'}
                </p>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{isBn ? 'দ্বিভাষিক কনসালট্যান্ট সক্রিয় (বাংলা ও ইংরেজি)' : 'Bilingual Caseworkers Active (EN / বাংলা)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{isBn ? 'ইউকে জিডিপিআর ও ডেটা সিকিউরিটি কমপ্লায়েন্ট' : 'UK GDPR & Data Protection Compliant'}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-amber-300 font-mono text-[11px]">Response: 2-4 hrs</span>
              {onNavigateToUpload && (
                <button
                  onClick={onNavigateToUpload}
                  className="font-bold text-white hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isBn ? 'চিঠি আপলোড করুন' : 'Upload Notice'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Section Grid: Form on Left, Presets + Guidance on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: THE CONTACT / QUERY FORM */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
            
            {/* If Form is already submitted, show confirmation card */}
            {submittedInquiry ? (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h2 className="text-xl font-bold text-slate-900">
                        {t.contact.successTitle[language]}
                      </h2>
                      <p className="text-sm text-slate-600">
                        {t.contact.successSubtitle[language]}
                      </p>

                      <div className="mt-4 p-3.5 bg-white border border-emerald-200 rounded-lg flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                            {t.contact.referenceLabel[language]}
                          </p>
                          <p className="font-mono text-base font-extrabold text-emerald-800">
                            {submittedInquiry.referenceNo}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopyReference(submittedInquiry.referenceNo)}
                          className="px-3 py-1.5 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedRef ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              <span>{isBn ? 'কপি হয়েছে' : 'Copied!'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{isBn ? 'রেফারেন্স কপি' : 'Copy Ref'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inquiry Details Summary */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4 text-xs">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>{isBn ? 'জমা দেওয়া অনুসন্ধানের বিবরণ' : 'Submitted Inquiry Summary'}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-700">{isBn ? 'ক্লায়েন্টের নাম:' : 'Client Name:'}</span>{' '}
                      <span className="text-slate-900">{submittedInquiry.fullName}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">{isBn ? 'ইমেইল:' : 'Email:'}</span>{' '}
                      <span className="text-slate-900">{submittedInquiry.email}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">{isBn ? 'ফোন নম্বর:' : 'Phone:'}</span>{' '}
                      <span className="font-mono text-slate-900">{submittedInquiry.phone}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">{isBn ? 'অফিস ডেস্ক:' : 'Assigned Desk:'}</span>{' '}
                      <span className="text-slate-900">{submittedInquiry.preferredOffice}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">{isBn ? 'সেবার ক্যাটাগরি:' : 'Service Category:'}</span>{' '}
                      <span className="text-slate-900">{submittedInquiry.category}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">{isBn ? 'জরুরিতা:' : 'Urgency Level:'}</span>{' '}
                      <span className="px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-900">
                        {submittedInquiry.urgency}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <p className="font-semibold text-slate-700">{isBn ? 'বিষয়:' : 'Subject:'}</p>
                    <p className="text-slate-900 font-medium mt-0.5">{submittedInquiry.subject}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-700">{isBn ? 'বার্তা:' : 'Message:'}</p>
                    <p className="text-slate-700 bg-white p-3 rounded-md border border-slate-200 mt-1 leading-relaxed">
                      {submittedInquiry.message}
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t.contact.submitAnotherBtn[language]}
                  </button>

                  {onNavigateToDashboard && (
                    <button
                      onClick={onNavigateToDashboard}
                      className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.contact.goToDashboardBtn[language]}</span>
                    </button>
                  )}

                  {onNavigateToBooking && (
                    <button
                      onClick={onNavigateToBooking}
                      className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-950" />
                      <span>{t.contact.bookAppointmentBtn[language]}</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* THE INTERACTIVE FORM */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {isBn ? 'ব্যবসায়িক অনুসন্ধান ফর্ম' : 'Business Inquiry & Contact Form'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isBn 
                      ? 'নিচের ফর্মটি পূরণ করে পাঠান। জরুরি চিঠির ক্ষেত্রে আমাদের বিশেষ কমপ্লায়েন্স টিম দ্রুত জবাব প্রস্তুত করবে।'
                      : 'Complete the form below. For statutory notices, our administrative team reviews key obligations and replies rapidly.'}
                  </p>
                </div>

                {/* Error Banner */}
                {formError && (
                  <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.contact.fullName[language]}</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.contact.fullNamePlaceholder[language]}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.contact.email[language]}</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@company.co.uk"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.contact.phone[language]}</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7700 900123"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.contact.company[language]}</span>
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Global Enterprise & Company Ltd"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Category & Preferred Office */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.contact.category[language]}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors cursor-pointer"
                    >
                      <option value="Official Letter Decoding & Response">
                        {isBn ? 'অফিসিয়াল চিঠি ডিকোডিং ও ফর্মাল জবাব' : 'Official Letter Decoding & Formal Reply'}
                      </option>
                      <option value="Office Administrative Support">
                        {isBn ? 'অফিস প্রশাসন ও রেজিস্টার্ড পোস্ট রিটেইনার' : 'Office Administrative Support & Post Management'}
                      </option>
                      <option value="Visa Application Processing">
                        {isBn ? 'যুক্তরাজ্য ও আন্তর্জাতিক ভিসা আবেদন' : 'UK Visa Application Processing'}
                      </option>
                      <option value="Document Translation">
                        {isBn ? 'প্রত্যয়িত বাংলা-ইংরেজি নথি অনুবাদ' : 'Certified Document Translation'}
                      </option>
                      <option value="Flight & Hotel Booking">
                        {isBn ? 'কর্পোরেট ফ্লাইট ও হোটেল রিজার্ভেশন' : 'Corporate Flight & Hotel Booking'}
                      </option>
                      <option value="General Business Consultancy">
                        {isBn ? 'সাধারণ ব্যবসায়িক কনসালটেন্সি' : 'General Business Consultancy'}
                      </option>
                      <option value="Urgent Notice Triage">
                        {isBn ? 'জরুরি বিধিবদ্ধ নোটিশ (< ৪৮ ঘণ্টা সময়সীমা)' : 'Urgent Notice Triage (<48h Deadline)'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.contact.preferredOffice[language]}
                    </label>
                    <select
                      value={preferredOffice}
                      onChange={(e) => setPreferredOffice(e.target.value as OfficeLocation)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors cursor-pointer"
                    >
                      <option value="St Albans Head Office">
                        {isBn ? 'ইউকে হেড অফিস (সেন্ট অ্যালবান্স, হার্টফোর্ডশায়ার)' : 'UK Head Office (St Albans, Hertfordshire)'}
                      </option>
                      <option value="London Ilford Office">
                        {isBn ? 'লন্ডন অফিস (ইলফোর্ড, এসেক্স)' : 'London Office (Ilford, Essex)'}
                      </option>
                      <option value="Virtual / Telephone Consultation">
                        {isBn ? 'ভার্চুয়াল / টেলিফোন কনসালটেশন' : 'Virtual / Telephone Consultation'}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Urgency Level & Preferred Contact Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.contact.urgency[language]}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setUrgency('Normal')}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          urgency === 'Normal'
                            ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isBn ? 'স্বাভাবিক' : 'Standard'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency('Urgent')}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          urgency === 'Urgent'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                            : 'bg-amber-50/70 text-amber-900 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {isBn ? 'জরুরি' : 'Urgent'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency('Critical')}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          urgency === 'Critical'
                            ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                            : 'bg-rose-50/70 text-rose-900 border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        {isBn ? 'সংকটপূর্ণ' : 'Critical'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.contact.preferredContactMethod[language]}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPreferredContactMethod('Email')}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          preferredContactMethod === 'Email'
                            ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isBn ? 'ইমেইল' : 'Email'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreferredContactMethod('Phone Call')}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          preferredContactMethod === 'Phone Call'
                            ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isBn ? 'টেলিফোন' : 'Phone'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreferredContactMethod('WhatsApp')}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          preferredContactMethod === 'WhatsApp'
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                            : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        {isBn ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.contact.subject[language]}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t.contact.subjectPlaceholder[language]}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Detailed Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.contact.message[language]}
                      <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {message.length} {isBn ? 'অক্ষর' : 'characters'}
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder[language]}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors leading-relaxed"
                  />
                </div>

                {/* Quick Hint to Document Vault */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-amber-900">
                    <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      {isBn 
                        ? 'আপনার কাছে কি অফিসিয়াল চিঠি বা পিডিএফ নথি রয়েছে?' 
                        : 'Have an official HMRC/Home Office letter to analyze?'}
                    </span>
                  </div>
                  {onNavigateToUpload && (
                    <button
                      type="button"
                      onClick={onNavigateToUpload}
                      className="text-amber-800 font-bold hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <span>{isBn ? 'ডকুমেন্ট ভল্ট' : 'Upload File'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* GDPR Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gdpr-consent"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-1 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="gdpr-consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                    {t.contact.gdprConsent[language]}
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
                        <span>{t.contact.submitting[language]}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>{t.contact.submitBtn[language]}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* RIGHT COLUMN: PRESETS, HOURS, FAQS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Quick Scenario Presets */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3>{t.contact.quickPresetsTitle[language]}</h3>
              </div>
              <p className="text-xs text-slate-500">
                {isBn 
                  ? 'এক ক্লিকে আপনার অনুসন্ধান বিষয় ফর্মের মধ্যে বসান:' 
                  : 'Click any template below to automatically fill the form:'}
              </p>

              <div className="space-y-2 pt-1">
                {PRESET_QUERIES.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all text-xs group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 group-hover:text-amber-900">
                        {preset.badge[language]}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        preset.urgency === 'Urgent' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {preset.urgency}
                      </span>
                    </div>
                    <p className="text-slate-500 line-clamp-1 mt-1 text-[11px] group-hover:text-slate-700">
                      {preset.subject[language]}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Direct Booking Prompt */}
            {onNavigateToBooking && (
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-slate-950 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-950/80">
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>{isBn ? 'সরাসরি পরামর্শ প্রয়োজন?' : 'Prefer In-Person Consultation?'}</span>
                </div>
                <h3 className="text-lg font-extrabold leading-tight">
                  {isBn ? 'অফিসে সাক্ষাতের সময়সূচি বুক করুন' : 'Book a Guaranteed Advisory Time Slot'}
                </h3>
                <p className="text-xs text-slate-900/90 leading-relaxed">
                  {isBn 
                    ? 'আমাদের সেন্ট অ্যালবান্স অথবা লন্ডন ইলফোর্ড অফিসে মুখোমুখি অথবা ফোনে পরামর্শের জন্য সময় নির্ধারণ করুন।' 
                    : 'Schedule a structured 45-minute consultation at our St Albans or Ilford offices, or arrange a private phone review.'}
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onNavigateToBooking}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>{t.contact.bookAppointmentBtn[language]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 3. Frequently Asked Questions (FAQ) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <h3>{t.contact.faqTitle[language]}</h3>
              </div>

              <div className="space-y-2.5">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full text-left p-3 text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between gap-2 cursor-pointer"
                      >
                        <span>{faq.q[language]}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-3 pb-3 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                          {faq.a[language]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
