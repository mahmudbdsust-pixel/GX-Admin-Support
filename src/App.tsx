import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { LetterDecoderTool } from './components/LetterDecoderTool';
import { BookingPortal } from './components/BookingPortal';
import { SecureDocumentUpload } from './components/SecureDocumentUpload';
import { TravelBookingPortal } from './components/TravelBookingPortal';
import { ClientDashboard } from './components/ClientDashboard';
import { OfficeLocationsSection } from './components/OfficeLocationsSection';
import { ContactQueryForm } from './components/ContactQueryForm';
import { Footer } from './components/Footer';
import { 
  OverviewBackgroundConfig, 
  OverviewBackgroundPicker, 
  THEME_PRESETS 
} from './components/OverviewBackgroundPicker';
import { useLanguage } from './context/LanguageContext';

import { 
  BookingAppointment, 
  ClientCase, 
  ContactInquiry,
  DecodedLetterAnalysis, 
  OfficeLocation, 
  PortalMessage, 
  ServiceType, 
  TravelInquiry, 
  UploadedDocument 
} from './types';

import { 
  INITIAL_APPOINTMENTS, 
  INITIAL_CASES, 
  INITIAL_DOCUMENTS, 
  INITIAL_MESSAGES, 
  INITIAL_TRAVEL_INQUIRIES, 
  OFFICE_LOCATIONS 
} from './data/mockData';

import { 
  Calendar, 
  FileSearch, 
  Plane, 
  ShieldCheck, 
  Building2, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Clock,
  MessageSquare
} from 'lucide-react';

export default function App() {
  const { language, isBn, t } = useLanguage();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [preselectedService, setPreselectedService] = useState<ServiceType | undefined>(undefined);
  
  // Persistent live data states
  const [cases, setCases] = useState<ClientCase[]>(INITIAL_CASES);
  const [documents, setDocuments] = useState<UploadedDocument[]>(INITIAL_DOCUMENTS);
  const [appointments, setAppointments] = useState<BookingAppointment[]>(INITIAL_APPOINTMENTS);
  const [travelInquiries, setTravelInquiries] = useState<TravelInquiry[]>(INITIAL_TRAVEL_INQUIRIES);
  const [messages, setMessages] = useState<PortalMessage[]>(INITIAL_MESSAGES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Overview Page Background & Theme Customizer State (defaults to Cambridge Light Blue)
  const [overviewTheme, setOverviewTheme] = useState<OverviewBackgroundConfig>(() => {
    try {
      const saved = localStorage.getItem('gxtrade_overview_theme');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If saved theme was the previous dark default (oxford-navy), upgrade to the new Light Blue default
        if (parsed?.id === 'oxford-navy') {
          return THEME_PRESETS[0];
        }
        return parsed;
      }
    } catch (e) {
      // ignore
    }
    return THEME_PRESETS[0];
  });

  const handleOverviewThemeChange = (newTheme: OverviewBackgroundConfig) => {
    setOverviewTheme(newTheme);
    try {
      localStorage.setItem('gxtrade_overview_theme', JSON.stringify(newTheme));
    } catch (e) {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handlers
  const handleAddAppointment = (newAppt: BookingAppointment) => {
    setAppointments([newAppt, ...appointments]);
    showToast(`Appointment confirmed: ${newAppt.referenceNo} for ${newAppt.date} at ${newAppt.office}`);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
    showToast('Appointment successfully cancelled.');
  };

  const handleUploadSuccess = (newDoc: UploadedDocument) => {
    setDocuments([newDoc, ...documents]);
    showToast(`Encrypted upload complete: ${newDoc.fileName} transmitted to ${newDoc.office}`);
  };

  const handleAddTravelInquiry = (inquiry: TravelInquiry) => {
    setTravelInquiries([inquiry, ...travelInquiries]);
    showToast(`Travel quote request ${inquiry.referenceNo} dispatched to GX Trade Travel Desk.`);
  };

  const handleSendMessage = (text: string) => {
    const clientMsg: PortalMessage = {
      id: `msg-${Date.now()}`,
      sender: 'client',
      senderName: 'Mahmud Hasan (Global Enterprise & Company Ltd)',
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      text,
      isRead: true
    };
    setMessages(prev => [...prev, clientMsg]);

    // Simulated consultant auto-acknowledgment
    setTimeout(() => {
      const replyMsg: PortalMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'advisor',
        senderName: 'Eleanor Vance (St Albans Office)',
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        text: 'Thank you for your update, Mahmud. We have received your note for Global Enterprise & Company Ltd and are updating your case file right away. For any immediate emergency, our direct desk is available on 01727 301083.',
        isRead: true
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  const handleDirectSubmitToOffice = (analysis: DecodedLetterAnalysis, letterText: string) => {
    const caseRef = `GXT-LTR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase: ClientCase = {
      id: `case-${Date.now()}`,
      caseRef,
      title: `Decoded Notice: ${analysis.senderAgency} (Global Enterprise & Company Ltd)`,
      serviceType: 'Official Letter Decoding & Response',
      clientName: 'Mahmud Hasan',
      companyName: 'Global Enterprise & Company Ltd',
      clientEmail: 'mahmud.bd.sust@gmail.com',
      status: 'Action Drafted',
      progressPercent: 85,
      openedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      targetCompletionDate: analysis.deadlineDate || 'Within 7 Days',
      assignedOffice: 'St Albans Head Office',
      assignedAdvisor: 'Eleanor Vance (Head of Compliance)',
      latestUpdate: `Drafted response ready for statutory reply to ${analysis.senderAgency} citing registered office at 114 Lock Studios, Bow, London, E3 3YD.`,
      documentCount: 1
    };

    const newDoc: UploadedDocument = {
      id: `doc-${Date.now()}`,
      fileName: `Decoded_${analysis.senderAgency.replace(/\s+/g, '_')}_Letter.txt`,
      fileSize: '45 KB',
      fileType: 'text/plain',
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: 'Official Letter',
      status: 'Decoded',
      notes: analysis.summary,
      office: 'St Albans Head Office',
      clientName: 'Mahmud Hasan',
      companyName: 'Global Enterprise & Company Ltd',
      clientEmail: 'mahmud.bd.sust@gmail.com',
      caseRef,
      decodedAnalysis: analysis
    };

    setCases([newCase, ...cases]);
    setDocuments([newDoc, ...documents]);
    showToast(`Case ${caseRef} created in Client Dashboard with drafted response ready.`);
  };

  const handleUpdateCaseStatus = (caseId: string, status: any, progress: number) => {
    setCases(cases.map(c => c.id === caseId ? { ...c, status, progressPercent: progress } : c));
    showToast(`Case status updated to ${status}.`);
  };

  const handleSelectService = (service: ServiceType) => {
    setPreselectedService(service);
    setCurrentTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookAtOffice = (office: 'St Albans Head Office' | 'London Ilford Office') => {
    setCurrentTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquirySubmit = (inquiry: ContactInquiry) => {
    const clientMsg: PortalMessage = {
      id: `msg-${Date.now()}`,
      sender: 'client',
      senderName: inquiry.fullName,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      text: `[Online Inquiry: ${inquiry.referenceNo}] (${inquiry.category}) - ${inquiry.subject}\n${inquiry.message}`,
      caseRef: inquiry.referenceNo,
      isRead: true
    };

    setMessages(prev => [...prev, clientMsg]);

    setTimeout(() => {
      const replyMsg: PortalMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'advisor',
        senderName: inquiry.preferredOffice.includes('London')
          ? 'Farhan Rahman (London Ilford Desk)'
          : 'Eleanor Vance (St Albans Compliance)',
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        text: `Hello ${inquiry.fullName}, your inquiry (${inquiry.referenceNo}) has been formally logged by our duty caseworkers. We are reviewing your matter regarding "${inquiry.subject}". We will follow up directly via ${inquiry.preferredContactMethod} (${inquiry.email}). If you require urgent same-day action, our switchboard is available on 01727 301083.`,
        caseRef: inquiry.referenceNo,
        isRead: false
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1500);

    showToast(`Inquiry ${inquiry.referenceNo} logged successfully. Assigned to ${inquiry.preferredOffice}.`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2 max-w-md animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeCasesCount={cases.filter(c => c.status !== 'Completed').length}
        unreadMessagesCount={messages.filter(m => !m.isRead).length}
      />

      {/* Content Rendering based on Tab */}
      <main className="flex-1">
        
        {currentTab === 'home' && (
          <div 
            className={`transition-colors duration-500 ${overviewTheme.backgroundScope === 'full' ? 'min-h-full' : ''}`}
            style={overviewTheme.backgroundScope === 'full' ? {
              backgroundColor: overviewTheme.primaryColor,
              backgroundImage: overviewTheme.uploadedImage ? `url(${overviewTheme.uploadedImage})` : undefined,
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed'
            } : undefined}
          >
            {/* Overview Background Quick-Bar */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-2 text-xs text-white">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sky-400 flex items-center gap-1.5">
                    <span>{isBn ? '🎨 সারসংক্ষেপ ব্যাকগ্রাউন্ড:' : '🎨 Overview Background:'}</span>
                  </span>
                  <span className="text-white font-medium">
                    {overviewTheme.uploadedImage ? (overviewTheme.uploadedImageName || (isBn ? 'কাস্টম ওয়ালপেপার' : 'Custom Wallpaper')) : overviewTheme.name}
                  </span>
                  <span 
                    className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-xs inline-block"
                    style={{ backgroundColor: overviewTheme.primaryColor }}
                    title={overviewTheme.primaryColor}
                  />
                  {overviewTheme.isLightMode && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-sky-950 text-sky-300 border border-sky-700 font-semibold">
                      {isBn ? 'হালকা নীল মোড' : 'Light Blue Theme'}
                    </span>
                  )}
                  {overviewTheme.uploadedImage && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                      {isBn ? 'কাস্টম ছবি সক্রিয়' : 'Custom Image Active'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Quick Preset Colour Buttons */}
                  <div className="hidden sm:flex items-center gap-1.5 mr-1">
                    {THEME_PRESETS.slice(0, 5).map((preset) => {
                      const isActive = overviewTheme.id === preset.id && !overviewTheme.uploadedImage;
                      const label = preset.id === 'cambridge-light-blue'
                        ? (isBn ? 'হালকা নীল' : 'Light Blue')
                        : preset.id === 'soft-azure-sky'
                        ? (isBn ? 'অ্যাজুর' : 'Azure')
                        : preset.id === 'ice-crystal-blue'
                        ? (isBn ? 'আইস ব্লু' : 'Ice Blue')
                        : preset.name.split(' ')[0];

                      return (
                        <button
                          key={preset.id}
                          onClick={() => handleOverviewThemeChange({
                            ...preset,
                            uploadedImage: null,
                            uploadedImageName: null,
                            backgroundScope: overviewTheme.backgroundScope
                          })}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                            isActive
                              ? 'border-sky-400 text-sky-300 bg-sky-500/20 shadow-xs ring-1 ring-sky-400/40'
                              : 'border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 bg-slate-800/60'
                          }`}
                          title={`Apply ${preset.name}`}
                        >
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-white/40 shrink-0"
                            style={{ backgroundColor: preset.primaryColor }}
                          />
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <OverviewBackgroundPicker 
                    currentTheme={overviewTheme}
                    onThemeChange={handleOverviewThemeChange}
                    onNotification={showToast}
                  />
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <HeroSection 
              onNavigate={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              overviewTheme={overviewTheme}
              onThemeChange={handleOverviewThemeChange}
              onNotification={showToast}
            />

            {/* Quick Interactive Highlights Strip */}
            <div className="bg-slate-900 border-y border-slate-800 text-slate-300 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                  <div className="border-r border-slate-800/80 pr-4 last:border-none">
                    <div className="font-extrabold text-2xl text-white">{isBn ? '২টি অফিস' : '2 Offices'}</div>
                    <p className="text-xs text-slate-400 mt-0.5">{isBn ? 'সেন্ট অ্যালবান্স ও লন্ডন ইলফোর্ড' : 'St Albans & London Ilford'}</p>
                  </div>
                  <div className="border-r border-slate-800/80 pr-4 last:border-none">
                    <div className="font-extrabold text-2xl text-amber-400">{isBn ? '২৪-৪৮ ঘণ্টা' : '24-48h'}</div>
                    <p className="text-xs text-slate-400 mt-0.5">{isBn ? 'চিঠি ড্রাফটিং সর্বোচ্চ সময়' : 'Official Letter Drafting SLA'}</p>
                  </div>
                  <div className="border-r border-slate-800/80 pr-4 last:border-none">
                    <div className="font-extrabold text-2xl text-white">100%</div>
                    <p className="text-xs text-slate-400 mt-0.5">{isBn ? 'ইউকে জিডিপিআর ও ডেটা সুরক্ষা' : 'UK GDPR & Data Compliance'}</p>
                  </div>
                  <div>
                    <div className="font-extrabold text-2xl text-emerald-400">{isBn ? 'পূর্ণাঙ্গ সেবা' : 'Full Scope'}</div>
                    <p className="text-xs text-slate-400 mt-0.5">{isBn ? 'ভিসা, অনুবাদ ও ভ্রমণ' : 'Visas, Translations & Travel'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Showcase */}
            <ServicesSection onSelectService={handleSelectService} />

            {/* Letter Decoder Interactive Feature */}
            <div className="bg-white border-b border-slate-200">
              <LetterDecoderTool 
                onDirectSubmitToOffice={handleDirectSubmitToOffice}
                onNavigateToBooking={() => {
                  setCurrentTab('booking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            {/* Travel Desk Teaser */}
            <div className="py-16 bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-slate-800 border border-slate-700 px-3 py-1 rounded-md">
                      <Plane className="w-3.5 h-3.5" />
                      <span>{isBn ? 'কর্পোরেট ও ব্যক্তিগত ভ্রমণ সহায়তা' : 'Corporate & Individual Travel Support'}</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                      {isBn ? 'বিশ্বজুড়ে এয়ার টিকিট ও হোটেল বুকিং' : 'Find Air Tickets & Book Hotels Worldwide'}
                    </h2>
                    <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                      {isBn 
                        ? 'ব্যবসায়িক ডেলিগেশনের জন্য ফ্লাইট, কর্পোরেট বিলিং সুবিধা সহ হোটেল রিজার্ভেশন কিংবা ইউকেভিআই ভিসা আবেদনের প্রমাণ হিসেবে সংরক্ষিত টিকিট — আমাদের ট্রাভেল ডেস্ক সার্বিক ভ্রমণ সমন্বয় করে।'
                        : 'Whether you need flights for a corporate delegation, hotel reservations with corporate billing, or certified flight itineraries to satisfy UKVI visa requirements, our travel desk arranges complete end-to-end itineraries.'}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          setCurrentTab('travel');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Plane className="w-4 h-4 text-slate-950" />
                        <span>{isBn ? 'বিমান টিকিট ও হোটেল অনুসন্ধান' : 'Search Air Tickets & Hotels'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentTab('booking');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors cursor-pointer"
                      >
                        <span>{isBn ? 'ভ্রমণ পরামর্শ বুক করুন' : 'Book Travel Consultation'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
                    <h3 className="font-bold text-sm text-amber-300 uppercase tracking-wider">
                      {isBn ? 'সম্প্রতি প্রস্তুতকৃত ভ্রমণসূচি' : 'Recent Itineraries Managed'}
                    </h3>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-white">London LHR ➔ Dubai DXB</p>
                          <p className="text-[11px] text-slate-400">Emirates Business + JW Marriott</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400">
                          {isBn ? 'নিশ্চিত' : 'Confirmed'}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-white">London LGW ➔ Istanbul IST</p>
                          <p className="text-[11px] text-slate-400">Turkish Airlines + Visa Voucher</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400">
                          {isBn ? 'কোটেশন' : 'Quoted'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Inquiry & Contact Teaser */}
            <div className="bg-slate-100 py-12 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-7 sm:p-9 shadow-lg border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-slate-800/90 px-3 py-1 rounded-md border border-slate-700">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isBn ? 'সরাসরি প্রশ্ন বা অনুসন্ধান পাঠাতে চান?' : 'Have an Official Notice or Business Query?'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {isBn ? 'আমাদের বিশেষজ্ঞ ডেস্কে অনুসন্ধান পাঠান' : 'Submit an Official Inquiry to Our UK Advisory Desk'}
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {isBn 
                        ? 'এইচএমআরসি বা হোম অফিসের চিঠি বিশ্লেষণ, ভিসা আবেদন যাচাই, প্রত্যয়িত অনুবাদ বা অফিস প্রশাসন নিয়ে সরাসরি প্রশ্ন জমা দিন। আমাদের দল দ্রুত জবাব প্রস্তুত করবে।'
                        : 'Whether you received a statutory notice, need UK visa guidance, certified translations, or office administration support, submit your inquiry for prompt review.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        setCurrentTab('contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-slate-950" />
                      <span>{isBn ? 'অনুসন্ধান ফর্ম খুলুন' : 'Open Query Form'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href={`tel:${OFFICE_LOCATIONS.headOffice.phone}`}
                      className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>{OFFICE_LOCATIONS.headOffice.formattedPhone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Offices Showcase */}
            <OfficeLocationsSection onBookAtOffice={handleBookAtOffice} />
          </div>
        )}

        {/* SUBPAGE: SERVICES */}
        {currentTab === 'services' && (
          <div>
            <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  gxtrade.co.uk {isBn ? 'সার্বিক ডিরেক্টরি' : 'Comprehensive Directory'}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
                  {isBn ? 'সকল প্রশাসনিক ও কনসালটেন্সি সেবাসমূহ' : 'All Administrative & Consultancy Services'}
                </h1>
                <p className="text-slate-300 text-sm max-w-2xl mt-2">
                  {isBn 
                    ? 'আমাদের সমন্বিত ব্যাক-অফিস সাপোর্ট, অফিসিয়াল চিঠি ডিকোডিং ও ফর্মাল জবাব, প্রত্যয়িত বহুভাষিক অনুবাদ, ভিসা আবেদন এবং ট্রাভেল ডেস্কের বিস্তারিত জানুন।'
                    : 'Learn about our combined office back-office management, statutory letter decoding & responses, multilingual document translations, visa filing, and travel desk.'}
                </p>
              </div>
            </div>
            <ServicesSection onSelectService={handleSelectService} defaultViewMode="cards" />
            <OfficeLocationsSection onBookAtOffice={handleBookAtOffice} />
          </div>
        )}

        {/* SUBPAGE: PRICE LIST */}
        {currentTab === 'pricing' && (
          <div>
            <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {isBn ? 'যুক্তরাজ্যের অফিসিয়াল ফি শিডিউল' : 'Official UK Schedule of Fees'}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
                  {isBn ? 'মূল্য তালিকা ও সার্ভিস ট্যারিফ' : 'Price List & Service Tariffs'}
                </h1>
                <p className="text-slate-300 text-sm max-w-2xl mt-2">
                  {isBn 
                    ? 'অফিস সাপোর্ট, চিঠি বিশ্লেষণ ও জবাব ড্রাফটিং, ফর্ম পূরণ, প্রত্যয়িত অনুবাদ, ভিসা এবং ট্রাভেলের জন্য স্বচ্ছ ও নির্ধারিত ফি।'
                    : 'Transparent, binding fees for combined office support, official letter triage & reply drafting, form completions, certified translations, visas, and corporate travel.'}
                </p>
              </div>
            </div>
            <ServicesSection onSelectService={handleSelectService} defaultViewMode="pricelist" />
            <OfficeLocationsSection onBookAtOffice={handleBookAtOffice} />
          </div>
        )}

        {/* SUBPAGE: LETTER DECODER & DRAFTING */}
        {currentTab === 'decoder' && (
          <div>
            <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {isBn ? 'চিঠি ডিকোডিং ও ড্রাফটিং স্টুডিও' : 'Triage & Drafting Studio'}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
                  {isBn ? 'অফিসিয়াল চিঠি ডিকোডিং ও ফর্মাল উত্তর ড্রাফটিং' : 'Official Letter Decoding & Response Drafting'}
                </h1>
                <p className="text-slate-300 text-sm max-w-2xl mt-2">
                  {isBn 
                    ? 'HMRC, Home Office, DWP, কাউন্টি কোর্ট ও স্থানীয় কাউন্সিলের জটিল চিঠি বিশ্লেষণ করুন। স্পষ্ট ব্যাখ্যা, ডেডলাইন সতর্কতা এবং প্রস্তুত জবাবের খসড়া পান।'
                    : 'Parse complex correspondence from HMRC, Home Office, DWP, County Courts, and Local Councils. Get clear explanations, deadline alerts, and ready-to-use formal replies.'}
                </p>
              </div>
            </div>
            <LetterDecoderTool 
              onDirectSubmitToOffice={handleDirectSubmitToOffice}
              onNavigateToBooking={() => {
                setCurrentTab('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* SUBPAGE: FLIGHTS & HOTELS */}
        {currentTab === 'travel' && (
          <TravelBookingPortal 
            travelInquiries={travelInquiries}
            onAddInquiry={handleAddTravelInquiry}
            onNavigateToBooking={() => {
              setCurrentTab('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* SUBPAGE: BOOKING PORTAL */}
        {currentTab === 'booking' && (
          <BookingPortal 
            initialService={preselectedService}
            appointments={appointments}
            onAddAppointment={handleAddAppointment}
            onCancelAppointment={handleCancelAppointment}
            onNavigateToUpload={() => {
              setCurrentTab('upload');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* SUBPAGE: SECURE DOCUMENT UPLOAD */}
        {currentTab === 'upload' && (
          <SecureDocumentUpload 
            documents={documents}
            onUploadSuccess={handleUploadSuccess}
            onNavigateToDecoder={() => {
              setCurrentTab('decoder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToDashboard={() => {
              setCurrentTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* SUBPAGE: CLIENT DASHBOARD */}
        {currentTab === 'dashboard' && (
          <ClientDashboard 
            cases={cases}
            documents={documents}
            appointments={appointments}
            travelInquiries={travelInquiries}
            messages={messages}
            onSendMessage={handleSendMessage}
            onNavigateToUpload={() => {
              setCurrentTab('upload');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToBooking={() => {
              setCurrentTab('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToDecoder={() => {
              setCurrentTab('decoder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToTravel={() => {
              setCurrentTab('travel');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateCaseStatus={handleUpdateCaseStatus}
          />
        )}

        {/* SUBPAGE: CONTACT US & INQUIRY FORM */}
        {(currentTab === 'contact' || currentTab === 'offices') && (
          <div>
            <ContactQueryForm 
              onSubmitInquiry={handleInquirySubmit}
              onNavigateToBooking={() => {
                setCurrentTab('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToUpload={() => {
                setCurrentTab('upload');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToDashboard={() => {
                setCurrentTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            
            {/* Physical Presences Showcase */}
            <OfficeLocationsSection onBookAtOffice={handleBookAtOffice} />
          </div>
        )}

      </main>

      {/* Corporate Footer */}
      <Footer onNavigate={(tab) => {
        setCurrentTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
