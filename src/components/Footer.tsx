import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Building2, 
  Clock,
  FileText,
  Plane,
  Lock,
  Globe
} from 'lucide-react';
import { OFFICE_LOCATIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, setLanguage, isBn } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg tracking-wider border border-slate-800">
                <span className="text-amber-400">GX</span>
              </div>
              <div>
                <span className="font-extrabold text-base text-white tracking-tight">GX TRADE</span>
                <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800 font-mono">
                  gxtrade.co.uk
                </span>
                <p className="text-[11px] text-slate-500">
                  {isBn ? 'প্রশাসনিক সহায়তা ও ব্যবসায়িক কনসালটেন্সি' : 'Administrative Support & Consultancy Services'}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {isBn
                ? 'জিএক্স ট্রেড ইউকে জুড়ে সমন্বিত ব্যাক-অফিস সহায়তা, সরকারি চিঠি বিশ্লেষণ ও ফর্মাল জবাব ড্রাফটিং, ক্লায়েন্ট ফর্ম পূরণ, প্রত্যয়িত অনুবাদ, ইউকে ভিসা আবেদন এবং কর্পোরেট ফ্লাইট ও হোটেল রিজার্ভেশন সেবা প্রদান করে।'
                : 'GX Trade provides combined back-office support, statutory letter triage & response drafting, client form completion, certified translations, UK visa processing, and corporate flight/hotel travel management across the UK.'
              }
            </p>

            <div className="pt-2 flex items-center gap-2 text-slate-400 text-[11px]">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isBn ? 'যুক্তরাজ্য ডেটা প্রোটেকশন অ্যাক্ট ২০১৮ ও জিডিপিআর সম্পূর্ণ অনুবর্তী' : 'Full compliance with UK Data Protection Act 2018 & GDPR'}</span>
            </div>

            {/* Language Switcher in Footer */}
            <div className="pt-3 flex items-center gap-2">
              <span className="text-slate-500 text-[11px] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                {isBn ? 'ভাষা:' : 'Language:'}
              </span>
              <div className="inline-flex rounded-md p-0.5 bg-slate-900 border border-slate-800 text-[11px]">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    language === 'en' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('bn')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    language === 'bn' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  বাংলা (Bangla)
                </button>
              </div>
            </div>
          </div>

          {/* Core Activities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isBn ? 'মূল কার্যক্রম' : 'Business Activities'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  {isBn ? 'অফিস সাপোর্ট ও প্রশাসন' : 'Combined Office Support'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('decoder')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  {isBn ? 'অফিসিয়াল চিঠি ডিকোডিং' : 'Official Letter Decoding'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  {isBn ? 'ফর্ম পূরণ ও প্রত্যয়িত অনুবাদ' : 'Form Filling & Translations'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  {isBn ? 'ভিসা আবেদন ও যাচাই' : 'Visa Application Processing'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('travel')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  {isBn ? 'বিমান টিকিট ও হোটেল বুকিং' : 'Air Tickets & Hotel Booking'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  {isBn ? 'স্বচ্ছ মূল্য তালিকা' : 'Transparent Price List'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 font-semibold text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1">
                  <span>{isBn ? 'যোগাযোগ ও অনুসন্ধান ফর্ম' : 'Contact & Query Form'}</span>
                  <span className="text-[10px] px-1 bg-amber-400/20 text-amber-300 rounded">Direct</span>
                </button>
              </li>
            </ul>
          </div>

          {/* St Albans Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{isBn ? 'ইউকে হেড অফিস' : 'UK Head Office'}</span>
            </h4>
            <div className="text-slate-400 space-y-1">
              <p className="text-white font-semibold">St Albans</p>
              <p>Hertfordshire, United Kingdom</p>
              <div className="pt-2">
                <p className="text-slate-500 text-[11px]">{isBn ? 'ল্যান্ডলাইন নম্বর:' : 'Landline number:'}</p>
                <a href={`tel:${OFFICE_LOCATIONS.headOffice.phone}`} className="font-mono text-white hover:text-amber-300 font-bold">
                  {OFFICE_LOCATIONS.headOffice.formattedPhone}
                </a>
              </div>
              <div className="pt-1">
                <a href={`mailto:${OFFICE_LOCATIONS.headOffice.email}`} className="text-amber-400 hover:underline">
                  {OFFICE_LOCATIONS.headOffice.email}
                </a>
              </div>
            </div>
          </div>

          {/* London Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{isBn ? 'লন্ডন অফিস' : 'London Office'}</span>
            </h4>
            <div className="text-slate-400 space-y-1">
              <p className="text-white font-semibold">143 Cranbrook Road</p>
              <p>Ilford, Essex</p>
              <p className="font-mono text-white">IG1 4PU</p>
              <div className="pt-2">
                <p className="text-slate-500 text-[11px]">{isBn ? 'ফোন নম্বর:' : 'Phone number:'}</p>
                <a href={`tel:${OFFICE_LOCATIONS.londonOffice.phone}`} className="font-mono text-white hover:text-amber-300 font-bold">
                  {OFFICE_LOCATIONS.londonOffice.formattedPhone}
                </a>
              </div>
              <div className="pt-1">
                <a href={`mailto:${OFFICE_LOCATIONS.londonOffice.email}`} className="text-amber-400 hover:underline">
                  {OFFICE_LOCATIONS.londonOffice.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & legal disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            {isBn 
              ? `© ${new Date().getFullYear()} GX Trade (gxtrade.co.uk)। সর্বস্বত্ব সংরক্ষিত। যুক্তরাজ্যে নিবন্ধিত।`
              : `© ${new Date().getFullYear()} GX Trade (gxtrade.co.uk). All rights reserved. Registered in the United Kingdom.`
            }
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('upload')} className="hover:text-slate-400 cursor-pointer">
              {isBn ? 'সিকিউর আপলোড' : 'Secure Upload'}
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('booking')} className="hover:text-slate-400 cursor-pointer">
              {isBn ? 'অ্যাপয়েন্টমেন্ট' : 'Booking Portal'}
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('pricing')} className="hover:text-amber-400 font-semibold cursor-pointer">
              {isBn ? 'মূল্য তালিকা' : 'Price List & Tariff'}
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('dashboard')} className="hover:text-slate-400 cursor-pointer">
              {isBn ? 'ক্লায়েন্ট পোর্টাল' : 'Client Dashboard'}
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 font-semibold cursor-pointer">
              {isBn ? 'যোগাযোগ ও জিজ্ঞাসা' : 'Contact & Inquiry'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
