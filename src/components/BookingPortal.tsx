import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  CalendarDays, 
  Check, 
  Download,
  AlertCircle,
  Building2,
  Video
} from 'lucide-react';
import { BookingAppointment, OfficeLocation, ServiceType } from '../types';
import { OFFICE_LOCATIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface BookingPortalProps {
  initialService?: ServiceType;
  appointments: BookingAppointment[];
  onAddAppointment: (appointment: BookingAppointment) => void;
  onCancelAppointment: (id: string) => void;
  onNavigateToUpload: () => void;
}

export const BookingPortal: React.FC<BookingPortalProps> = ({
  initialService,
  appointments,
  onAddAppointment,
  onCancelAppointment,
  onNavigateToUpload
}) => {
  const { language, isBn } = useLanguage();
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new');
  
  // Wizard steps
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<ServiceType>(
    initialService || 'Official Letter Decoding & Response'
  );
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>('St Albans Head Office');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM - 11:30 AM');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent'>('Normal');
  
  // Client details
  const [clientName, setClientName] = useState<string>('Mahmud Hasan');
  const [companyName, setCompanyName] = useState<string>('Global Enterprise & Company Ltd');
  const [clientEmail, setClientEmail] = useState<string>('mahmud.bd.sust@gmail.com');
  const [clientPhone, setClientPhone] = useState<string>('07700 900123');
  const [notes, setNotes] = useState<string>('Need assistance reviewing recent official correspondence and visa documentation.');

  // Confirmed booking outcome
  const [confirmedBooking, setConfirmedBooking] = useState<BookingAppointment | null>(null);

  const servicesList: { type: ServiceType; titleBn: string; desc: string; duration: string; price: string }[] = [
    { 
      type: 'Official Letter Decoding & Response', 
      titleBn: 'অফিসিয়াল চিঠি ডিকোডিং ও ফর্মাল জবাব',
      desc: isBn ? 'HMRC, হোম অফিস বা কাউন্সিলের জটিল নোটিশ বিশ্লেষণ ও লিখিত আনুষ্ঠানিক উত্তর প্রস্তুত' : 'Dissect statutory notice (HMRC, Home Office, Council) and draft formal reply',
      duration: isBn ? '৪৫ মিনিট' : '45 mins',
      price: isBn ? '£৯৫ নির্দিষ্ট' : 'From £95 fixed'
    },
    { 
      type: 'Visa Application Processing', 
      titleBn: 'ভিসা আবেদন ও প্রমাণপত্র যাচাইকরণ',
      desc: isBn ? 'নথি অডিট, যোগ্যতা যাচাই ও অনলাইন ইউকে ভিসা সাবমিশন সহায়তা' : 'Document audit, evidence verification, and online visa submission assistance',
      duration: isBn ? '৬০ মিনিট' : '60 mins',
      price: isBn ? '£২৫০ থেকে' : 'From £250'
    },
    { 
      type: 'Form Completion & Compliance', 
      titleBn: 'সরকারি ফর্ম পূরণ ও প্রত্যয়িত অনুবাদ',
      desc: isBn ? 'সরকারি ও প্রাতিষ্ঠানিক ফর্ম নির্ভুল পূরণ এবং সার্টিফায়েড অনুবাদ' : 'Accurate form filling and sworn multilingual certified translations',
      duration: isBn ? '৪৫ মিনিট' : '45 mins',
      price: isBn ? '£৪৫ / পৃষ্ঠা' : 'From £45 / doc'
    },
    { 
      type: 'Flight & Hotel Booking', 
      titleBn: 'ফ্লাইট টিকিট ও হোটেল রিজার্ভেশন ডেস্ক',
      desc: isBn ? 'কর্পোরেট ফ্লাইট, হোটেল বুকিং এবং ভিসা ফাইল নিশ্চিতকরণের ভাউচার' : 'Corporate flights, luxury hotels, itinerary coordination & visa vouchers',
      duration: isBn ? '৩০ মিনিট' : '30 mins',
      price: isBn ? '£৩৫ / বুকিং' : '£35 / booking'
    },
    { 
      type: 'Office Administrative Support', 
      titleBn: 'অফিস ব্যাক-অফিস ও প্রশাসন সহায়তা',
      desc: isBn ? 'দৈনন্দিন অফিস ব্যাক-অফিস অপারেশন, চিঠিপত্র পরিচালনা ও বিলিং' : 'Combined office back-office management, invoicing, and correspondence',
      duration: isBn ? '৬০ মিনিট' : '60 mins',
      price: isBn ? 'মাসে £৩৫০ থেকে' : 'From £350 / mo'
    },
    { 
      type: 'General Business Consultancy', 
      titleBn: 'সাধারণ ব্যবসায়িক কনসালটেন্সি ও কমপ্লায়েন্স',
      desc: isBn ? 'কৌশলগত ব্যবসায়িক পরামর্শ, অপারেশনাল কমপ্লায়েন্স ও পরিচালক সহায়তা' : 'Strategic business advisory, operating compliance, and director support',
      duration: isBn ? '৬০ মিনিট' : '60 mins',
      price: isBn ? 'সেশনে £৭৫ থেকে' : 'From £75 / session'
    }
  ];

  const officesList: { 
    id: OfficeLocation; 
    name: string; 
    address: string; 
    phone: string;
    note: string;
    icon: typeof Building2;
  }[] = [
    {
      id: 'St Albans Head Office',
      name: isBn ? 'ইউকে হেড অফিস - সেন্ট অ্যালবান্স' : 'UK Head Office - St Albans',
      address: 'St Albans, Hertfordshire, UK',
      phone: OFFICE_LOCATIONS.headOffice.formattedPhone,
      note: isBn ? 'এক্সিকিউটিভ স্যুট, কৌশলগত কমপ্লায়েন্স ও মুখোমুখি বৈঠক' : 'Executive suites, strategic compliance & director meetings',
      icon: Building2
    },
    {
      id: 'London Ilford Office',
      name: isBn ? 'লন্ডন অফিস - ইলফোর্ড' : 'London Office - Ilford',
      address: '143 Cranbrook Road, Ilford, Essex IG1 4PU',
      phone: OFFICE_LOCATIONS.londonOffice.formattedPhone,
      note: isBn ? 'সরাসরি এসে নথি জমা, ভিসা আবেদন ও জরুরি চিঠি গ্রহণ ডেস্ক' : 'Walk-in document desk, visa submission, urgent letter intake',
      icon: Building2
    },
    {
      id: 'Virtual / Telephone Consultation',
      name: isBn ? 'ভার্চুয়াল / টেলিফোন কনসালটেশন' : 'Virtual or Telephone Consult',
      address: isBn ? 'নিরাপদ ভিডিও কল অথবা সরাসরি ফোন লাইন' : 'Secure Video Call or Direct Phone Line',
      phone: isBn ? 'যুক্তরাজ্য ও আন্তর্জাতিক এক্সেস' : 'National & International Access',
      note: isBn ? 'যেকোনো স্থান থেকে দূরবর্তী গোপনীয় পরামর্শ সেবা' : 'Flexible remote session for clients anywhere in the UK or abroad',
      icon: Video
    }
  ];

  const timeSlots = [
    '09:30 AM - 10:30 AM',
    '10:30 AM - 11:30 AM',
    '11:45 AM - 12:45 PM',
    '02:00 PM - 03:00 PM',
    '03:15 PM - 04:15 PM',
    '04:30 PM - 05:30 PM'
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = `GXT-BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: BookingAppointment = {
      id: `apt-${Date.now()}`,
      referenceNo: randomRef,
      service: selectedService,
      office: selectedOffice,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      clientName,
      companyName,
      clientEmail,
      clientPhone,
      notes,
      status: 'Confirmed',
      createdAt: '09 Oct 2026',
      urgency
    };

    onAddAppointment(newAppointment);
    setConfirmedBooking(newAppointment);
  };

  const handleDownloadCalendar = (booking: BookingAppointment) => {
    const calendarContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GX Trade UK//Consultation Booking//EN
BEGIN:VEVENT
SUMMARY:GX Trade Consultation: ${booking.service}
DESCRIPTION:Reference: ${booking.referenceNo}\\nOffice: ${booking.office}\\nClient: ${booking.clientName}\\nNotes: ${booking.notes}
LOCATION:${booking.office}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${booking.referenceNo}-GXTrade-Appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setStep(1);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md mb-2">
            <span>{isBn ? 'সরাসরি অ্যাপয়েন্টমেন্ট ডেস্ক' : 'Direct Appointment Desk'}</span>
            <span aria-hidden="true">·</span>
            <span>{isBn ? 'সেন্ট অ্যালবান্স ও লন্ডন ইলফোর্ড' : 'St Albans & London Ilford'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? 'কনসালটেশন বুকিং পোর্টাল' : 'Consultation Booking Portal'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {isBn 
              ? 'সেন্ট অ্যালবান্স বা লন্ডন ইলফোর্ড অফিসে মুখোমুখি সাক্ষাতের জন্য সময় নির্বাচন করুন, অথবা দূরবর্তী নিরাপদ টেলিফোন / ভিডিও কল বুক করুন।'
              : 'Schedule an in-person session at our St Albans or London Ilford offices, or book a confidential remote telephone / video consultation.'}
          </p>

          {/* Toggle between New Booking and My Appointments */}
          <div className="mt-5 inline-flex p-1 bg-slate-200 rounded-lg">
            <button
              onClick={() => { setActiveTab('new'); resetForm(); }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'new' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isBn ? 'নতুন পরামর্শ বুক করুন' : 'Book New Consultation'}
            </button>
            <button
              onClick={() => setActiveTab('existing')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'existing' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{isBn ? 'চলমান অ্যাপয়েন্টমেন্টসমূহ' : 'Existing Appointments'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[10px]">
                {appointments.length}
              </span>
            </button>
          </div>
        </div>

        {activeTab === 'new' ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8">
            
            {confirmedBooking ? (
              /* Success / Confirmation Screen */
              <div className="text-center space-y-6 py-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                    {isBn ? 'অ্যাপয়েন্টমেন্ট সফলভাবে নিশ্চিত হয়েছে' : 'Appointment Confirmed'}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                    {isBn ? 'বুকিং রেফারেন্স:' : 'Booking Reference:'} {confirmedBooking.referenceNo}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {isBn ? (
                      <>একটি নিশ্চিতকরণ বার্তা ও ক্যালেন্ডার আমন্ত্রণ <strong>{confirmedBooking.clientEmail}</strong> ঠিকানায় পাঠানো হয়েছে।</>
                    ) : (
                      <>A confirmation notice and calendar invite have been issued to <strong>{confirmedBooking.clientEmail}</strong>.</>
                    )}
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left max-w-lg mx-auto text-xs space-y-3">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">{isBn ? 'সেবা:' : 'Service:'}</span>
                    <span className="font-bold text-slate-900">{confirmedBooking.service}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">{isBn ? 'অফিসের স্থান:' : 'Branch Location:'}</span>
                    <span className="font-bold text-slate-900">{confirmedBooking.office}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">{isBn ? 'তারিখ ও সময়:' : 'Date & Time:'}</span>
                    <span className="font-bold text-slate-900">{confirmedBooking.date} ({confirmedBooking.timeSlot})</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">{isBn ? 'ক্লায়েন্ট যোগাযোগ:' : 'Client Contact:'}</span>
                    <span className="font-bold text-slate-900">{confirmedBooking.clientName} ({confirmedBooking.clientPhone})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">{isBn ? 'অবস্থা:' : 'Status:'}</span>
                    <span className="font-bold text-emerald-700">{isBn ? 'নিশ্চিত ও পরামর্শকের কাছে বরাদ্দ' : 'Confirmed & Assigned to Advisor'}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleDownloadCalendar(confirmedBooking)}
                    className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isBn ? 'ক্যালেন্ডার ডাউনলোড করুন (.ics)' : 'Download Calendar (.ics)'}</span>
                  </button>

                  <button
                    onClick={onNavigateToUpload}
                    className="px-4 py-2 text-xs font-bold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isBn ? 'এই বুকিংয়ের জন্য ফাইল আপলোড করুন' : 'Upload Supporting Documents for this Booking'}</span>
                  </button>

                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    {isBn ? 'আরেকটি অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Another Appointment'}
                  </button>
                </div>

              </div>
            ) : (
              /* Multi-step wizard */
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                      {step}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {step === 1 && (isBn ? '১. সেবা ও অফিস নির্বাচন' : '1. Choose Service & Branch')}
                      {step === 2 && (isBn ? '২. তারিখ ও সময় নির্বাচন' : '2. Choose Date & Time Slot')}
                      {step === 3 && (isBn ? '৩. ক্লায়েন্টের বিবরণ ও নিশ্চিতকরণ' : '3. Client Details & Confirmation')}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{isBn ? `ধাপ ${step} (৩টির মধ্যে)` : `Step ${step} of 3`}</span>
                </div>

                {/* Step 1: Service & Office */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                        {isBn ? 'পরামর্শের সেবা নির্বাচন করুন' : 'Select Consultation Service'}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {servicesList.map((svc) => (
                          <button
                            key={svc.type}
                            type="button"
                            onClick={() => setSelectedService(svc.type)}
                            className={`p-3.5 text-left rounded-lg border transition-all cursor-pointer ${
                              selectedService === svc.type
                                ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="font-bold text-xs">{isBn ? svc.titleBn : svc.type}</span>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  selectedService === svc.type ? 'bg-amber-400 text-slate-950' : 'bg-amber-50 text-amber-900 border border-amber-200'
                                }`}>
                                  {svc.price}
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                  selectedService === svc.type ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {svc.duration}
                                </span>
                              </div>
                            </div>
                            <p className={`text-[11px] mt-1.5 line-clamp-2 ${
                              selectedService === svc.type ? 'text-slate-300' : 'text-slate-500'
                            }`}>
                              {svc.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                        {isBn ? 'পছন্দের অফিস বা পরামর্শের ধরন' : 'Select Preferred Office / Format'}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {officesList.map((off) => {
                          const Icon = off.icon;
                          const isSelected = selectedOffice === off.id;
                          return (
                            <button
                              key={off.id}
                              type="button"
                              onClick={() => setSelectedOffice(off.id)}
                              className={`p-3.5 text-left rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'border-amber-600 bg-amber-50/50 shadow-xs'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-700' : 'text-slate-500'}`} />
                                  <span className={`font-bold text-xs ${isSelected ? 'text-amber-950' : 'text-slate-900'}`}>
                                    {off.name}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-600 font-medium">{off.address}</p>
                                <p className="text-[10px] text-slate-500 mt-1">{off.note}</p>
                              </div>
                              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-semibold text-slate-700">
                                {off.phone}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>{isBn ? 'তারিখ ও সময় নির্বাচনে যান' : 'Continue to Date & Slot'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {isBn ? 'অ্যাপয়েন্টমেন্টের তারিখ নির্বাচন করুন' : 'Select Appointment Date'}
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        min="2026-10-10"
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full sm:w-72 px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        {isBn 
                          ? 'অফিস খোলা থাকে: সোম–শুক্র ০৯:০০–১৮:০০ (সেন্ট অ্যালবান্স) এবং সোম–শনি ০৯:৩০–১৮:৩০ (ইলফোর্ড)।'
                          : 'Offices open Mon–Fri 09:00–18:00 (St Albans) and Mon–Sat 09:30–18:30 (Ilford).'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                        {isBn ? 'উপলব্ধ সময় স্লট নির্বাচন করুন' : 'Select Available Time Slot'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-3 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              selectedTimeSlot === slot
                                ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{slot}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {isBn ? 'জরুরিতার মাত্রা' : 'Urgency Level'}
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="urgency"
                            checked={urgency === 'Normal'}
                            onChange={() => setUrgency('Normal')}
                            className="text-slate-900 focus:ring-slate-900"
                          />
                          <span>{isBn ? 'সাধারণ সময়সূচি' : 'Standard Schedule'}</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="urgency"
                            checked={urgency === 'Urgent'}
                            onChange={() => setUrgency('Urgent')}
                            className="text-rose-600 focus:ring-rose-600"
                          />
                          <span className="font-semibold text-rose-700">
                            {isBn ? 'জরুরি (দ্রুত প্রক্রিয়াকরণ / কঠোর ডেডলাইন)' : 'Urgent (Expedited / Strict Deadline)'}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{isBn ? 'পূর্ববর্তী' : 'Back'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>{isBn ? 'বিবরণ প্রদানে যান' : 'Continue to Details'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Details & Confirmation */}
                {step === 3 && (
                  <form onSubmit={handleConfirmBooking} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'যোগাযোগকারীর নাম *' : 'Contact Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'প্রতিষ্ঠানের নাম (ঐচ্ছিক)' : 'Company / Entity Name'}
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
                        </label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isBn ? 'যুক্তরাজ্যের ফোন / মোবাইল নম্বর *' : 'UK Telephone / Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g. 07700 900123 or 020 3581 3133"
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isBn ? 'নোট বা কেসের বিবরণ (ঐচ্ছিক)' : 'Notes or Specific Case Reference (Optional)'}
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={isBn ? "আপনার মামলার বিষয়, বিধিবদ্ধ সময়সীমা বা কোনো নির্দিষ্ট প্রশ্ন লিখুন..." : "Describe your case, mention statutory notice deadline, or specific questions..."}
                        className="w-full text-xs p-3 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                      />
                    </div>

                    {/* Booking Review Badge */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs space-y-1 text-slate-700">
                      <div className="font-bold text-slate-900">{isBn ? 'বুকিং সংক্ষেপ:' : 'Summary of Booking:'}</div>
                      <div><strong>{isBn ? 'সেবা:' : 'Service:'}</strong> {selectedService}</div>
                      <div><strong>{isBn ? 'স্থান:' : 'Branch:'}</strong> {selectedOffice}</div>
                      <div><strong>{isBn ? 'সময়:' : 'Appointment:'}</strong> {selectedDate} at {selectedTimeSlot}</div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{isBn ? 'পূর্ববর্তী' : 'Back'}</span>
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Check className="w-4 h-4" />
                        <span>{isBn ? 'অ্যাপয়েন্টমেন্ট নিশ্চিত করুন' : 'Confirm Appointment'}</span>
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}

          </div>
        ) : (
          /* Existing Appointments Tab */
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
                {isBn ? 'বর্তমানে কোনো সক্রিয় অ্যাপয়েন্টমেন্ট নেই।' : 'No active appointments booked yet.'}
              </div>
            ) : (
              appointments.map((apt) => (
                <div 
                  key={apt.id} 
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-amber-700">{apt.referenceNo}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {isBn ? (apt.status === 'Confirmed' ? 'নিশ্চিত' : apt.status) : apt.status}
                      </span>
                      {apt.urgency === 'Urgent' && (
                        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                          {isBn ? 'জরুরি' : 'Urgent'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{apt.service}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {apt.office}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                        {apt.date} ({apt.timeSlot})
                      </span>
                    </div>
                    {apt.notes && (
                      <p className="text-[11px] text-slate-500 italic mt-1">"{apt.notes}"</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDownloadCalendar(apt)}
                      className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
                      title={isBn ? "ক্যালেন্ডার ফাইল ডাউনলোড করুন (.ics)" : "Download calendar (.ics)"}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>.ICS</span>
                    </button>
                    <button
                      onClick={() => onCancelAppointment(apt.id)}
                      className="px-3 py-2 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-medium cursor-pointer"
                    >
                      {isBn ? 'বাতিল করুন' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
