import React, { useState, useRef } from 'react';
import { 
  Palette, 
  Upload, 
  Image as ImageIcon, 
  X, 
  Check, 
  RotateCcw, 
  Sliders, 
  Sparkles,
  Layers,
  Eye,
  Trash2,
  FileImage,
  Sun,
  Moon,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface OverviewBackgroundConfig {
  id: string;
  name: string;
  primaryColor: string;
  gradientTo: string;
  accentColor: string;
  isLightMode: boolean;
  uploadedImage: string | null;
  uploadedImageName?: string | null;
  overlayOpacity: number;
  pattern: 'dots' | 'grid' | 'mesh' | 'none';
  backgroundScope: 'hero' | 'full';
}

export const THEME_PRESETS: OverviewBackgroundConfig[] = [
  {
    id: 'cambridge-light-blue',
    name: 'Cambridge Light Blue',
    primaryColor: '#e0f2fe',
    gradientTo: '#bae6fd',
    accentColor: '#0284c7',
    isLightMode: true,
    uploadedImage: null,
    overlayOpacity: 0.15,
    pattern: 'dots',
    backgroundScope: 'hero'
  },
  {
    id: 'soft-azure-sky',
    name: 'Soft Azure Sky (Light Blue)',
    primaryColor: '#dbeafe',
    gradientTo: '#bfdbfe',
    accentColor: '#1d4ed8',
    isLightMode: true,
    uploadedImage: null,
    overlayOpacity: 0.15,
    pattern: 'grid',
    backgroundScope: 'hero'
  },
  {
    id: 'ice-crystal-blue',
    name: 'Ice Crystal Blue (Light Blue)',
    primaryColor: '#f0f9ff',
    gradientTo: '#e0f2fe',
    accentColor: '#0369a1',
    isLightMode: true,
    uploadedImage: null,
    overlayOpacity: 0.1,
    pattern: 'mesh',
    backgroundScope: 'hero'
  },
  {
    id: 'oxford-navy',
    name: 'British Oxford Navy',
    primaryColor: '#070f26',
    gradientTo: '#0f172a',
    accentColor: '#fbbf24',
    isLightMode: false,
    uploadedImage: null,
    overlayOpacity: 0.85,
    pattern: 'dots',
    backgroundScope: 'hero'
  },
  {
    id: 'royal-emerald',
    name: 'Royal Emerald Heritage',
    primaryColor: '#041d15',
    gradientTo: '#0b2e22',
    accentColor: '#34d399',
    isLightMode: false,
    uploadedImage: null,
    overlayOpacity: 0.85,
    pattern: 'dots',
    backgroundScope: 'hero'
  },
  {
    id: 'executive-slate',
    name: 'Executive Slate & Steel',
    primaryColor: '#0f172a',
    gradientTo: '#1e293b',
    accentColor: '#38bdf8',
    isLightMode: false,
    uploadedImage: null,
    overlayOpacity: 0.85,
    pattern: 'grid',
    backgroundScope: 'hero'
  },
  {
    id: 'savile-charcoal',
    name: 'Savile Row Midnight',
    primaryColor: '#101216',
    gradientTo: '#1a1d24',
    accentColor: '#f59e0b',
    isLightMode: false,
    uploadedImage: null,
    overlayOpacity: 0.85,
    pattern: 'grid',
    backgroundScope: 'hero'
  },
  {
    id: 'mayfair-burgundy',
    name: 'Mayfair Deep Wine',
    primaryColor: '#1c0816',
    gradientTo: '#2b0f22',
    accentColor: '#fbbf24',
    isLightMode: false,
    uploadedImage: null,
    overlayOpacity: 0.85,
    pattern: 'dots',
    backgroundScope: 'hero'
  },
  {
    id: 'royal-sapphire',
    name: 'Imperial Sapphire Blue',
    primaryColor: '#031b33',
    gradientTo: '#0a2e5c',
    accentColor: '#60a5fa',
    isLightMode: false,
    uploadedImage: null,
    overlayOpacity: 0.85,
    pattern: 'mesh',
    backgroundScope: 'hero'
  },
  {
    id: 'amber-dusk',
    name: 'Warm Amber & Bronze Dusk',
    primaryColor: '#1f140e',
    gradientTo: '#2d1e15',
    accentColor: '#fbbf24',
    isLightMode: false,
    uploadedImage: null,
    overlayOpacity: 0.85,
    pattern: 'dots',
    backgroundScope: 'hero'
  },
  {
    id: 'clean-pearl',
    name: 'Warm Pearl & Ivory (Light)',
    primaryColor: '#f8fafc',
    gradientTo: '#e2e8f0',
    accentColor: '#d97706',
    isLightMode: true,
    uploadedImage: null,
    overlayOpacity: 0.15,
    pattern: 'grid',
    backgroundScope: 'hero'
  },
  {
    id: 'modern-white',
    name: 'Minimal Clean White (Light)',
    primaryColor: '#ffffff',
    gradientTo: '#f1f5f9',
    accentColor: '#2563eb',
    isLightMode: true,
    uploadedImage: null,
    overlayOpacity: 0.1,
    pattern: 'dots',
    backgroundScope: 'hero'
  }
];

// Sample executive background images ready for 1-click preview
export const CURATED_BACKGROUND_SAMPLES = [
  {
    name: 'London Skyline & Thames',
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    description: 'City of London corporate panorama'
  },
  {
    name: 'Modern Architectural Glass',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    description: 'Contemporary commercial skyscraper'
  },
  {
    name: 'Executive Boardroom',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    description: 'Warm professional consultancy workspace'
  },
  {
    name: 'Global Financial Hub',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    description: 'Abstract international commerce connectivity'
  }
];

interface OverviewBackgroundPickerProps {
  currentTheme: OverviewBackgroundConfig;
  onThemeChange: (theme: OverviewBackgroundConfig) => void;
  onNotification?: (msg: string) => void;
}

export const OverviewBackgroundPicker: React.FC<OverviewBackgroundPickerProps> = ({
  currentTheme,
  onThemeChange,
  onNotification
}) => {
  const { language, isBn } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'custom'>('presets');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPreset = (preset: OverviewBackgroundConfig) => {
    onThemeChange({
      ...preset,
      uploadedImage: currentTheme.uploadedImage,
      uploadedImageName: currentTheme.uploadedImageName,
      backgroundScope: currentTheme.backgroundScope
    });
    if (onNotification) onNotification(`Background colour switched to ${preset.name}`);
  };

  const handleCustomPrimaryColor = (color: string) => {
    const isLight = isColorLight(color);
    onThemeChange({
      ...currentTheme,
      id: 'custom-palette',
      name: `Custom (${color.toUpperCase()})`,
      primaryColor: color,
      gradientTo: isLight ? adjustBrightness(color, -12) : adjustBrightness(color, 12),
      isLightMode: isLight
    });
  };

  const handleCustomGradientTo = (color: string) => {
    onThemeChange({
      ...currentTheme,
      gradientTo: color
    });
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onThemeChange({
        ...currentTheme,
        uploadedImage: dataUrl,
        uploadedImageName: file.name
      });
      if (onNotification) {
        onNotification(`Background image "${file.name}" uploaded and applied to Overview page!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleApplySampleImage = (sample: typeof CURATED_BACKGROUND_SAMPLES[0]) => {
    onThemeChange({
      ...currentTheme,
      uploadedImage: sample.url,
      uploadedImageName: sample.name
    });
    if (onNotification) {
      onNotification(`Applied "${sample.name}" background wallpaper to Overview page.`);
    }
  };

  const handleRemoveImage = () => {
    onThemeChange({
      ...currentTheme,
      uploadedImage: null,
      uploadedImageName: null
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onNotification) onNotification('Uploaded background removed. Reverted to colour palette.');
  };

  const handleResetToDefault = () => {
    onThemeChange(THEME_PRESETS[0]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onNotification) onNotification('Reset Overview background to Cambridge Light Blue default.');
  };

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-slate-700/80 shadow-md backdrop-blur-md transition-all cursor-pointer"
        title={isBn ? "সারসংক্ষেপের ব্যাকগ্রাউন্ড কালার বা ওয়ালপেপার কাস্টমাইজ করুন" : "Customize overview background colour or upload wallpaper"}
      >
        <Palette className="w-3.5 h-3.5 text-amber-400" />
        <span>{isBn ? 'ব্যাকগ্রাউন্ড কালার ও আপলোড' : 'Background Colour & Upload'}</span>
        <span 
          className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs inline-block shrink-0" 
          style={{ 
            backgroundColor: currentTheme.primaryColor,
            backgroundImage: currentTheme.uploadedImage ? `url(${currentTheme.uploadedImage})` : undefined,
            backgroundSize: 'cover'
          }} 
        />
      </button>

      {/* Floating Settings Drawer / Modal */}
      {isOpen && (
        <div 
          className="absolute right-0 top-10 z-50 w-84 sm:w-96 bg-slate-900/95 border border-slate-700/90 rounded-2xl shadow-2xl p-5 text-white backdrop-blur-xl animate-fade-in text-xs space-y-4 max-h-[85vh] overflow-y-auto"
          role="dialog"
          aria-label="Overview background customizer"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">
                  {isBn ? 'সারসংক্ষেপ ব্যাকগ্রাউন্ড ও ওয়ালপেপার' : 'Overview Background Colour'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {isBn ? 'ওয়ালপেপার আপলোড করুন বা কালার থিম বেছে নিন' : 'Upload wallpaper or pick distinct UK themes'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex rounded-lg bg-slate-800/80 p-1 border border-slate-700/60">
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-1.5 rounded-md font-semibold text-[11px] transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Colour Presets
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 rounded-md font-semibold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'upload'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Upload className="w-3 h-3" />
              <span>Upload Wallpaper</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex-1 py-1.5 rounded-md font-semibold text-[11px] transition-all cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Custom Hex
            </button>
          </div>

          {/* TAB 1: CURATED COLOUR PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                <span>Select Palette ({THEME_PRESETS.length})</span>
                <span className="text-[10px] lowercase font-normal text-amber-400">Instant apply</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = currentTheme.id === preset.id && !currentTheme.uploadedImage;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-slate-800 ring-2 ring-amber-400/40 shadow-sm'
                          : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div 
                        className="w-5 h-5 rounded-full shrink-0 border border-white/20 shadow-xs flex items-center justify-center"
                        style={{ 
                          background: `linear-gradient(135deg, ${preset.primaryColor}, ${preset.gradientTo})` 
                        }}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-[11px] text-white truncate">{preset.name}</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                          {preset.isLightMode ? (
                            <>
                              <Sun className="w-2.5 h-2.5 text-amber-400" />
                              <span>Light Mode</span>
                            </>
                          ) : (
                            <>
                              <Moon className="w-2.5 h-2.5 text-slate-400" />
                              <span>Executive Dark</span>
                            </>
                          )}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD CUSTOM BACKGROUND IMAGE / WALLPAPER */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* Upload Drag & Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-amber-400 bg-amber-500/10 scale-98'
                    : 'border-slate-700 hover:border-amber-400 bg-slate-800/40 hover:bg-slate-800/80'
                }`}
              >
                <Upload className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
                <p className="font-bold text-white text-xs">
                  Upload Background Image or Wallpaper
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Drag and drop or click to browse (PNG, JPG, WebP)
                </p>
              </div>

              {/* Current Active Image Display */}
              {currentTheme.uploadedImage && (
                <div className="bg-slate-800/90 rounded-xl p-3 border border-amber-400/50 flex items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-2.5 truncate">
                    <div 
                      className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0 border border-white/20 shadow-xs"
                      style={{ backgroundImage: `url(${currentTheme.uploadedImage})` }}
                    />
                    <div className="truncate">
                      <p className="font-bold text-[11px] text-white truncate">
                        {currentTheme.uploadedImageName || 'Custom Wallpaper Active'}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <Check className="w-2.5 h-2.5" />
                        <span>Applied to Overview page</span>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveImage}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
                    title="Remove custom image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Tint Darkness / Readability Overlay Slider */}
              {currentTheme.uploadedImage && (
                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 font-semibold">Contrast Tint Darkness:</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {Math.round(currentTheme.overlayOpacity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.95"
                    step="0.05"
                    value={currentTheme.overlayOpacity}
                    onChange={(e) => onThemeChange({ ...currentTheme, overlayOpacity: parseFloat(e.target.value) })}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-400">
                    Adjusts dark overlay to keep white text clearly legible over bright photos.
                  </p>
                </div>
              )}

              {/* Quick Sample Wallpapers */}
              <div className="pt-2 border-t border-slate-800">
                <p className="text-[11px] font-semibold text-slate-300 mb-2">
                  Or pick a curated executive background:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CURATED_BACKGROUND_SAMPLES.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleApplySampleImage(sample)}
                      className="group relative h-16 rounded-lg overflow-hidden border border-slate-700 hover:border-amber-400 transition-all text-left cursor-pointer"
                    >
                      <img 
                        src={sample.url} 
                        alt={sample.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/40 transition-colors p-1.5 flex flex-col justify-end">
                        <span className="text-[10px] font-bold text-white leading-tight drop-shadow-sm">
                          {sample.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM HEX & GRADIENT COLOUR PICKER */}
          {activeTab === 'custom' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-300">
                  Primary Background Colour
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTheme.primaryColor}
                    onChange={(e) => handleCustomPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-slate-700 bg-transparent cursor-pointer shrink-0"
                  />
                  <input
                    type="text"
                    value={currentTheme.primaryColor}
                    onChange={(e) => handleCustomPrimaryColor(e.target.value)}
                    placeholder="#070F26"
                    className="w-full text-xs font-mono px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white uppercase focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-300">
                  Gradient Bottom / Accent
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTheme.gradientTo}
                    onChange={(e) => handleCustomGradientTo(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-slate-700 bg-transparent cursor-pointer shrink-0"
                  />
                  <input
                    type="text"
                    value={currentTheme.gradientTo}
                    onChange={(e) => handleCustomGradientTo(e.target.value)}
                    placeholder="#0F172A"
                    className="w-full text-xs font-mono px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white uppercase focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              {/* Quick Swatches */}
              <div className="pt-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Quick Colour Swatches
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    '#e0f2fe', '#dbeafe', '#bae6fd', '#bfdbfe', '#93c5fd', '#f0f9ff',
                    '#070f26', '#0f172a', '#041d15', '#101216', 
                    '#1c0816', '#031b33', '#1e1b4b', '#18181b', 
                    '#292524', '#f8fafc', '#ffffff'
                  ].map((hex) => (
                    <button
                      key={hex}
                      onClick={() => handleCustomPrimaryColor(hex)}
                      className="w-6 h-6 rounded-md border border-white/20 hover:scale-110 transition-transform cursor-pointer shadow-xs"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Common Settings: Pattern Overlay */}
          <div className="border-t border-slate-800 pt-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Backdrop Geometric Pattern
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['dots', 'grid', 'mesh', 'none'] as const).map((pat) => (
                <button
                  key={pat}
                  onClick={() => onThemeChange({ ...currentTheme, pattern: pat })}
                  className={`py-1.5 px-2 rounded-lg border text-center font-semibold capitalize cursor-pointer text-[11px] transition-all ${
                    currentTheme.pattern === pat
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                      : 'border-slate-800 hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  {pat}
                </button>
              ))}
            </div>
          </div>

          {/* Common Settings: Scope (Hero Only vs Entire Overview Page) */}
          <div className="border-t border-slate-800 pt-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Background Application Scope
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onThemeChange({ ...currentTheme, backgroundScope: 'hero' })}
                className={`py-2 px-3 rounded-lg border text-center font-semibold cursor-pointer text-[11px] transition-all ${
                  currentTheme.backgroundScope === 'hero'
                    ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                    : 'border-slate-800 hover:bg-slate-800 text-slate-400'
                }`}
              >
                Hero Section Only
              </button>
              <button
                onClick={() => onThemeChange({ ...currentTheme, backgroundScope: 'full' })}
                className={`py-2 px-3 rounded-lg border text-center font-semibold cursor-pointer text-[11px] transition-all ${
                  currentTheme.backgroundScope === 'full'
                    ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                    : 'border-slate-800 hover:bg-slate-800 text-slate-400'
                }`}
              >
                Entire Overview Page
              </button>
            </div>
          </div>

          {/* Footer Reset & Apply */}
          <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
            <button
              onClick={handleResetToDefault}
              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Default</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-colors"
            >
              Done & Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Color utility helpers
function adjustBrightness(hex: string, percent: number): string {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return '#0f172a';
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

function isColorLight(hex: string): boolean {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}
