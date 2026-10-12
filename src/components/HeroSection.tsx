import React from 'react';
import { 
  ShieldCheck, 
  FileSearch, 
  Briefcase, 
  Plane, 
  Languages, 
  Calendar, 
  UploadCloud, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  FileCheck2, 
  Receipt,
  Globe,
  MessageSquare
} from 'lucide-react';
import { OFFICE_LOCATIONS } from '../data/mockData';
import { OverviewBackgroundConfig, OverviewBackgroundPicker, THEME_PRESETS } from './OverviewBackgroundPicker';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  overviewTheme?: OverviewBackgroundConfig;
  onThemeChange?: (theme: OverviewBackgroundConfig) => void;
  onNotification?: (msg: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onNavigate,
  overviewTheme = THEME_PRESETS[0],
  onThemeChange,
  onNotification
}) => {
  const isLight = overviewTheme.isLightMode;
  const { language, setLanguage, t, isBn } = useLanguage();

  return (
    <div 
      className={`relative overflow-hidden transition-colors duration-500 pt-12 pb-20 ${
        isLight ? 'text-slate-900' : 'text-white'
      }`}
      style={{
        background: overviewTheme.uploadedImage 
          ? undefined 
          : `linear-gradient(to bottom, ${overviewTheme.primaryColor}, ${overviewTheme.gradientTo})`,
        backgroundColor: overviewTheme.primaryColor
      }}
    >
      {/* Uploaded Background Image Layer */}
      {overviewTheme.uploadedImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none"
          style={{ backgroundImage: `url(${overviewTheme.uploadedImage})` }}
        />
      )}

      {/* Dynamic Overlay for Text Contrast */}
      {overviewTheme.uploadedImage && (
        <div 
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{ 
            backgroundColor: overviewTheme.primaryColor,
            opacity: overviewTheme.overlayOpacity 
          }}
        />
      )}

      {/* Geometric pattern backdrop */}
      {overviewTheme.pattern === 'dots' && (
        <div className={`absolute inset-0 pointer-events-none ${
          isLight 
            ? 'opacity-25 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]'
            : 'opacity-15 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]'
        }`} />
      )}
      {overviewTheme.pattern === 'grid' && (
        <div className={`absolute inset-0 pointer-events-none ${
          isLight
            ? 'opacity-20 bg-[linear-gradient(to_right,#0284c718_1px,transparent_1px),linear-gradient(to_bottom,#0284c718_1px,transparent_1px)] bg-[size:32px_32px]'
            : 'opacity-10 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:32px_32px]'
        }`} />
      )}
      {overviewTheme.pattern === 'mesh' && (
        <div className={`absolute inset-0 pointer-events-none ${
          isLight
            ? 'opacity-30 bg-[radial-gradient(circle_at_20%_20%,#38bdf8_0,transparent_35%),radial-gradient(circle_at_80%_80%,#93c5fd_0,transparent_35%)]'
            : 'opacity-20 bg-[radial-gradient(circle_at_20%_20%,#38bdf8_0,transparent_25%),radial-gradient(circle_at_80%_80%,#fbbf24_0,transparent_25%)]'
        }`} />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Utility Row with Theme & Background Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs backdrop-blur-xs ${
              isLight 
                ? 'bg-white/80 border border-sky-300 text-slate-700 shadow-xs' 
                : 'bg-slate-800/80 border border-slate-700/80 text-slate-300'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-sky-600' : 'bg-amber-400'}`}></span>
              <span className={`font-semibold tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>gxtrade.co.uk</span>
              <span className={isLight ? 'text-slate-400' : 'text-slate-500'} aria-hidden="true">·</span>
              <span>{isBn ? 'সেন্ট অ্যালবান্স ও লন্ডন ইলফোর্ড অফিস' : 'Offices in St Albans & London Ilford'}</span>
            </div>

            {/* Bilingual badge */}
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] backdrop-blur-xs ${
              isLight
                ? 'bg-emerald-50/90 border border-emerald-300 text-emerald-800 shadow-xs'
                : 'bg-emerald-950/80 border border-emerald-700/80 text-emerald-300'
            }`}>
              <Globe className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
              <span>{isBn ? 'বাংলা সংস্করণ সক্রিয় (English available)' : 'Bilingual Support (English & বাংলা)'}</span>
            </div>
          </div>

          {/* Background & Theme Customizer Button */}
          {onThemeChange && (
            <OverviewBackgroundPicker 
              currentTheme={overviewTheme} 
              onThemeChange={onThemeChange} 
              onNotification={onNotification}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {isBn ? (
                <>
                  যুক্তরাজ্যে সমন্বিত অফিস সাপোর্ট,{' '}
                  <span className={isLight ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-800 font-black" : "text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500"}>
                    অফিসিয়াল চিঠি বিশ্লেষণ
                  </span>{' '}
                  ও কর্পোরেট ভ্রমণ সেবা।
                </>
              ) : (
                <>
                  Combined Office Support,{' '}
                  <span className={isLight ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-800 font-black" : "text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500"}>
                    Official Letter Triage
                  </span>{' '}
                  & Travel Management.
                </>
              )}
            </h1>

            <p className={`text-base sm:text-lg max-w-2xl font-normal leading-relaxed ${
              isLight ? 'text-slate-700 font-medium' : 'text-slate-300'
            }`}>
              {isBn 
                ? 'জিএক্স ট্রেড ইউকে জুড়ে কোম্পানি ও প্রবাসীদের জন্য নির্ভরযোগ্য ব্যাক-অফিস সহায়তা, ব্যবসায়িক পরামর্শ, HMRC ও হোম অফিসের জটিল চিঠি বিশ্লেষণ ও ফর্মাল জবাব প্রস্তুত, ফর্ম পূরণ, প্রত্যয়িত অনুবাদ, ইউকে ভিসা আবেদন এবং কর্পোরেট ফ্লাইট ও হোটেল বুকিং সেবা নিশ্চিত করে।'
                : 'GX Trade provides dedicated administrative support, business consultancy, official correspondence decoding & response drafting, client form completion, certified translations, visa processing, and corporate travel reservations for businesses and individuals across the United Kingdom.'
              }
            </p>

            {/* Core Capability Checklist */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm ${
              isLight ? 'text-slate-800 font-medium' : 'text-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-sky-600' : 'text-amber-400'}`} />
                <span>
                  {isBn 
                    ? 'HMRC, Home Office ও কাউন্সিলের চিঠি বিশ্লেষণ ও জবাব' 
                    : 'Decoding complex HMRC, Home Office & Council letters'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-sky-600' : 'text-amber-400'}`} />
                <span>
                  {isBn 
                    ? 'যুক্তরাজ্য ও আন্তর্জাতিক ভিসা আবেদন প্রক্রিয়াকরণ' 
                    : 'UK & International Visa Application Processing'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-sky-600' : 'text-amber-400'}`} />
                <span>
                  {isBn 
                    ? 'সরকারি ফর্ম পূরণ ও প্রত্যয়িত বাংলা-ইংরেজি অনুবাদ' 
                    : 'Complete form-filling & certified translation'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-sky-600' : 'text-amber-400'}`} />
                <span>
                  {isBn 
                    ? 'কর্পোরেট বিমান টিকিট ও হোটেল রিজার্ভেশন ডেস্ক' 
                    : 'Corporate air tickets & hotel reservation desk'}
                </span>
              </div>
            </div>

            {/* Interactive CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('booking')}
                className="px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>{isBn ? 'পরামর্শ বুক করুন' : 'Book Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('upload')}
                className={`px-5 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-slate-900 border border-sky-300 shadow-xs'
                    : 'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 backdrop-blur-xs'
                }`}
              >
                <UploadCloud className={`w-4 h-4 ${isLight ? 'text-sky-600' : 'text-amber-400'}`} />
                <span>{isBn ? 'নিরাপদ ডকুমেন্ট আপলোড' : 'Secure Document Upload'}</span>
              </button>

              <button
                onClick={() => onNavigate('pricing')}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'bg-sky-100/90 hover:bg-sky-200 text-sky-900 border border-sky-300/80 shadow-xs'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/30 backdrop-blur-xs'
                }`}
              >
                <Receipt className={`w-4 h-4 ${isLight ? 'text-sky-700' : 'text-amber-400'}`} />
                <span>{isBn ? 'মূল্য তালিকা দেখুন' : 'View Price List'}</span>
              </button>

              <button
                onClick={() => onNavigate('decoder')}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-white/70'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <FileSearch className={`w-4 h-4 ${isLight ? 'text-sky-700' : 'text-slate-400'}`} />
                <span>{isBn ? 'চিঠি ডিকোডার টুল' : 'Letter Decoder Tool'}</span>
              </button>
            </div>

            {/* Quick Contact bar */}
            <div className={`pt-4 border-t flex flex-wrap items-center gap-6 text-xs ${
              isLight ? 'border-sky-300/80 text-slate-700' : 'border-slate-800/90 text-slate-400'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                  {isBn ? 'সেন্ট অ্যালবান্স হেড অফিস:' : 'St Albans Head Office:'}
                </span>
                <a 
                  href={`tel:${OFFICE_LOCATIONS.headOffice.phone}`} 
                  className={`font-mono font-bold hover:underline ${isLight ? 'text-sky-800 hover:text-sky-950' : 'text-amber-400'}`}
                >
                  {OFFICE_LOCATIONS.headOffice.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                  {isBn ? 'লন্ডন অফিস (ইলফোর্ড):' : 'London Office (Ilford):'}
                </span>
                <a 
                  href={`tel:${OFFICE_LOCATIONS.londonOffice.phone}`} 
                  className={`font-mono font-bold hover:underline ${isLight ? 'text-sky-800 hover:text-sky-950' : 'text-amber-400'}`}
                >
                  {OFFICE_LOCATIONS.londonOffice.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{isBn ? 'সোম–শনি সার্বক্ষণিক সেবা' : 'Mon–Sat Client Service'}</span>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className={`ml-auto font-bold flex items-center gap-1 hover:underline cursor-pointer transition-colors ${
                  isLight ? 'text-blue-700 hover:text-blue-900' : 'text-amber-400 hover:text-amber-300'
                }`}
                title="Send an official inquiry / contact form"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isBn ? 'অনুসন্ধান পাঠান' : 'Contact / Submit Query'} &rarr;</span>
              </button>
            </div>

          </div>

          {/* Right Column: Direct Office Cards & Service Quick Access */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Card 1: Official Letter Triage Box */}
            <div className={`rounded-xl p-5 shadow-xl backdrop-blur-md transition-colors ${
              isLight 
                ? 'bg-white/95 border border-sky-200 text-slate-800 shadow-sky-900/5' 
                : 'bg-slate-900/85 border border-slate-700/90 text-white'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                    isLight
                      ? 'bg-amber-100 text-amber-700 border border-amber-300'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    <FileSearch className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {isBn ? 'জটিল সরকারি বা আইনি চিঠি পেয়েছেন?' : 'Received a Difficult Official Letter?'}
                    </h2>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {isBn ? 'HMRC · Home Office · কোর্ট · কাউন্সিলের নোটিশ' : 'HMRC · Home Office · Courts · Council Letters'}
                    </p>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  isLight
                    ? 'text-emerald-800 bg-emerald-100 border border-emerald-300'
                    : 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/80'
                }`}>
                  {isBn ? '২৪ ঘণ্টায় ড্রাফট' : '24h Turnaround'}
                </span>
              </div>
              <p className={`mt-3 text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {isBn 
                  ? 'কঠোর বিধিবদ্ধ সময়সীমা পার হতে দেবেন না। আমাদের পরামর্শকরা চিঠির আইনগত শর্ত বিশ্লেষণ করে জরুরি ডেডলাইন শনাক্ত করেন এবং আপনার পক্ষে উপযুক্ত আনুষ্ঠানিক জবাবের খসড়া প্রস্তুত করেন।'
                  : 'Do not let strict statutory deadlines expire. Our consultants decode the official jargon, identify urgent deadlines, and draft formal, compliant response letters on your behalf.'
                }
              </p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('decoder')}
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-md bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors text-center cursor-pointer shadow-xs"
                >
                  {isBn ? 'নমুনা চিঠি ডিকোডার পরীক্ষা করুন' : 'Test Sample Letter Decoder'}
                </button>
                <button
                  onClick={() => onNavigate('upload')}
                  className={`py-2 px-3 text-xs font-medium rounded-md transition-colors text-center cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {isBn ? 'আপনার চিঠি জমা দিন' : 'Upload Your Letter'}
                </button>
              </div>
            </div>

            {/* Dual Office Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* St Albans Head Office */}
              <div className={`rounded-lg p-4 transition-colors backdrop-blur-sm ${
                isLight
                  ? 'bg-white/95 border border-sky-200 shadow-md text-slate-800 hover:border-sky-300'
                  : 'bg-slate-900/80 border border-slate-700/80 text-white hover:border-slate-600'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1 ${
                  isLight ? 'text-sky-700' : 'text-amber-400'
                }`}>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ইউকে হেড অফিস' : 'UK Head Office'}</span>
                </div>
                <h3 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>St Albans</h3>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Hertfordshire, UK</p>
                <div className={`mt-3 pt-2 border-t flex items-center justify-between text-xs ${
                  isLight ? 'border-sky-100' : 'border-slate-700/70'
                }`}>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>{isBn ? 'ফোন:' : 'Direct Line:'}</span>
                  <a 
                    href={`tel:${OFFICE_LOCATIONS.headOffice.phone}`} 
                    className={`font-semibold font-mono ${isLight ? 'text-sky-700 hover:text-sky-900' : 'text-white hover:text-amber-300'}`}
                  >
                    {OFFICE_LOCATIONS.headOffice.formattedPhone}
                  </a>
                </div>
              </div>

              {/* London Ilford Office */}
              <div className={`rounded-lg p-4 transition-colors backdrop-blur-sm ${
                isLight
                  ? 'bg-white/95 border border-sky-200 shadow-md text-slate-800 hover:border-sky-300'
                  : 'bg-slate-900/80 border border-slate-700/80 text-white hover:border-slate-600'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1 ${
                  isLight ? 'text-sky-700' : 'text-amber-400'
                }`}>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isBn ? 'লন্ডন অফিস' : 'London Office'}</span>
                </div>
                <h3 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>143 Cranbrook Road</h3>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Ilford, Essex IG1 4PU</p>
                <div className={`mt-3 pt-2 border-t flex items-center justify-between text-xs ${
                  isLight ? 'border-sky-100' : 'border-slate-700/70'
                }`}>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>{isBn ? 'ফোন:' : 'Direct Line:'}</span>
                  <a 
                    href={`tel:${OFFICE_LOCATIONS.londonOffice.phone}`} 
                    className={`font-semibold font-mono ${isLight ? 'text-sky-700 hover:text-sky-900' : 'text-white hover:text-amber-300'}`}
                  >
                    {OFFICE_LOCATIONS.londonOffice.formattedPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Travel & Visa Quick Bar */}
            <div className={`rounded-lg p-3.5 flex items-center justify-between text-xs backdrop-blur-sm ${
              isLight
                ? 'bg-white/90 border border-sky-200 text-slate-700 shadow-sm'
                : 'bg-slate-900/70 border border-slate-700/60 text-slate-300'
            }`}>
              <div className="flex items-center gap-2.5">
                <Plane className={`w-4 h-4 ${isLight ? 'text-sky-600' : 'text-amber-400'}`} />
                <span className="font-medium">
                  {isBn 
                    ? 'বিমান টিকিট, হোটেল রুম বা ভিসা ফর্ম সহায়তা প্রয়োজন?' 
                    : 'Need airline tickets, hotel rooms, or visa forms?'}
                </span>
              </div>
              <button
                onClick={() => onNavigate('travel')}
                className={`font-semibold flex items-center gap-1 cursor-pointer ${
                  isLight ? 'text-sky-700 hover:text-sky-900' : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                <span>{isBn ? 'ভ্রমণ ডেস্ক' : 'Travel Desk'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
