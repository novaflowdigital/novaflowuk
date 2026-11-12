/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ConfirmedBooking } from './utils/domLogic';
import { BookingEngineSection } from './components/BookingEngineSection';
import { CuratedMenusSection } from './components/CuratedMenusSection';
import { ReviewFunnelSection } from './components/ReviewFunnelSection';
import { DiagnosticAuditSection } from './components/DiagnosticAuditSection';

const INITIAL_BOOKINGS: ConfirmedBooking[] = [
  {
    serviceId: 'tasting-10',
    serviceTitle: 'Chef’s Extended Tasting Menu — Ten Courses (£95)',
    date: '2026-11-14',
    timeSlot: '19:00',
    guests: 2,
    guestName: 'Mike Cavanagh',
    guestEmail: 'm.cavanagh@lincolnshire.uk',
    guestPhone: '07700 900412',
    dietaryRequirements: 'Standard 10-course tasting',
    referenceCode: 'DOM-104-1900',
    estimatedValue: 190,
    createdAt: '18 mins ago',
  },
  {
    serviceId: 'set-lunch',
    serviceTitle: 'Today’s Set Lunch Menu (2 Courses £34 / 3 Courses £39)',
    date: '2026-11-13',
    timeSlot: '12:30',
    guests: 2,
    guestName: 'Verity Thompson',
    guestEmail: 'verity.t@scunthorpe.co.uk',
    guestPhone: '01724 506816',
    dietaryRequirements: '3-Course Set Lunch',
    referenceCode: 'DOM-103-1230',
    estimatedValue: 78,
    createdAt: '1 hr ago',
  },
];

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('tasting-8');
  const [bookings, setBookings] = useState<ConfirmedBooking[]>(INITIAL_BOOKINGS);

  const handleAddBooking = (newBooking: ConfirmedBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0EDE3] text-[#2B2B2B]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#2D3032] text-[#F0EDE3] border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#booking"
            className="font-goudy text-2xl tracking-wider uppercase text-[#F0EDE3] whitespace-nowrap shrink-0"
          >
            Restaurant DOM
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-200"
          >
            <a
              href="#booking"
              className="hover:text-[#E09F67] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Book a Table
            </a>
            <a
              href="#menus"
              className="hover:text-[#E09F67] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Our Menus
            </a>
            <a
              href="#review-funnel"
              className="hover:text-[#E09F67] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Guest Reviews
            </a>
            <a
              href="#diagnostic"
              className="hover:text-[#E09F67] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Site Diagnostic
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#8F521D] hover:bg-[#a66023] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Book a Table
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <BookingEngineSection
          selectedServiceId={selectedServiceId}
          onSelectServiceId={setSelectedServiceId}
          bookings={bookings}
          onAddBooking={handleAddBooking}
        />

        <CuratedMenusSection onSelectServiceForBooking={setSelectedServiceId} />

        <ReviewFunnelSection />

        <DiagnosticAuditSection />
      </main>

      {/* Authentic Restaurant DOM Footer ("An invitation into our home") */}
      <footer className="border-t border-stone-700 bg-[#232628] text-stone-300 py-12 text-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <img
              src="/assets/dom/dom-logo.png"
              alt="Restaurant DOM Official Logo"
              referrerPolicy="no-referrer"
              className="h-10 w-auto object-contain mb-2"
            />
            <p className="font-goudy text-lg text-white">An invitation into our home</p>
            <p>
              7–9 Robert Street, Scunthorpe, North Lincolnshire, DN15 6LU
            </p>
            <p className="font-mono-tabular">
              Tel: 01724 506816 / 01724 506817 · info@restaurantdom.co.uk
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="font-goudy text-lg text-white">Opening Hours</p>
            <p>Wednesday to Saturday: From 12pm (Last orders 8.30pm)</p>
            <p>Sunday Lunch: 12pm to 3.30pm (October to December)</p>
            <p>Closed Christmas Eve and Christmas Day</p>
            <p>Open New Year’s Eve Evening Only (6-Course Tasting Menu)</p>
          </div>

          <div className="space-y-2 md:text-right flex flex-col md:items-end justify-between">
            <div className="flex flex-wrap items-center gap-4 text-stone-200">
              <a
                href="https://guide.michelin.com/gb/en/north-lincolnshire/scunthorpe_1742628/restaurant/restaurant-dom"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E09F67] underline underline-offset-4"
              >
                MICHELIN Guide 2026
              </a>
              <a
                href="https://www.instagram.com/restaurant_dom/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E09F67] underline underline-offset-4"
              >
                Instagram
              </a>
              <a
                href="https://tables.toasttab.com/restaurants/9db9a2cb-5353-4456-a730-7c2a12caa479/reserve?partySize=2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E09F67] underline underline-offset-4"
              >
                ToastTab Direct
              </a>
            </div>
            <div className="space-y-1 text-stone-400">
              <p>
                © Restaurant DOM Ltd (Registered in England &amp; Wales No. 14480146) · Built from
                our DOM to yours.
              </p>
              <p className="text-[#E09F67]">
                Custom Conversion Upgrade Preview prepared by Sarah Miller · NovaFlow Digital
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
