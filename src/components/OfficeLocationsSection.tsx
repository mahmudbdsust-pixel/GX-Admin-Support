import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Navigation, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { OFFICE_LOCATIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface OfficeLocationsSectionProps {
  onBookAtOffice: (officeName: 'St Albans Head Office' | 'London Ilford Office') => void;
}

export const OfficeLocationsSection: React.FC<OfficeLocationsSectionProps> = ({ onBookAtOffice }) => {
  const { language, isBn } = useLanguage();

  return (
    <section id="offices-section" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isBn ? 'ইউকে অফিস নেটওয়ার্ক' : 'Physical UK Presences'}</span>
            <span aria-hidden="true">·</span>
            <span>gxtrade.co.uk</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {isBn ? 'আমাদের যুক্তরাজ্যের অফিসসমূহ' : 'Our UK Office Locations'}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {isBn 
              ? 'কৌশলগত প্রশাসনিক ও ব্যবসায়িক কমপ্লায়েন্স সংক্রান্ত পরামর্শের জন্য হার্টফোর্ডশায়ারের সেন্ট অ্যালবান্স হেড অফিসে আসুন, অথবা দ্রুত নথি জমা ও ভিসা আবেদনের জন্য আমাদের লন্ডন ইলফোর্ড ডেস্কে আসুন।'
              : 'Visit our UK Head Office in Hertfordshire for strategic administrative and corporate compliance consultations, or drop into our London Ilford desk for fast document drop-off, visa applications, and letter decoding.'}
          </p>
        </div>

        {/* Office Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: UK Head Office (St Albans) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:border-slate-300 transition-all shadow-2xs">
            <div className="space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded">
                    {isBn ? 'ইউকে হেড অফিস' : 'UK Head Office'}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                    {isBn ? 'সেন্ট অ্যালবান্স, হার্টফোর্ডশায়ার' : 'St Albans, Hertfordshire'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isBn ? 'প্রধান প্রশাসনিক ও কমপ্লায়েন্স সেন্টার' : OFFICE_LOCATIONS.headOffice.tagline}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {isBn 
                  ? 'এক্সিকিউটিভ প্রশাসনিক প্রধান কার্যালয়, স্ট্র্যাটেজিক কনসালটেন্সি ও কর্পোরেট কমপ্লায়েন্স হাব।'
                  : OFFICE_LOCATIONS.headOffice.description}
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>St Albans, Hertfordshire, United Kingdom</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{isBn ? 'ল্যান্ডলাইন:' : 'Landline:'}</span>
                    <a 
                      href={`tel:${OFFICE_LOCATIONS.headOffice.phone}`}
                      className="font-mono font-bold text-amber-700 hover:underline"
                    >
                      {OFFICE_LOCATIONS.headOffice.formattedPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <a 
                    href={`mailto:${OFFICE_LOCATIONS.headOffice.email}`}
                    className="text-slate-800 hover:text-amber-700 font-medium"
                  >
                    {OFFICE_LOCATIONS.headOffice.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{isBn ? 'সোমবার – শুক্রবার: ০৯:০০ – ১৮:০০ | শনিবার: ১০:০০ – ১৪:০০' : OFFICE_LOCATIONS.headOffice.hours}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${OFFICE_LOCATIONS.headOffice.phone}`}
                className="flex-1 py-2.5 px-4 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{isBn ? 'সেন্ট অ্যালবান্সে কল করুন' : 'Call 01727 301083'}</span>
              </a>
              <button
                onClick={() => onBookAtOffice('St Albans Head Office')}
                className="flex-1 py-2.5 px-4 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{isBn ? 'সেন্ট অ্যালবান্স বুকিং' : 'Book St Albans Visit'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: London Office (Ilford) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:border-slate-300 transition-all shadow-2xs">
            <div className="space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded">
                    {isBn ? 'লন্ডন অফিস' : 'London Office'}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                    143 Cranbrook Road
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ilford, Essex IG1 4PU · {isBn ? 'ডকুমেন্ট, ভিসা ও ভ্রমণ কেন্দ্র' : OFFICE_LOCATIONS.londonOffice.tagline}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {isBn 
                  ? 'সরাসরি এসে নথি জমা দেওয়ার সুবিধা, ভিসা আবেদন প্রক্রিয়াকরণ ডেস্ক, চিঠি ড্রাফটিং এবং অনুবাদ সেবা। ইলফোর্ড স্টেশন (এলিজাবেথ লাইন) এর কাছাকাছি সুবিধাজনক অবস্থান।'
                  : `${OFFICE_LOCATIONS.londonOffice.description} Conveniently located near Ilford station (Elizabeth Line) with fast connections across Greater London and Essex.`}
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>143 Cranbrook Road, Ilford, Essex IG1 4PU</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{isBn ? 'ফোন:' : 'Phone:'}</span>
                    <a 
                      href={`tel:${OFFICE_LOCATIONS.londonOffice.phone}`}
                      className="font-mono font-bold text-amber-700 hover:underline"
                    >
                      {OFFICE_LOCATIONS.londonOffice.formattedPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <a 
                    href={`mailto:${OFFICE_LOCATIONS.londonOffice.email}`}
                    className="text-slate-800 hover:text-amber-700 font-medium"
                  >
                    {OFFICE_LOCATIONS.londonOffice.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{isBn ? 'সোমবার – শুক্রবার: ০৯:৩০ – ১৮:৩০ | শনিবার: ১০:০০ – ১৬:০০' : OFFICE_LOCATIONS.londonOffice.hours}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${OFFICE_LOCATIONS.londonOffice.phone}`}
                className="flex-1 py-2.5 px-4 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{isBn ? 'লন্ডনে কল করুন' : 'Call 020 3581 3133'}</span>
              </a>
              <button
                onClick={() => onBookAtOffice('London Ilford Office')}
                className="flex-1 py-2.5 px-4 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{isBn ? 'ইলফোর্ড ভিজিট বুকিং' : 'Book Ilford Visit'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
