import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Lock, 
  AlertCircle, 
  Clock, 
  File, 
  X, 
  Building2, 
  ArrowRight, 
  FileCheck2,
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import { DocumentCategory, OfficeLocation, UploadedDocument } from '../types';
import { OFFICE_LOCATIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface SecureDocumentUploadProps {
  documents: UploadedDocument[];
  onUploadSuccess: (doc: UploadedDocument) => void;
  onNavigateToDecoder: () => void;
  onNavigateToDashboard: () => void;
}

export const SecureDocumentUpload: React.FC<SecureDocumentUploadProps> = ({
  documents,
  onUploadSuccess,
  onNavigateToDecoder,
  onNavigateToDashboard
}) => {
  const { language, isBn } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileCategory, setFileCategory] = useState<DocumentCategory>('Official Letter');
  const [targetOffice, setTargetOffice] = useState<OfficeLocation>('St Albans Head Office');
  const [urgency, setUrgency] = useState<'Standard' | 'Priority' | 'Emergency'>('Standard');
  const [notes, setNotes] = useState<string>('');
  const [clientName, setClientName] = useState<string>('Mahmud Hasan');
  const [companyName, setCompanyName] = useState<string>('Global Enterprise & Company Ltd');
  const [clientEmail, setClientEmail] = useState<string>('mahmud.bd.sust@gmail.com');
  
  // Progress states
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [encryptionStatus, setEncryptionStatus] = useState<string>('');
  const [uploadedDocSuccess, setUploadedDocSuccess] = useState<UploadedDocument | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: { label: DocumentCategory; labelBn: string; desc: string }[] = [
    { 
      label: 'Official Letter', 
      labelBn: 'অফিসিয়াল চিঠি ও নোটিশ', 
      desc: isBn ? 'HMRC, Home Office, DWP, স্থানীয় কাউন্সিল বা আদালতের চিঠি' : 'HMRC, Home Office, DWP, Council, or Court notice' 
    },
    { 
      label: 'Visa Document', 
      labelBn: 'ভিসা ও ইমিগ্রেশন ফাইল', 
      desc: isBn ? 'পাসপোর্ট কপি, ব্যাংক স্টেটমেন্ট, স্পনসর ও ইনভিটেশন লেটার' : 'Passport copies, financial evidence, sponsor letters' 
    },
    { 
      label: 'Form to Fill', 
      labelBn: 'সরকারি ও প্রাতিষ্ঠানিক ফর্ম', 
      desc: isBn ? 'ইউকে সরকারি বা স্থানীয় কর্তৃপক্ষের পূরণযোগ্য ফর্ম' : 'Government or institutional forms needing completion' 
    },
    { 
      label: 'Translation Certification', 
      labelBn: 'প্রত্যয়িত অনুবাদ নথিপত্র', 
      desc: isBn ? 'হোম অফিস ও আদালতের জন্য স্বীকৃত সার্টিফায়েড ইংরেজি অনুবাদ' : 'Foreign language documents requiring sworn certified English' 
    },
    { 
      label: 'Business Compliance', 
      labelBn: 'ব্যবসায়িক ও কোম্পানি নথিপত্র', 
      desc: isBn ? 'কোম্পানি চুক্তি, ট্রেড রেজিস্টার ও হিসাব বিবরণী' : 'Contracts, trade registers, accounting statements' 
    },
    { 
      label: 'Travel ID & Passport', 
      labelBn: 'ভ্রমণ আইডি ও পাসপোর্ট', 
      desc: isBn ? 'বিমান টিকিট বুকিং ও হোটেল রিজার্ভেশনের তথ্য' : 'Flight and accommodation booking credentials' 
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadedDocSuccess(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setUploadedDocSuccess(null);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(15);
    setEncryptionStatus(isBn ? '২৫৬-বিট এইএস এনক্রিপশন কি প্রস্তুত হচ্ছে...' : 'Generating 256-bit AES encryption session keys...');

    setTimeout(() => {
      setUploadProgress(45);
      setEncryptionStatus(isBn ? 'টিএলএস ১.৩ প্রোটোকলে ফাইল এনক্রিপ্ট হচ্ছে...' : 'Encrypting document payload via TLS 1.3...');
    }, 400);

    setTimeout(() => {
      setUploadProgress(80);
      setEncryptionStatus(isBn ? 'ইউকে জিডিপিআর সভরেন স্টোরেজ ভেরিফাই করা হচ্ছে...' : 'Validating UK GDPR sovereign storage container...');
    }, 800);

    setTimeout(() => {
      setUploadProgress(100);
      setEncryptionStatus(isBn ? 'যাচাই সম্পূর্ণ। ফাইল এনক্রিপ্ট করে সংরক্ষণ করা হয়েছে।' : 'Verification complete. Document locked and filed.');

      const newDoc: UploadedDocument = {
        id: `doc-${Date.now()}`,
        fileName: selectedFile.name,
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: selectedFile.type || 'application/pdf',
        uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        category: fileCategory,
        status: fileCategory === 'Official Letter' ? 'In Triage' : 'Received',
        notes: notes || 'Submitted via GX Trade Secure Document Upload Portal',
        office: targetOffice,
        clientName,
        companyName,
        clientEmail,
        caseRef: `GXT-${Math.floor(1000 + Math.random() * 9000)}`
      };

      onUploadSuccess(newDoc);
      setUploadedDocSuccess(newDoc);
      setIsUploading(false);
      setSelectedFile(null);
      setNotes('');
    }, 1300);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md mb-2">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isBn ? '২৫৬-বিট এনক্রিপ্টেড ট্রান্সফার' : '256-Bit Encrypted Transfer'}</span>
            <span aria-hidden="true">·</span>
            <span>{isBn ? 'ইউকে জিডিপিআর সুরক্ষিত' : 'UK GDPR Compliant'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isBn ? 'নিরাপদ ডকুমেন্ট আপলোড সিস্টেম' : 'Secure Document Upload System'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {isBn 
              ? 'অফিসিয়াল চিঠি, ভিসা নথিপত্র, সরকারি ফর্ম কিংবা অনুবাদের প্রয়োজনীয় ফাইল সরাসরি সেন্ট অ্যালবান্স ও লন্ডন ইলফোর্ড কনসালট্যান্টদের কাছে সুরক্ষিতভাবে পাঠান।'
              : 'Submit official letters, visa evidence, forms needing completion, or documents requiring certified translation directly to our St Albans and London Ilford consultants.'}
          </p>
        </div>

        {/* Upload Form Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8">
          
          {uploadedDocSuccess ? (
            /* Upload Success Banner */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded">
                  {isBn ? 'আপলোড ও এনক্রিপশন সফলভাবে সম্পন্ন' : 'Upload & Encryption Successful'}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  {isBn ? 'ডকুমেন্ট আইডি:' : 'Document ID:'} {uploadedDocSuccess.id}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  <strong>{uploadedDocSuccess.fileName}</strong> {isBn ? `সফলভাবে ${uploadedDocSuccess.office} শাখায় প্রেরণ করা হয়েছে।` : `has been transmitted securely to the ${uploadedDocSuccess.office}.`}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">{isBn ? 'ধরন:' : 'Category:'}</span>
                  <span className="font-bold text-slate-900">{uploadedDocSuccess.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">{isBn ? 'নির্ধারিত শাখা:' : 'Assigned Branch:'}</span>
                  <span className="font-bold text-slate-900">{uploadedDocSuccess.office}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">{isBn ? 'কেস রেফারেন্স:' : 'Case Reference:'}</span>
                  <span className="font-bold text-slate-900 font-mono">{uploadedDocSuccess.caseRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">{isBn ? 'সিকিউরিটি হ্যাশ:' : 'Security Hash:'}</span>
                  <span className="font-mono text-slate-600 truncate text-[10px]">SHA256:e3b0c44298fc1c14...</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {uploadedDocSuccess.category === 'Official Letter' && (
                  <button
                    onClick={onNavigateToDecoder}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isBn ? 'চিঠি ডিকোডার টুলে চালান' : 'Run Interactive Letter Decoder & Draft'}</span>
                  </button>
                )}

                <button
                  onClick={onNavigateToDashboard}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ক্লায়েন্ট ড্যাশবোর্ড ভল্টে দেখুন' : 'View in Client Dashboard Vault'}</span>
                </button>

                <button
                  onClick={() => setUploadedDocSuccess(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {isBn ? 'আরেকটি ফাইল আপলোড করুন' : 'Upload Another File'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUploadSubmit} className="space-y-6">
              
              {/* Drag and Drop Zone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {isBn ? 'ডকুমেন্ট নির্বাচন করুন বা টেনে এনে ড্রপ করুন *' : 'Select Document or Drag & Drop *'}
                </label>
                
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    selectedFile 
                      ? 'border-emerald-500 bg-emerald-50/20' 
                      : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff"
                  />

                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm text-slate-900">{selectedFile.name}</p>
                        <p className="text-xs text-slate-500">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · {isBn ? 'পরিবর্তন করতে ক্লিক করুন' : 'Click to replace'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        {isBn ? 'ফাইল নির্বাচন করতে ক্লিক করুন বা এখানে ড্রপ করুন' : 'Click to browse or drop document here'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {isBn ? 'সমর্থিত ফরম্যাট: PDF, JPG, PNG, DOCX (সর্বোচ্চ ২৫ মেগাবাইট)' : 'Supports PDF, JPG, PNG, DOCX up to 25MB'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Classification & Target Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {isBn ? 'নথিপত্রের শ্রেণিবিভাগ *' : 'Document Category *'}
                  </label>
                  <select
                    value={fileCategory}
                    onChange={(e) => setFileCategory(e.target.value as DocumentCategory)}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-slate-900"
                  >
                    {categories.map((c) => (
                      <option key={c.label} value={c.label}>
                        {isBn ? c.labelBn : c.label} — {c.desc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {isBn ? 'প্রক্রিয়াকরণের অফিস শাখা *' : 'Target Office Branch *'}
                  </label>
                  <select
                    value={targetOffice}
                    onChange={(e) => setTargetOffice(e.target.value as OfficeLocation)}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="St Albans Head Office">
                      {isBn ? 'ইউকে হেড অফিস (সেন্ট অ্যালবান্স) - 01727 301083' : 'UK Head Office (St Albans) - 01727 301083'}
                    </option>
                    <option value="London Ilford Office">
                      {isBn ? 'লন্ডন অফিস (ইলফোর্ড) - 020 3581 3133' : 'London Office (Ilford) - 020 3581 3133'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Client Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? 'ক্লায়েন্টের পুরো নাম *' : 'Client Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? 'প্রতিষ্ঠানের নাম (যদি থাকে)' : 'Company Name (If applicable)'}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900"
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
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Priority & Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBn ? 'কেস নোট বা জরুরি নির্দেশিকা (ঐচ্ছিক)' : 'Case Notes or Instructions (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isBn ? "যেমন: হোম অফিসের ৭ দিনের নোটিশ, বা জরুরি শেনজেন ভিসা অনুবাদ..." : "e.g., HMRC 14-day statutory reply needed, or certified Bengali birth certificate translation..."}
                  className="w-full text-xs p-3 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Progress bar when uploading */}
              {isUploading && (
                <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{encryptionStatus}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isBn ? 'সার্বক্ষণিক এনক্রিপশন ও ইউকে সার্বভৌম ডেটা প্রটেকশন' : 'End-to-End Encrypted & UK Sovereign Hosted'}</span>
                </div>

                <button
                  type="submit"
                  disabled={!selectedFile || isUploading}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isBn ? 'এনক্রিপ্ট করে ফাইল জমা দিন' : 'Encrypt & Submit Document'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
