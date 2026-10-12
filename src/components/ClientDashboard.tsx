import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Plane, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Download, 
  User, 
  Building2, 
  MapPin,
  Phone, 
  Mail, 
  Send, 
  ChevronRight, 
  RefreshCw,
  ExternalLink,
  Shield,
  Eye,
  FileCheck2
} from 'lucide-react';
import { 
  BookingAppointment, 
  ClientCase, 
  OfficeLocation, 
  PortalMessage, 
  TravelInquiry, 
  UploadedDocument 
} from '../types';
import { OFFICE_LOCATIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface ClientDashboardProps {
  cases: ClientCase[];
  documents: UploadedDocument[];
  appointments: BookingAppointment[];
  travelInquiries: TravelInquiry[];
  messages: PortalMessage[];
  onSendMessage: (text: string) => void;
  onNavigateToUpload: () => void;
  onNavigateToBooking: () => void;
  onNavigateToDecoder: () => void;
  onNavigateToTravel: () => void;
  onUpdateCaseStatus?: (caseId: string, status: any, progress: number) => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  cases,
  documents,
  appointments,
  travelInquiries,
  messages,
  onSendMessage,
  onNavigateToUpload,
  onNavigateToBooking,
  onNavigateToDecoder,
  onNavigateToTravel,
  onUpdateCaseStatus
}) => {
  const { language, isBn } = useLanguage();
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'cases' | 'vault' | 'travel' | 'appointments' | 'messages'>('overview');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [newMessageText, setNewMessageText] = useState<string>('');
  const [activeCaseFilter, setActiveCaseFilter] = useState<string>('all');
  const [selectedCaseDetail, setSelectedCaseDetail] = useState<ClientCase | null>(null);

  const clientProfile = {
    companyName: 'Global Enterprise & Company Ltd',
    companyType: isBn ? 'সক্রিয় প্রাইভেট লিমিটেড কোম্পানি (ইউকে নিবন্ধিত)' : 'Active Private Limited Company',
    registeredOffice: '114 Lock Studios, 7 Corsican Square, Bow, London, E3 3YD',
    primaryContact: 'Mahmud Hasan',
    email: 'mahmud.bd.sust@gmail.com',
    phone: '07700 900123',
    accountType: isBn ? 'কর্পোরেট রিটেইনার ক্লায়েন্ট' : 'Corporate Retainer Client',
    memberSince: isBn ? 'অক্টোবর ২০২৬' : 'October 2026',
    primaryOffice: isBn ? 'ইউকে হেড অফিস (সেন্ট অ্যালবান্স)' : 'UK Head Office (St Albans)',
    domain: 'gxtrade.co.uk'
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;
    onSendMessage(newMessageText);
    setNewMessageText('');
  };

  const urgentCases = cases.filter(c => c.status === 'Action Drafted' || c.status === 'In Progress');

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Profile & Header Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-900 text-amber-400 font-extrabold text-xl flex items-center justify-center border border-slate-700 shrink-0 shadow-xs">
                GE
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {clientProfile.companyName}
                  </h1>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {isBn ? 'সক্রিয় ক্লায়েন্ট অ্যাকাউন্ট' : 'Active Client'}
                  </span>
                </div>

                {/* Company Registered Office */}
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>{isBn ? 'নিবন্ধিত কার্যালয়:' : 'Registered Office:'}</strong> {clientProfile.registeredOffice}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Admin Toggle */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  isAdminMode 
                    ? 'bg-amber-100 border-amber-300 text-amber-900' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isAdminMode ? (isBn ? 'স্টাফ মোড সক্রিয়' : 'Staff Mode Active') : (isBn ? 'স্টাফ ভিউতে যান' : 'Switch to Staff View')}
              </button>

              <button
                onClick={onNavigateToUpload}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{isBn ? 'ডকুমেন্ট আপলোড' : 'Upload Document'}</span>
              </button>

              <button
                onClick={onNavigateToBooking}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{isBn ? 'পরামর্শ বুকিং' : 'Book Appointment'}</span>
              </button>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-1 border-t border-slate-100 pt-3 mt-4 text-xs font-medium scrollbar-none">
            {[
              { id: 'overview', label: isBn ? 'সারসংক্ষেপ' : 'Overview', icon: LayoutDashboard },
              { id: 'cases', label: isBn ? `কেস ও আবেদন (${cases.length})` : `Cases & Applications (${cases.length})`, icon: FileText },
              { id: 'vault', label: isBn ? `ডকুমেন্ট ভল্ট (${documents.length})` : `Document Vault (${documents.length})`, icon: ShieldCheck },
              { id: 'travel', label: isBn ? `ভ্রমণ ডেস্ক (${travelInquiries.length})` : `Travel Desk (${travelInquiries.length})`, icon: Plane },
              { id: 'appointments', label: isBn ? `অ্যাপয়েন্টমেন্ট (${appointments.length})` : `Appointments (${appointments.length})`, icon: Calendar },
              { id: 'messages', label: isBn ? `পরামর্শক বার্তা (${messages.length})` : `Advisor Messages (${messages.length})`, icon: MessageSquare }
            ].map(t => {
              const Icon = t.icon;
              const isActive = dashboardTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setDashboardTab(t.id as any)}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 text-white font-bold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Admin mode banner notice */}
        {isAdminMode && (
          <div className="mb-6 bg-amber-50 border border-amber-300 rounded-lg p-3.5 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-700" />
              <span><strong>Staff / Consultant Mode:</strong> You are viewing internal file operations for St Albans (01727 301083) and Ilford (020 3581 3133) desks.</span>
            </div>
            <span className="text-[11px] font-mono font-bold bg-amber-200 px-2 py-0.5 rounded text-amber-950">
              OPERATOR ACCESS
            </span>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {dashboardTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Metric counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Cases</span>
                  <FileText className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-2">{cases.length}</div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <span className="font-semibold text-emerald-600">2 In Progress</span>
                  <span>·</span>
                  <span>1 Ready for Sign-off</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Document Vault</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-2">{documents.length}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Encrypted & verified in UK storage
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Upcoming Appointments</span>
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-2">{appointments.length}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  St Albans & Ilford London
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Travel Itineraries</span>
                  <Plane className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-2">{travelInquiries.length}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  1 Confirmed · 1 Quotation active
                </div>
              </div>
            </div>

            {/* Quick Action Alert: Official Letter Draft Awaiting Sign-off */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 text-amber-300 font-bold text-[10px] uppercase">
                  Action Required
                </div>
                <h3 className="font-extrabold text-lg text-slate-950">
                  Case GXT-LTR-2026-114: HMRC Letter Response Ready
                </h3>
                <p className="text-xs text-slate-900 font-medium">
                  Advisor Eleanor Vance has finalized the 3-page draft response for the 30-day statutory notice.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onNavigateToDecoder}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Review Decoded Draft
                </button>
              </div>
            </div>

            {/* Main 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Active Cases list */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                    Current Cases & Progression
                  </h3>
                  <button
                    onClick={() => setDashboardTab('cases')}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800"
                  >
                    View All Details
                  </button>
                </div>

                <div className="space-y-3">
                  {cases.map((c) => (
                    <div 
                      key={c.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-900">{c.caseRef}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs font-medium text-slate-500">{c.serviceType}</span>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          c.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : c.status === 'Action Drafted'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-blue-50 text-blue-700'
                        }`}>
                          {c.status}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 mb-2">{c.title}</h4>

                      {/* Progress Bar */}
                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>Completion Progress</span>
                          <span className="font-bold text-slate-800">{c.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              c.progressPercent === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${c.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <strong>Latest Note:</strong> {c.latestUpdate}
                      </p>

                      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
                        <span>Office: <strong>{c.assignedOffice}</strong></span>
                        <span>Advisor: <strong>{c.assignedAdvisor}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Office Support & Recent Messages */}
              <div className="lg:col-span-4 space-y-4">
                
                {/* Branch Contacts Box */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>Your Appointed GX Trade Desks</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="border border-slate-100 p-3 rounded-lg bg-slate-50/50">
                      <p className="font-bold text-slate-900">St Albans Head Office</p>
                      <p className="text-slate-500 text-[11px]">Hertfordshire, UK</p>
                      <div className="mt-2 flex items-center justify-between">
                        <a href={`tel:${OFFICE_LOCATIONS.headOffice.phone}`} className="font-mono font-bold text-amber-700 hover:underline">
                          {OFFICE_LOCATIONS.headOffice.formattedPhone}
                        </a>
                        <span className="text-[10px] text-slate-400">Head Admin</span>
                      </div>
                    </div>

                    <div className="border border-slate-100 p-3 rounded-lg bg-slate-50/50">
                      <p className="font-bold text-slate-900">London Office (Ilford)</p>
                      <p className="text-slate-500 text-[11px]">143 Cranbrook Road, IG1 4PU</p>
                      <div className="mt-2 flex items-center justify-between">
                        <a href={`tel:${OFFICE_LOCATIONS.londonOffice.phone}`} className="font-mono font-bold text-amber-700 hover:underline">
                          {OFFICE_LOCATIONS.londonOffice.formattedPhone}
                        </a>
                        <span className="text-[10px] text-slate-400">Visa & Docs Desk</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Advisor Chat snippet */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span>Direct Advisor Thread</span>
                    </h3>
                    <button
                      onClick={() => setDashboardTab('messages')}
                      className="text-xs font-semibold text-amber-700 hover:underline"
                    >
                      Open Chat
                    </button>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {messages.slice(-2).map((m) => (
                      <div 
                        key={m.id}
                        className={`p-3 rounded-lg text-xs ${
                          m.sender === 'client' 
                            ? 'bg-amber-50 text-amber-950 ml-4 border border-amber-200' 
                            : 'bg-slate-50 text-slate-800 mr-4 border border-slate-200'
                        }`}
                      >
                        <div className="font-bold text-[11px] mb-1">{m.senderName}</div>
                        <p className="line-clamp-3">{m.text}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleMessageSubmit} className="pt-2 flex gap-1.5">
                    <input
                      type="text"
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      placeholder="Quick question to advisor..."
                      className="flex-1 text-xs px-2.5 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                    />
                    <button
                      type="submit"
                      className="p-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: DETAILED CASES */}
        {dashboardTab === 'cases' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <h2 className="font-bold text-base text-slate-900">
                Detailed Applications & Advisory Cases
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={onNavigateToBooking}
                  className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  Open New Case
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cases.map((c) => (
                <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-bold text-xs text-amber-700">{c.caseRef}</span>
                      <h3 className="font-bold text-base text-slate-900 mt-1">{c.title}</h3>
                      <p className="text-xs text-slate-500">{c.serviceType}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      c.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Case Progression</span>
                      <span className="font-bold">{c.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${c.progressPercent === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${c.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 border border-slate-100">
                    <div><strong>Assigned Branch:</strong> {c.assignedOffice}</div>
                    <div><strong>Assigned Officer:</strong> {c.assignedAdvisor}</div>
                    <div><strong>Target Completion:</strong> {c.targetCompletionDate}</div>
                    <div><strong>Latest Milestone:</strong> {c.latestUpdate}</div>
                  </div>

                  {/* Admin controls to update status */}
                  {isAdminMode && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-amber-800 font-semibold">Staff Actions:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onUpdateCaseStatus && onUpdateCaseStatus(c.id, 'Action Drafted', 90)}
                          className="px-2 py-1 bg-amber-100 text-amber-900 rounded font-semibold text-[11px]"
                        >
                          Mark Drafted
                        </button>
                        <button
                          onClick={() => onUpdateCaseStatus && onUpdateCaseStatus(c.id, 'Completed', 100)}
                          className="px-2 py-1 bg-emerald-100 text-emerald-900 rounded font-semibold text-[11px]"
                        >
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{c.documentCount} Document(s) attached</span>
                    {c.serviceType.includes('Letter') && (
                      <button
                        onClick={onNavigateToDecoder}
                        className="text-xs font-bold text-amber-700 hover:underline"
                      >
                        Inspect Response Draft
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENT VAULT */}
        {dashboardTab === 'vault' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <h2 className="font-bold text-base text-slate-900">
                  Encrypted Client Document Vault
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  UK Data Protection Act 2018 Sovereign Storage · AES-256 Encrypted
                </p>
              </div>
              <button
                onClick={onNavigateToUpload}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload New File</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 truncate max-w-[220px]">
                          {doc.fileName}
                        </h4>
                        <div className="text-[11px] text-slate-500">
                          {doc.fileSize} · {doc.uploadDate}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {doc.category}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                    <div><strong>Branch:</strong> {doc.office}</div>
                    {doc.caseRef && <div><strong>Case Ref:</strong> {doc.caseRef}</div>}
                    {doc.notes && <div><strong>Notes:</strong> {doc.notes}</div>}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className={`text-xs font-bold ${
                      doc.status === 'Completed' || doc.status === 'Decoded'
                        ? 'text-emerald-700'
                        : 'text-amber-800'
                    }`}>
                      Status: {doc.status}
                    </span>

                    <div className="flex items-center gap-2">
                      {doc.decodedAnalysis && (
                        <button
                          onClick={onNavigateToDecoder}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer"
                        >
                          View Decoded
                        </button>
                      )}
                      <button
                        onClick={() => alert(`Simulating secure download of ${doc.fileName} from GX Trade vault.`)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer"
                        title="Download encrypted file"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TRAVEL DESK */}
        {dashboardTab === 'travel' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <h2 className="font-bold text-base text-slate-900">
                  Travel Desk: Flights & Hotels
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Corporate booking management and visa reservation vouchers
                </p>
              </div>
              <button
                onClick={onNavigateToTravel}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Plane className="w-3.5 h-3.5 text-amber-400" />
                <span>Search New Flight / Hotel</span>
              </button>
            </div>

            <div className="space-y-4">
              {travelInquiries.map((inq) => (
                <div key={inq.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900">{inq.referenceNo}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {inq.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">Issued: {inq.createdAt}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-xs space-y-1.5">
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <Plane className="w-4 h-4 text-amber-600" />
                        <span>{inq.origin || 'UK Departure'} ➔ {inq.destination}</span>
                      </div>
                      <p><strong>Dates:</strong> {inq.departureDate} {inq.returnDate && `until ${inq.returnDate}`}</p>
                      <p><strong>Passenger(s):</strong> {inq.passengers} · <strong>Class:</strong> {inq.cabinClass}</p>
                      {inq.hotelStars && (
                        <p><strong>Hotel:</strong> {inq.hotelStars} ({inq.hotelNights} Nights)</p>
                      )}
                    </div>

                    {inq.quoteDetails && (
                      <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-1.5">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{inq.quoteDetails.airlineOrHotel}</span>
                          <span className="text-amber-800">{inq.quoteDetails.estimatedCost}</span>
                        </div>
                        {inq.quoteDetails.flightDetails && (
                          <p className="text-[11px] text-slate-600">{inq.quoteDetails.flightDetails}</p>
                        )}
                        {inq.quoteDetails.hotelDetails && (
                          <p className="text-[11px] text-slate-600">{inq.quoteDetails.hotelDetails}</p>
                        )}
                        <div className="pt-1 text-[11px] font-semibold text-slate-500">
                          {inq.quoteDetails.expiresIn}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: APPOINTMENTS */}
        {dashboardTab === 'appointments' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <h2 className="font-bold text-base text-slate-900">
                Scheduled In-Person & Remote Appointments
              </h2>
              <button
                onClick={onNavigateToBooking}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>

            <div className="space-y-3">
              {appointments.map((apt) => (
                <div key={apt.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-amber-700">{apt.referenceNo}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {apt.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900">{apt.service}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span><strong>Office:</strong> {apt.office}</span>
                      <span><strong>Date & Time:</strong> {apt.date} ({apt.timeSlot})</span>
                    </div>
                    {apt.notes && <p className="text-xs text-slate-500 italic mt-1">"{apt.notes}"</p>}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Reschedule request sent to GX Trade reception desk.`)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: MESSAGES */}
        {dashboardTab === 'messages' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 max-w-4xl mx-auto space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-bold text-base text-slate-900">
                Secure Advisor Conversation
              </h2>
              <p className="text-xs text-slate-500">
                Direct line with Eleanor Vance (St Albans) and Farhan Rahman (London Ilford).
              </p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto p-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-xl text-xs max-w-xl ${
                    m.sender === 'client'
                      ? 'ml-auto bg-amber-500 text-slate-950 font-medium'
                      : 'mr-auto bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-[11px]">{m.senderName}</span>
                    <span className="text-[10px] opacity-75">{m.timestamp}</span>
                  </div>
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleMessageSubmit} className="pt-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                required
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder="Type your message to GX Trade advisors..."
                className="flex-1 text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-amber-400" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
