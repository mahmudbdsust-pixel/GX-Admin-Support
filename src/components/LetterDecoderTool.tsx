import React, { useState } from 'react';
import { 
  FileSearch, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Copy, 
  Check, 
  FileText, 
  Send, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Download, 
  RefreshCw,
  Globe
} from 'lucide-react';
import { DecodedLetterAnalysis } from '../types';
import { SAMPLE_LETTER_TEMPLATES, OFFICE_LOCATIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface LetterDecoderToolProps {
  onDirectSubmitToOffice?: (analysis: DecodedLetterAnalysis, letterText: string) => void;
  onNavigateToBooking?: () => void;
}

export const LetterDecoderTool: React.FC<LetterDecoderToolProps> = ({ 
  onDirectSubmitToOffice,
  onNavigateToBooking 
}) => {
  const { language, isBn } = useLanguage();
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [customLetterText, setCustomLetterText] = useState<string>(SAMPLE_LETTER_TEMPLATES[0].text);
  const [senderAgency, setSenderAgency] = useState<string>(SAMPLE_LETTER_TEMPLATES[0].sender);
  const [isDecoding, setIsDecoding] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<DecodedLetterAnalysis>(SAMPLE_LETTER_TEMPLATES[0].presetAnalysis);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const handleSelectTemplate = (idx: number) => {
    setSelectedTemplateIndex(idx);
    const tmpl = SAMPLE_LETTER_TEMPLATES[idx];
    setCustomLetterText(tmpl.text);
    setSenderAgency(tmpl.sender);
    setAnalysisResult(tmpl.presetAnalysis);
    setSubmissionFeedback(null);
  };

  const handleRunDecoder = () => {
    setIsDecoding(true);
    setSubmissionFeedback(null);

    // Realistic synthesis based on text cues
    setTimeout(() => {
      const lower = customLetterText.toLowerCase();
      let agency = senderAgency || (isBn ? 'ইউকে অফিশিয়াল কর্তৃপক্ষ' : 'Official Statutory Authority');
      let urgency: 'Standard' | 'Medium' | 'High' | 'Immediate Action' = 'Medium';
      let deadline = isBn ? 'প্রাপ্তির ১৪ দিনের মধ্যে' : '14 Days from receipt';

      if (lower.includes('hmrc') || lower.includes('revenue') || lower.includes('tax')) {
        agency = 'HM Revenue & Customs (HMRC)';
        urgency = 'Medium';
        deadline = isBn ? 'বিধিবদ্ধ তারিখ থেকে ৩০ দিন' : '30 Days from statutory date';
      } else if (lower.includes('home office') || lower.includes('visa') || lower.includes('ukvi') || lower.includes('immigration')) {
        agency = 'UK Visas & Immigration (Home Office)';
        urgency = 'High';
        deadline = isBn ? '১০ কার্যদিবসের মধ্যে' : '10 Working Days';
      } else if (lower.includes('court') || lower.includes('tribunal') || lower.includes('bailiff') || lower.includes('enforcement')) {
        agency = 'County Court / Enforcement Agency';
        urgency = 'Immediate Action';
        deadline = isBn ? '৭ ক্যালেন্ডার দিন' : '7 Calendar Days';
      } else if (lower.includes('council') || lower.includes('rates') || lower.includes('borough')) {
        agency = 'Local Authority Municipal Revenues';
        urgency = 'Standard';
        deadline = isBn ? '২১ দিন' : '21 Days';
      }

      const generatedAnalysis: DecodedLetterAnalysis = {
        summary: isBn 
          ? `এই চিঠিটি ${agency} থেকে প্রেরিত একটি আনুষ্ঠানিক নোটিশ। কর্তৃপক্ষ নথিপত্রভিত্তিক স্পষ্টীকরণ ও আইনি তথ্য নিশ্চিত করতে নির্দেশ দিয়েছে। এটি সরাসরি কোনো চূড়ান্ত জরিমানা বা নিষেধাজ্ঞা নয়, তবে নির্ধারিত সময়সীমার (${deadline}) মধ্যে উপযুক্ত লিখিত জবাব ও প্রমাণপত্র না পাঠালে জরিমানামূলক আইনানুগ ব্যবস্থা গ্রহণ করা হতে পারে।`
          : `This letter is a formal notice from ${agency}. The issuing authority requires documented clarification and statutory confirmation. It is not an immediate penalty or sanction, but failure to reply within the deadline (${deadline}) will trigger non-compliance proceedings.`,
        senderAgency: agency,
        urgency,
        deadlineDate: deadline,
        keyPoints: isBn ? [
          `চিঠি প্রেরণকারী কর্তৃপক্ষ: ${agency}`,
          `কঠোর বিধিবদ্ধ সময়সীমা: ${deadline}`,
          'টেলিফোনের পরিবর্তে আনুষ্ঠানিক লিখিত জবাব ও প্রাসঙ্গিক প্রমাণপত্র আবশ্যক',
          'ইউকে স্ট্যান্ডার্ড ফরম্যাটে প্রতিনিধিত্বকারী ব্যাখ্যা ও শিডিউল যুক্ত করতে হবে'
        ] : [
          `Identified sender: ${agency}`,
          `Compliance window: strict deadline (${deadline})`,
          'Mandatory written confirmation requested rather than telephone response',
          'Supporting evidence required to accompany standard explanatory submission'
        ],
        recommendedAction: isBn 
          ? `জিএক্স ট্রেড পরামর্শক টিম প্রয়োজনীয় প্রশাসনিক শিডিউল সংকলন করে আমাদের সেন্ট অ্যালবান্স (01727 301083) বা লন্ডন ইলফোর্ড (020 3581 3133) ব্রাঞ্চের মাধ্যমে দ্রুত আনুষ্ঠানিক জবাবপত্র দাখিল করবে।`
          : `GX Trade will compile the required administrative schedules and file a formal representation response through our St Albans (01727 301083) or London Ilford (020 3581 3133) branches.`,
        draftedResponse: `To: ${agency}\nDepartment of Statutory Compliance\nReference: [Refer to Case Number in Header]\n\nDear Officer,\n\nRe: Formal Response and Administrative Clarification\n\nWe refer to your official notice dated recently. On behalf of the subject party, please accept this formal written response providing clarification on the matters raised.\n\nAll requested schedules, account summaries, and supporting verification documents have been compiled in full accordance with statutory guidelines and are enclosed herewith.\n\nShould your department require any further particulars or clarification, kindly address all communications directly to our appointed administrative representatives:\n\nGX Trade (UK Combined Administrative & Consultancy Services)\nUK Head Office: St Albans, Hertfordshire (Tel: 01727 301083)\nLondon Office: 143 Cranbrook Road, Ilford, IG1 4PU (Tel: 020 3581 3133)\nEmail: Info@gxtrade.co.uk | Web: gxtrade.co.uk\n\nYours faithfully,\nAuthorized Client Representative / GX Trade Support Desk`
      };

      setAnalysisResult(generatedAnalysis);
      setIsDecoding(false);
    }, 600);
  };

  const handleCopyDraft = () => {
    if (analysisResult?.draftedResponse) {
      navigator.clipboard.writeText(analysisResult.draftedResponse);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    }
  };

  const handleSendToOffice = () => {
    if (onDirectSubmitToOffice) {
      onDirectSubmitToOffice(analysisResult, customLetterText);
    }
    setSubmissionFeedback(
      isBn 
        ? 'চিঠি এবং বিশ্লেষণের ফলাফল জিএক্স ট্রেড কনসালট্যান্ট ডেস্কে প্রেরিত হয়েছে (সেন্ট অ্যালবান্স ও ইলফোর্ড টিম দ্রুত যোগাযোগ করবে)।'
        : 'Letter and decoded case dispatched to GX Trade Consultants (Case logged for St Albans & Ilford review).'
    );
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md mb-3">
            <span>{isBn ? 'বিশেষায়িত সেবা' : 'Specialized Service Feature'}</span>
            <span aria-hidden="true">·</span>
            <span>{isBn ? 'অফিসিয়াল চিঠি বিশ্লেষণ ও উত্তর ড্রাফটিং' : 'Official Letter Triage & Response'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {isBn 
              ? 'অফিসিয়াল চিঠি ডিকোডিং ও ফর্মাল উত্তর ড্রাফটিং' 
              : 'Decoding Official Letters & Response Drafting'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {isBn 
              ? 'HMRC, Home Office (UKVI), কোর্ট কিংবা স্থানীয় কাউন্সিল থেকে জটিল ইংরেজি চিঠি পেয়েছেন? নিচে টেক্সটটি পেস্ট করুন বা টেমপ্লেট নির্বাচন করুন। আমাদের বিশ্লেষক সিস্টেম ও টিম চিঠির ভেতরের কঠিন আইনগত শর্ত উন্মোচন করে জরুরি ডেডলাইন এবং প্রাতিষ্ঠানিক জবাব তৈরি করে দেবে।'
              : 'Received confusing, stressful, or urgent correspondence from HMRC, Home Office, County Courts, or Local Councils? Paste or type the text below to see how our consultants decode the requirements, identify deadlines, and draft formal responses.'}
          </p>
        </div>

        {/* Template Selectors */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            {isBn ? 'পরীক্ষা করার জন্য নমুনা ইউকে বিধিবদ্ধ চিঠি নির্বাচন করুন:' : 'Load sample UK statutory notices to test:'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SAMPLE_LETTER_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectTemplate(idx)}
                className={`p-3.5 text-left rounded-lg border transition-all cursor-pointer ${
                  selectedTemplateIndex === idx
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div className="text-xs font-bold truncate">{tmpl.title}</div>
                <div className={`text-[11px] truncate mt-1 ${selectedTemplateIndex === idx ? 'text-amber-300' : 'text-slate-500'}`}>
                  {tmpl.sender}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Letter Input & Controls */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>{isBn ? 'অফিসিয়াল চিঠির টেক্সট (পেস্ট বা এডিট করুন)' : 'Official Letter Text (Paste or Edit)'}</span>
                </label>
                <span className="text-xs text-slate-400">
                  {customLetterText.length} {isBn ? 'অক্ষর' : 'characters'}
                </span>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={senderAgency}
                  onChange={(e) => setSenderAgency(e.target.value)}
                  placeholder={isBn ? "প্রেরক সংস্থা (যেমন: HMRC, Home Office UKVI, City Council, County Court)" : "Sender (e.g. HMRC, Home Office UKVI, City Council, County Court)"}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>

              <textarea
                value={customLetterText}
                onChange={(e) => setCustomLetterText(e.target.value)}
                rows={13}
                placeholder={isBn ? "আপনার প্রাপ্ত চিঠি বা নোটিশের টেক্সট এখানে পেস্ট করুন..." : "Paste the wording of the letter, notice, or citation you received..."}
                className="w-full text-xs font-mono p-3 bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-slate-900 leading-relaxed resize-y"
              />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                <button
                  onClick={handleRunDecoder}
                  disabled={isDecoding || !customLetterText.trim()}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {isDecoding ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>{isBn ? 'আইনি ধারা ও ডেডলাইন বিশ্লেষণ হচ্ছে...' : 'Decoding Legal Clauses...'}</span>
                    </>
                  ) : (
                    <>
                      <FileSearch className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isBn ? 'চিঠি বিশ্লেষণ ও উত্তর প্রস্তুত করুন' : 'Decode & Generate Response'}</span>
                    </>
                  )}
                </button>

                <div className="text-xs text-slate-500">
                  <span>{isBn ? '১০০% গোপনীয় ও জিডিপিআর এনক্রিপ্টেড' : 'Confidential & GDPR encrypted'}</span>
                </div>
              </div>
            </div>

            {/* Helpline reminder card */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{isBn ? 'কঠোর বিধিবদ্ধ ডেডলাইনের গুরুত্ব' : 'Strict Statutory Deadlines Matter'}</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                {isBn 
                  ? <>যদি চিঠিতে ৭ দিন, ১৪ দিন বা ৩০ দিনের ডেডলাইন থাকে, তবে অবিলম্বে আমাদের বিশেষজ্ঞদের সাথে সেন্ট অ্যালবান্স (<strong>01727 301083</strong>) বা লন্ডন ইলফোর্ড (<strong>020 3581 3133</strong>) শাখায় যোগাযোগ করুন যাতে সময়সীমা পার হওয়ার কারণে জরিমানা না হয়।</>
                  : <>If your letter contains a 7-day, 14-day, or 30-day deadline, call our advisors directly at <strong>St Albans (01727 301083)</strong> or <strong>London Ilford (020 3581 3133)</strong> so we can stop time-barred consequences immediately.</>
                }
              </p>
            </div>
          </div>

          {/* Right Column: Decoded Plain English & Drafted Response */}
          <div className="lg:col-span-6 space-y-5">
            {analysisResult && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                
                {/* Header breakdown info */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {isBn ? 'বিশ্লেষণ ও পর্যালোচনা' : 'Triage Analysis'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600">{isBn ? 'জরুরিতা:' : 'Urgency:'}</span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                        analysisResult.urgency === 'Immediate Action'
                          ? 'bg-rose-100 text-rose-800'
                          : analysisResult.urgency === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isBn 
                          ? (analysisResult.urgency === 'Immediate Action' ? 'অবিলম্বে ব্যবস্থা' : analysisResult.urgency === 'High' ? 'উচ্চ জরুরি' : 'সাধারণ')
                          : analysisResult.urgency}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {analysisResult.senderAgency}
                  </h3>
                  
                  {analysisResult.deadlineDate && (
                    <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-rose-700">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{isBn ? 'বিধিবদ্ধ ডেডলাইন:' : 'Statutory Deadline:'} {analysisResult.deadlineDate}</span>
                    </div>
                  )}
                </div>

                {/* 1. What does this mean */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{isBn ? 'সহজ ভাষায় চিঠির সারসংক্ষেপ ও ব্যাখ্যা' : 'Plain English Explanation'}</span>
                  </h4>
                  <div className="bg-slate-50 rounded-lg p-3.5 text-xs text-slate-700 leading-relaxed border border-slate-100">
                    {analysisResult.summary}
                  </div>
                </div>

                {/* 2. Key Action Points */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    {isBn ? 'চিহ্নিত মূল করণীয় বিষয়সমূহ' : 'Key Action Points Identified'}
                  </h4>
                  <ul className="space-y-1.5">
                    {analysisResult.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Drafted Professional Response */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>{isBn ? 'আনুষ্ঠানিক উত্তরের ইংরেজি খসড়া (Formal Response Draft)' : 'Formal Response Letter Draft'}</span>
                    </h4>
                    <button
                      onClick={handleCopyDraft}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">{isBn ? 'কপি সম্পন্ন!' : 'Copied to clipboard'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>{isBn ? 'ড্রাফট কপি করুন' : 'Copy Draft Text'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-900 text-slate-200 rounded-lg p-4 font-mono text-[11px] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap border border-slate-800">
                    {analysisResult.draftedResponse}
                  </div>
                </div>

                {/* Action footer */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={handleSendToOffice}
                    className="py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isBn ? 'জিএক্স ট্রেড অফিসে জবাব ফাইলিংয়ের নির্দেশ দিন' : 'Instruct GX Trade to Handle & Send Response'}</span>
                  </button>

                  {onNavigateToBooking && (
                    <button
                      onClick={onNavigateToBooking}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isBn ? 'পর্যালোচনা পরামর্শ বুক করুন' : 'Book Review Consultation'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {submissionFeedback && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{submissionFeedback}</span>
                  </div>
                )}

              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
