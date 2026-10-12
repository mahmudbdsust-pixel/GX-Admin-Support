import React, { useState } from 'react';
import { 
  Plane, 
  Hotel, 
  Calendar, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  FileCheck, 
  Luggage, 
  ShieldCheck, 
  Send,
  Building,
  Sparkles
} from 'lucide-react';
import { TravelInquiry } from '../types';
import { INITIAL_TRAVEL_INQUIRIES, OFFICE_LOCATIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface TravelBookingPortalProps {
  travelInquiries: TravelInquiry[];
  onAddInquiry: (inquiry: TravelInquiry) => void;
  onNavigateToBooking: () => void;
}

export const TravelBookingPortal: React.FC<TravelBookingPortalProps> = ({
  travelInquiries,
  onAddInquiry,
  onNavigateToBooking
}) => {
  const { language, isBn } = useLanguage();
  const [activeTab, setActiveTab] = useState<'request' | 'quotes'>('request');
  const [tripType, setTripType] = useState<'flight_hotel' | 'flight' | 'hotel'>('flight_hotel');
  
  // Flight fields
  const [origin, setOrigin] = useState<string>('London Heathrow (LHR)');
  const [destination, setDestination] = useState<string>('Dubai International (DXB)');
  const [departureDate, setDepartureDate] = useState<string>('2026-11-15');
  const [returnDate, setReturnDate] = useState<string>('2026-11-22');
  const [passengers, setPassengers] = useState<number>(1);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Premium Economy' | 'Business' | 'First'>('Economy');
  
  // Hotel fields
  const [hotelNights, setHotelNights] = useState<number>(7);
  const [rooms, setRooms] = useState<number>(1);
  const [hotelStars, setHotelStars] = useState<string>('4 Star Executive');
  const [budgetNotes, setBudgetNotes] = useState<string>('Require hotel near commercial district and verifiable flight booking vouchers for visa file.');
  
  // Client contact
  const [clientName, setClientName] = useState<string>('Mahmud Hasan');
  const [companyName, setCompanyName] = useState<string>('Global Enterprise & Company Ltd');
  const [clientEmail, setClientEmail] = useState<string>('mahmud.bd.sust@gmail.com');
  const [clientPhone, setClientPhone] = useState<string>('07700 900123');

  const [submittedInquiry, setSubmittedInquiry] = useState<TravelInquiry | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = `TRV-${destination.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    
    const newInquiry: TravelInquiry = {
      id: `trv-${Date.now()}`,
      referenceNo: randomRef,
      type: tripType,
      clientName,
      companyName,
      clientEmail,
      clientPhone,
      origin: tripType !== 'hotel' ? origin : undefined,
      destination,
      departureDate,
      returnDate: returnDate || undefined,
      passengers,
      cabinClass,
      hotelNights: tripType !== 'flight' ? hotelNights : undefined,
      rooms: tripType !== 'flight' ? rooms : undefined,
      hotelStars: tripType !== 'flight' ? hotelStars : undefined,
      budgetNotes,
      status: 'Searching Options',
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      quoteDetails: {
        airlineOrHotel: 'GX Trade Travel Desk Dispatch',
        estimatedCost: 'Live quotation in preparation',
        flightDetails: `${origin} -> ${destination} (${cabinClass})`,
        hotelDetails: `${hotelStars} (${rooms} Room, ${hotelNights} Nights)`,
        expiresIn: 'Representative will contact within 2 hours'
      }
    };

    onAddInquiry(newInquiry);
    setSubmittedInquiry(newInquiry);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md mb-2">
            <Luggage className="w-3.5 h-3.5" />
            <span>{isBn ? 'কর্পোরেট ও ব্যক্তিগত ট্রাভেল ডেস্ক' : 'Corporate & Personal Travel Desk'}</span>
            <span aria-hidden="true">·</span>
            <span>GX Trade UK</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {isBn ? 'বিমান টিকিট ও হোটেল রিজার্ভেশন' : 'Air Tickets & Hotel Reservations'}
          </h1>
          <p className="mt-2 text-base text-slate-600">
            {isBn 
              ? 'ব্যক্তিগত ও কর্পোরেট ফ্লাইট টিকিটিং, হোটেল বুকিং এবং ইউকে বা শেনজেন ভিসা আবেদনের উপযোগী যাচাইযোগ্য ভ্রমণ ভাউচার।'
              : 'Bespoke flight ticketing, hotel booking management, and verified travel vouchers suitable for UK/Schengen visa evidence and corporate business trips.'}
          </p>

          {/* Toggle between Request and Active Quotes */}
          <div className="mt-6 inline-flex p-1 bg-slate-200 rounded-lg">
            <button
              onClick={() => { setActiveTab('request'); setSubmittedInquiry(null); }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'request' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isBn ? 'ভ্রমণ অনুসন্ধান ও কোটেশন' : 'Search & Request Itinerary'}
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quotes' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{isBn ? 'বর্তমান কোটেশন ও ভাউচার' : 'Current Quotes & Vouchers'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[10px]">
                {travelInquiries.length}
              </span>
            </button>
          </div>
        </div>

        {activeTab === 'request' ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 max-w-4xl mx-auto">
            
            {submittedInquiry ? (
              /* Success confirmation */
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded">
                    Inquiry Received
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">
                    Travel Inquiry Ref: {submittedInquiry.referenceNo}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Our travel coordinators at St Albans & Ilford have received your flight/hotel criteria and are sourcing preferential corporate tariffs.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 max-w-md mx-auto text-left text-xs space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Route / Destination:</span>
                    <span className="font-bold text-slate-900">{submittedInquiry.origin || 'UK Departure'} ➔ {submittedInquiry.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Travel Dates:</span>
                    <span className="font-bold text-slate-900">{submittedInquiry.departureDate} {submittedInquiry.returnDate && `to ${submittedInquiry.returnDate}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Class & Passengers:</span>
                    <span className="font-bold text-slate-900">{submittedInquiry.cabinClass} · {submittedInquiry.passengers} Passenger(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Hotel Accommodation:</span>
                    <span className="font-bold text-slate-900">{submittedInquiry.hotelStars || 'As requested'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>View All Travel Bookings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSubmittedInquiry(null)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Submit Another Route
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Trip Type Segmented Control */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    What do you need booked?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setTripType('flight_hotel')}
                      className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        tripType === 'flight_hotel'
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Plane className="w-4 h-4" />
                      <span>Flights + Hotel Package</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType('flight')}
                      className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        tripType === 'flight'
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Plane className="w-4 h-4" />
                      <span>Flights Only</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType('hotel')}
                      className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        tripType === 'hotel'
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Hotel className="w-4 h-4" />
                      <span>Hotels Only</span>
                    </button>
                  </div>
                </div>

                {/* Flight inputs */}
                {tripType !== 'hotel' && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Plane className="w-4 h-4 text-amber-600" />
                      <span>Flight Route & Cabin</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Departure Airport / City *
                        </label>
                        <input
                          type="text"
                          required
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                          placeholder="e.g. London Heathrow (LHR) or London Gatwick (LGW)"
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Destination City / Airport *
                        </label>
                        <input
                          type="text"
                          required
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          placeholder="e.g. Dubai (DXB), New York (JFK), Istanbul (IST)"
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Departure Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Return Date
                        </label>
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Passengers
                        </label>
                        <select
                          value={passengers}
                          onChange={(e) => setPassengers(Number(e.target.value))}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                            <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Cabin Class
                        </label>
                        <select
                          value={cabinClass}
                          onChange={(e) => setCabinClass(e.target.value as any)}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900"
                        >
                          <option value="Economy">Economy</option>
                          <option value="Premium Economy">Premium Economy</option>
                          <option value="Business">Business Class</option>
                          <option value="First">First Class</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hotel inputs */}
                {tripType !== 'flight' && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Hotel className="w-4 h-4 text-amber-600" />
                      <span>Hotel Accommodation Requirements</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Duration (Nights)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="90"
                          value={hotelNights}
                          onChange={(e) => setHotelNights(Number(e.target.value))}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Rooms Needed
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={rooms}
                          onChange={(e) => setRooms(Number(e.target.value))}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Hotel Category
                        </label>
                        <select
                          value={hotelStars}
                          onChange={(e) => setHotelStars(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900"
                        >
                          <option value="3 Star Standard">3 Star Standard</option>
                          <option value="4 Star Executive">4 Star Executive</option>
                          <option value="5 Star Luxury">5 Star Luxury</option>
                          <option value="Boutique / Serviced Apartment">Boutique / Serviced Apartment</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact and Preferences */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Name *
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
                      Company / Entity Name
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
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Preferences or Visa Voucher Notes
                  </label>
                  <textarea
                    rows={2}
                    value={budgetNotes}
                    onChange={(e) => setBudgetNotes(e.target.value)}
                    placeholder="Specify preferred airlines, baggage allowance, flexible dates, or visa reservation letter needs."
                    className="w-full text-xs p-3 bg-white border border-slate-300 rounded-md text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                  />
                </div>

                {/* Visa Evidence Integration Callout */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Official Visa Application Vouchers:</span>
                    <span className="text-amber-800 ml-1">
                      Applying for a UK, Schengen, or overseas visa? GX Trade issues verified flight reservation itineraries and certified hotel bookings recognized by UKVI and foreign embassies.
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>Request Quotation & Flight/Hotel Search</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        ) : (
          /* Active Quotes & Booked Itineraries Tab */
          <div className="space-y-4 max-w-4xl mx-auto">
            {travelInquiries.map((inq) => (
              <div 
                key={inq.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">{inq.referenceNo}</span>
                    <span className="text-slate-300">·</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      inq.status === 'Confirmed & Booked' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Submitted on {inq.createdAt}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <Plane className="w-4 h-4 text-amber-600" />
                      <span>{inq.origin || 'UK'} ➔ {inq.destination}</span>
                    </h3>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong>Departure:</strong> {inq.departureDate} {inq.returnDate && `· Return: ${inq.returnDate}`}</p>
                      <p><strong>Passengers:</strong> {inq.passengers} · <strong>Class:</strong> {inq.cabinClass}</p>
                      {inq.hotelStars && (
                        <p><strong>Hotel:</strong> {inq.hotelStars} ({inq.hotelNights} Nights)</p>
                      )}
                    </div>
                  </div>

                  {inq.quoteDetails && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs space-y-2">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{inq.quoteDetails.airlineOrHotel}</span>
                        <span className="text-amber-800 font-mono">{inq.quoteDetails.estimatedCost}</span>
                      </div>
                      {inq.quoteDetails.flightDetails && (
                        <p className="text-slate-600 text-[11px]">{inq.quoteDetails.flightDetails}</p>
                      )}
                      {inq.quoteDetails.hotelDetails && (
                        <p className="text-slate-600 text-[11px]">{inq.quoteDetails.hotelDetails}</p>
                      )}
                      <div className="text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-200">
                        Status: {inq.quoteDetails.expiresIn}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">
                    Travel Desk Desk: St Albans (01727 301083) / Ilford (020 3581 3133)
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${OFFICE_LOCATIONS.londonOffice.phone}`}
                      className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer"
                    >
                      Call Desk
                    </a>
                    <button
                      onClick={onNavigateToBooking}
                      className="px-3 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 font-semibold cursor-pointer"
                    >
                      Book In-Person Travel Review
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
