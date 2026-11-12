import React, { useState } from 'react';
import {
  SERVICE_OPTIONS,
  BookingInput,
  ConfirmedBooking,
  validateReservationForm,
  createBookingRecord,
} from '../utils/domLogic';
import { Calendar, Clock, Users, CheckCircle2, ArrowRight, ExternalLink, MapPin, Phone } from 'lucide-react';

interface BookingEngineSectionProps {
  selectedServiceId: string;
  onSelectServiceId: (id: string) => void;
  bookings: ConfirmedBooking[];
  onAddBooking: (booking: ConfirmedBooking) => void;
}

export const BookingEngineSection: React.FC<BookingEngineSectionProps> = ({
  selectedServiceId,
  onSelectServiceId,
  bookings,
  onAddBooking,
}) => {
  const activeService =
    SERVICE_OPTIONS.find((s) => s.id === selectedServiceId) ?? SERVICE_OPTIONS[0];

  const [step, setStep] = useState<1 | 2>(1);
  const [date, setDate] = useState<string>('2026-11-14');
  const [timeSlot, setTimeSlot] = useState<string>(activeService.availableTimes[2] || '18:30');
  const [guests, setGuests] = useState<number>(2);
  const [drinksPairing, setDrinksPairing] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [dietaryRequirements, setDietaryRequirements] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [latestConfirmed, setLatestConfirmed] = useState<ConfirmedBooking | null>(null);

  const handleServiceChange = (id: string) => {
    onSelectServiceId(id);
    const found = SERVICE_OPTIONS.find((s) => s.id === id);
    if (found && !found.availableTimes.includes(timeSlot)) {
      setTimeSlot(found.availableTimes[0]);
    }
    setLatestConfirmed(null);
  };

  const handleTimeSlotClick = (slot: string) => {
    setTimeSlot(slot);
    setStep(2);
    setLatestConfirmed(null);
    setErrors({});
  };

  const handleFillSampleGuest = () => {
    setGuestName('Benoit Lamaudiere');
    setGuestEmail('info@restaurantdom.co.uk');
    setGuestPhone('01724 506816');
    setDietaryRequirements(
      guests >= 6
        ? 'Large Party Pre-Order attached digitally (No manual email form needed)'
        : '1 Vegetarian Tasting Adaptation'
    );
    setErrors({});
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: BookingInput = {
      serviceId: activeService.id,
      date,
      timeSlot,
      guests,
      guestName,
      guestEmail,
      guestPhone,
      dietaryRequirements: dietaryRequirements.trim() || 'No allergens noted',
      drinksPairing,
    };

    const validation = validateReservationForm(payload);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const newBooking = createBookingRecord(payload, 105 + bookings.length);
    onAddBooking(newBooking);
    setLatestConfirmed(newBooking);
    setErrors({});
  };

  const estimatedTotal =
    activeService.pricePerGuest * guests + (drinksPairing ? 65 * guests : 0);

  return (
    <section id="booking" className="bg-[#2D3032] text-[#F0EDE3] border-b border-stone-700/60">
      {/* Subtle Top Diagnostic Context Strip for Benoit Lamaudiere */}
      <div className="bg-[#232628] border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-stone-300">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#E09F67] font-medium">
              Custom Upgrade Preview · Restaurant DOM (7–9 Robert Street, Scunthorpe)
            </span>
            <span aria-hidden="true">·</span>
            <span>Prepared for Benoit Lamaudiere, General Manager</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono-tabular text-stone-200">
            <span className="whitespace-nowrap">Current Mobile Score: 44/100</span>
            <span aria-hidden="true">→</span>
            <span className="text-[#E09F67] font-semibold whitespace-nowrap">
              Upgraded 2-Click Flow: 96/100
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column (7 cols): Authentic Restaurant DOM Welcome & Real Open Kitchen Photo */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5 text-xs tracking-wider uppercase text-[#E09F67]">
                <span>Featured in the MICHELIN Guide 2026</span>
                <span aria-hidden="true">·</span>
                <span>Zero-Waste Lincolnshire Philosophy</span>
              </div>

              <h1
                className="font-goudy text-[#F0EDE3] font-normal tracking-tight leading-[1.08]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.6rem)', textWrap: 'balance' }}
              >
                Welcome to Restaurant DOM — Where Food Is Made With Intention.
              </h1>

              <p className="text-stone-200 text-base leading-relaxed">
                <strong className="text-white font-semibold">DOM means ‘home’ in Polish.</strong>{' '}
                Home is warmth. Home is welcome. Nestled at 7–9 Robert Street in the heart of
                Scunthorpe, DOM is a neighbourhood restaurant built on craftsmanship, community and
                bold, expressive flavours — shaped by Chef Patron Sławek Mikołajczyk, Maryiana, and
                General Manager Benoit Lamaudiere.
              </p>
            </div>

            {/* Real Photograph of Restaurant DOM Open Kitchen (/assets/dom/dsc7576.jpg) */}
            <div className="relative rounded-xl overflow-hidden border border-white/15 bg-stone-900 min-h-[300px] sm:min-h-[350px] flex-1">
              <img
                src="/assets/dom/dsc7576.jpg"
                alt="Restaurant DOM open kitchen at 7-9 Robert Street, Scunthorpe with copper heat lamps and chef plating"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <img
                    src="/assets/dom/dom-logo.png"
                    alt="Official DOM Logo"
                    referrerPolicy="no-referrer"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                  <a
                    href="https://guide.michelin.com/gb/en/north-lincolnshire/scunthorpe_1742628/restaurant/restaurant-dom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#F0EDE3] hover:text-[#E09F67] underline underline-offset-4 flex items-center gap-1 bg-black/55 px-3 py-1.5 rounded"
                  >
                    <span>MICHELIN Guide 2026 Selection</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20 text-xs text-stone-200">
                  <div>
                    <p className="text-stone-400">Opening Hours</p>
                    <p className="font-medium text-white mt-0.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E09F67] shrink-0" />
                      Wed–Sat 12pm – 8:30pm
                    </p>
                    <p className="text-[11px] text-stone-300 mt-0.5">
                      Sunday Lunch: 12pm – 3:30pm (Oct–Dec)
                    </p>
                  </div>
                  <div>
                    <p className="text-stone-400">Current Menus</p>
                    <p className="font-mono-tabular font-medium text-white mt-0.5">
                      Lunch £34/£39 · Tasting £79/£95
                    </p>
                    <p className="text-[11px] text-stone-300 mt-0.5">
                      Sunday Set Menu £49 · NYE £99
                    </p>
                  </div>
                  <div>
                    <p className="text-stone-400">7–9 Robert Street, DN15 6LU</p>
                    <p className="font-mono-tabular font-medium text-white mt-0.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#E09F67] shrink-0" />
                      01724 506816 / 506817
                    </p>
                    <p className="text-[11px] text-stone-300 mt-0.5">info@restaurantdom.co.uk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): 2-Click Table & Large-Party Booking Engine (Warm Linen Card) */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-xl bg-[#F0EDE3] text-[#2B2B2B] border border-stone-300 shadow-xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-stone-300">
                  <div>
                    <p className="text-xs text-[#8F521D] font-semibold">
                      01. Instant 2-Click ToastTab &amp; Pre-Order Flow
                    </p>
                    <h2 className="font-goudy text-2xl text-[#2B2B2B] mt-0.5">
                      Book a Table at Restaurant DOM
                    </h2>
                  </div>
                  <div className="text-right font-mono-tabular text-xs text-stone-600">
                    Click {step} of 2
                  </div>
                </div>

                {/* Step Switcher */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#E5E0D3] rounded-lg my-4 border border-stone-300">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`py-2 px-3 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      step === 1
                        ? 'bg-[#8F521D] text-white'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    1. Select Menu &amp; Seating
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className={`py-2 px-3 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      step === 2
                        ? 'bg-[#8F521D] text-white'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    2. Confirm Reservation
                  </button>
                </div>

                {step === 1 ? (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="booking-service-select"
                        className="block text-xs font-semibold text-stone-700 mb-1.5"
                      >
                        Choose Dining Experience
                      </label>
                      <select
                        id="booking-service-select"
                        value={activeService.id}
                        onChange={(e) => handleServiceChange(e.target.value)}
                        className="w-full rounded-lg bg-white border border-stone-300 px-3.5 py-2.5 text-sm text-[#2B2B2B] font-medium focus:outline-none focus:border-[#8F521D]"
                      >
                        {SERVICE_OPTIONS.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.title}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-stone-600 mt-1.5">{activeService.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="booking-guests-select"
                          className="block text-xs font-semibold text-stone-700 mb-1.5"
                        >
                          <Users className="w-3.5 h-3.5 inline mr-1 text-[#8F521D]" />
                          Party Size
                        </label>
                        <select
                          id="booking-guests-select"
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full rounded-lg bg-white border border-stone-300 px-3 py-2 text-sm text-[#2B2B2B] font-mono-tabular focus:outline-none focus:border-[#8F521D]"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                              {num >= 6 ? ' (Digital Pre-Order)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="booking-date-input"
                          className="block text-xs font-semibold text-stone-700 mb-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#8F521D]" />
                          Reservation Date
                        </label>
                        <input
                          id="booking-date-input"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full rounded-lg bg-white border border-stone-300 px-3 py-2 text-sm text-[#2B2B2B] font-mono-tabular focus:outline-none focus:border-[#8F521D]"
                        />
                      </div>
                    </div>

                    {/* Optional Drinks Pairing Checkbox for Tasting Menus */}
                    {(activeService.id === 'tasting-8' ||
                      activeService.id === 'tasting-10' ||
                      activeService.id === 'nye-2026') && (
                      <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#E5E0D3]/70 border border-stone-300 cursor-pointer text-xs">
                        <span className="font-medium text-stone-800">
                          Add Sommelier Drinks Pairing (+£65 pp)
                        </span>
                        <input
                          type="checkbox"
                          checked={drinksPairing}
                          onChange={(e) => setDrinksPairing(e.target.checked)}
                          className="accent-[#8F521D] w-4 h-4"
                        />
                      </label>
                    )}

                    {/* Click 1: Instant Seating Times */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-700 mb-2">
                        <span className="font-semibold">
                          <Clock className="w-3.5 h-3.5 inline mr-1 text-[#8F521D]" />
                          Tap a Seating Time (Click 1 of 2)
                        </span>
                        <span className="font-mono-tabular font-semibold text-[#8F521D]">
                          Est. £{estimatedTotal}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {activeService.availableTimes.map((slot) => {
                          const isSelected = timeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => handleTimeSlotClick(slot)}
                              className={`py-2.5 px-2 rounded-lg font-mono-tabular text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                                isSelected
                                  ? 'bg-[#8F521D] text-white border-[#8F521D]'
                                  : 'bg-white text-[#2B2B2B] border-stone-300 hover:border-[#8F521D]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-stone-600 mt-2">{activeService.dietaryNote}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3 px-4 rounded-lg bg-[#8F521D] hover:bg-[#774316] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <span>Continue to Final Click ({timeSlot})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitBooking} className="space-y-3.5" noValidate>
                    <div className="flex items-center justify-between bg-[#E5E0D3] px-3.5 py-2.5 rounded-lg border border-stone-300 text-xs">
                      <div>
                        <span className="text-[#2B2B2B] font-semibold">{activeService.title}</span>
                        <div className="text-stone-700 font-mono-tabular mt-0.5">
                          {date} · {timeSlot} · {guests} {guests === 1 ? 'Guest' : 'Guests'} (Est. £
                          {estimatedTotal})
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleFillSampleGuest}
                        className="text-[#8F521D] hover:underline font-semibold whitespace-nowrap shrink-0 ml-2"
                      >
                        Auto-Fill Demo
                      </button>
                    </div>

                    <div>
                      <label
                        htmlFor="guest-name-input"
                        className="block text-xs font-semibold text-stone-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="guest-name-input"
                        type="text"
                        placeholder="e.g. Benoit Lamaudiere"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full rounded-lg bg-white border border-stone-300 px-3.5 py-2 text-sm text-[#2B2B2B] focus:outline-none focus:border-[#8F521D]"
                      />
                      {errors.guestName && (
                        <p className="text-xs text-red-700 font-medium mt-1" role="alert">
                          {errors.guestName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="guest-email-input"
                          className="block text-xs font-semibold text-stone-700 mb-1"
                        >
                          Email Address *
                        </label>
                        <input
                          id="guest-email-input"
                          type="email"
                          placeholder="info@restaurantdom.co.uk"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full rounded-lg bg-white border border-stone-300 px-3.5 py-2 text-sm text-[#2B2B2B] focus:outline-none focus:border-[#8F521D]"
                        />
                        {errors.guestEmail && (
                          <p className="text-xs text-red-700 font-medium mt-1" role="alert">
                            {errors.guestEmail}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="guest-phone-input"
                          className="block text-xs font-semibold text-stone-700 mb-1"
                        >
                          UK Mobile / Phone *
                        </label>
                        <input
                          id="guest-phone-input"
                          type="tel"
                          placeholder="01724 506816"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          className="w-full rounded-lg bg-white border border-stone-300 px-3.5 py-2 text-sm text-[#2B2B2B] font-mono-tabular focus:outline-none focus:border-[#8F521D]"
                        />
                        {errors.guestPhone && (
                          <p className="text-xs text-red-700 font-medium mt-1" role="alert">
                            {errors.guestPhone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="guest-dietary-input"
                        className="block text-xs font-semibold text-stone-700 mb-1"
                      >
                        Allergens, Vegetarian/Vegan Adaptation or 6+ Guest Pre-Order
                      </label>
                      <input
                        id="guest-dietary-input"
                        type="text"
                        placeholder="e.g. Vegetarian tasting menu, gluten-free, or table of 6+ roast choice..."
                        value={dietaryRequirements}
                        onChange={(e) => setDietaryRequirements(e.target.value)}
                        className="w-full rounded-lg bg-white border border-stone-300 px-3.5 py-2 text-sm text-[#2B2B2B] focus:outline-none focus:border-[#8F521D]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-lg bg-[#8F521D] hover:bg-[#774316] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm 2-Click Reservation</span>
                    </button>
                  </form>
                )}

                {latestConfirmed && (
                  <div
                    role="status"
                    className="mt-4 p-4 rounded-lg border border-emerald-700/40 bg-emerald-950/10 text-xs space-y-1.5 text-stone-800"
                  >
                    <div className="flex items-center justify-between text-emerald-900 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
                        Confirmed ({latestConfirmed.referenceCode})
                      </span>
                      <span className="font-mono-tabular">Est. £{latestConfirmed.estimatedValue}</span>
                    </div>
                    <p>
                      {latestConfirmed.guestName} · {latestConfirmed.guests} Guests ·{' '}
                      {latestConfirmed.serviceTitle} on {latestConfirmed.date} at{' '}
                      {latestConfirmed.timeSlot}.
                    </p>
                    <p className="text-stone-600">
                      Synced with ToastTab reservation diary + automated post-meal Google review
                      invitation scheduled.
                    </p>
                  </div>
                )}
              </div>

              {/* Recent Live Session Bookings */}
              <div className="mt-5 pt-4 border-t border-stone-300">
                <div className="flex items-center justify-between text-xs text-stone-600 mb-2">
                  <span>Recent Bookings Synced (Toast POS + 2-Click Flow)</span>
                  <span className="font-mono-tabular text-[#8F521D] font-semibold">
                    {bookings.length} active
                  </span>
                </div>
                <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                  {bookings.slice(0, 3).map((item) => (
                    <div
                      key={item.referenceCode}
                      className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded bg-white/80 border border-stone-300"
                    >
                      <div className="truncate pr-2">
                        <span className="font-mono-tabular text-[#8F521D] font-semibold mr-1.5">
                          {item.referenceCode}
                        </span>{' '}
                        <span className="text-[#2B2B2B] font-medium">{item.guestName}</span>
                        <span className="text-stone-600">
                          {' '}
                          · {item.guests}p · {item.timeSlot}
                        </span>
                      </div>
                      <span className="font-mono-tabular text-[#2B2B2B] font-semibold shrink-0">
                        £{item.estimatedValue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
