import React, { useState } from 'react';
import { REAL_MENUS_DATA, RealMenuSection } from '../utils/domLogic';
import { FileText, ArrowUpRight } from 'lucide-react';

interface CuratedMenusSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const CuratedMenusSection: React.FC<CuratedMenusSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<RealMenuSection['id']>('tasting');

  const activeMenu =
    REAL_MENUS_DATA.find((m) => m.id === activeMenuId) ?? REAL_MENUS_DATA[0];

  const mapTabToServiceId = (id: RealMenuSection['id']): string => {
    switch (id) {
      case 'tasting':
        return 'tasting-8';
      case 'lunch':
        return 'set-lunch';
      case 'alacarte':
        return 'alacarte';
      case 'sunday':
        return 'sunday-lunch';
      case 'nye':
        return 'nye-2026';
    }
  };

  const handleBookSelectedMenu = (id: RealMenuSection['id']) => {
    onSelectServiceForBooking(mapTabToServiceId(id));
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="menus" className="py-16 border-b border-stone-300 bg-[#F0EDE3] text-[#2B2B2B]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Authentic "Our Ethos" Section from restaurantdom.co.uk with Real Chef Sławek & Dining Room Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#8F521D] font-semibold">
              Our Ethos · 7–9 Robert Street, Scunthorpe
            </div>
            <h2
              className="font-goudy text-3xl sm:text-4xl text-[#8F521D] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              “Cooking, for me, goes beyond feeding people. It’s about telling a story.”
            </h2>
            <p className="text-sm font-semibold text-stone-800">— Sławek, Chef Patron</p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Each ingredient has a history, starting with the earth, the animals, and the people
              who raise them. Growing up in Poland, food was never wasted. My grandparents taught me
              to value everything on the table, from garden vegetables to animals raised with care.
              That mindset stayed with me.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Here in Lincolnshire, I’ve found the same respect for ingredients. Modern kitchens
              often focus on the prime cuts, the fillet and the loin, but to me every part of the
              animal has value. Whether it’s the liver, bones for stock, or fat for rendering, it’s
              about appreciating what others may discard.
            </p>
          </div>

          {/* Real Photographs from restaurantdom.co.uk */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-stone-300 bg-stone-200 aspect-[3/4]">
              <img
                src="/assets/dom/dsc8660.jpg"
                alt="Chef Patron Sławek Mikołajczyk in the Restaurant DOM dining room"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-stone-300 bg-stone-200 aspect-[3/4]">
              <img
                src="/assets/dom/dsc8596.jpg"
                alt="Restaurant DOM dining room with warm backlit shelves of preserved Lincolnshire produce"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Interactive HTML Menus (Replacing Mobile-Unfriendly Static PDFs while keeping PDF download links) */}
        <div className="pt-8 border-t border-stone-300">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#8F521D] font-semibold">
                Explore Our Menus · Sample Menus Updated 06.11.2026
              </div>
              <h2 className="font-goudy text-3xl sm:text-4xl text-[#8F521D] mt-1">
                Thoughtful Menus Inspired by the Land
              </h2>
              <p className="text-stone-700 text-sm sm:text-base mt-2 max-w-2xl">
                On the current website, clicking a menu forces mobile visitors to download a separate
                PDF file. Here, your exact menus are rendered natively for instant mobile reading,
                AI-search indexing, and 1-tap reservation.
              </p>
            </div>

            {/* Interactive Menu Selector Tabs */}
            <div
              role="group"
              aria-label="Filter Restaurant DOM Menus"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#E5E0D3] border border-stone-300 rounded-lg self-start"
            >
              {REAL_MENUS_DATA.map((menu) => (
                <button
                  key={menu.id}
                  type="button"
                  onClick={() => setActiveMenuId(menu.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeMenuId === menu.id
                      ? 'bg-[#8F521D] text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  {menu.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Menu Paper Sheet + Real Overhead Dish Photography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Official Menu Sheet styled like DOM's printed menus */}
            <div className="lg:col-span-8 rounded-xl bg-[#FAF8F3] border border-stone-300 shadow-sm p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-300">
                <div>
                  <span className="text-xs text-stone-600">{activeMenu.scheduleNote}</span>
                  <h3 className="font-goudy text-3xl text-[#8F521D] mt-0.5">{activeMenu.title}</h3>
                  <p className="font-mono-tabular text-xs sm:text-sm font-semibold text-stone-800 mt-1">
                    {activeMenu.priceSummary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href={activeMenu.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-300 bg-white hover:border-[#8F521D] text-xs font-medium text-stone-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#8F521D]" />
                    <span>View Original PDF</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleBookSelectedMenu(activeMenu.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8F521D] hover:bg-[#774316] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Book This Menu</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-8">
                {activeMenu.sections.map((sec) => (
                  <div key={sec.heading} className="space-y-4">
                    <h4 className="font-goudy text-xl text-[#8F521D] border-b border-stone-200 pb-1.5">
                      {sec.heading}
                    </h4>
                    <div className="divide-y divide-stone-200/80">
                      {sec.items.map((item) => (
                        <div
                          key={item.name}
                          className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                        >
                          <div>
                            <p className="font-semibold text-sm sm:text-base text-[#2B2B2B]">
                              {item.name}
                            </p>
                            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                              {item.detail}
                            </p>
                          </div>
                          {item.priceOrPairing && (
                            <span className="font-mono-tabular text-xs font-semibold text-[#8F521D] shrink-0">
                              {item.priceOrPairing}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-600">
                <span>
                  Adaptable for dietary requirements — please inform us of any allergens in advance.
                </span>
                <span className="font-mono-tabular">
                  7–9 Robert Street, Scunthorpe, DN15 6LU · 01724 506816
                </span>
              </div>
            </div>

            {/* Right 4 Cols: Real Culinary Photography from restaurantdom.co.uk */}
            <div className="lg:col-span-4 space-y-5">
              <div className="rounded-xl overflow-hidden border border-stone-300 bg-white shadow-sm">
                <img
                  src="/assets/dom/dsc7994.jpg"
                  alt="Authentic dishes plated at Restaurant DOM Scunthorpe"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-4">
                  <p className="text-xs text-[#8F521D] font-semibold">
                    From Our Open Kitchen on Robert Street
                  </p>
                  <p className="font-goudy text-xl text-[#2B2B2B] mt-0.5">
                    Zero-Waste Craft &amp; Lincolnshire Provenance
                  </p>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Every dish celebrates the region’s finest produce — from House Cured Pork Coppa
                    and Potato &amp; Leek Dumplings to Barbecued Mackerel with Benoit’s Figs.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-stone-300 bg-white shadow-sm">
                <img
                  src="/assets/dom/dsc8289.jpg"
                  alt="Curated wine cellar and pairings at Restaurant DOM"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/10] object-cover"
                />
                <div className="p-4">
                  <p className="text-xs text-[#8F521D] font-semibold">
                    Curated Cellar &amp; Tasting Pairings
                  </p>
                  <p className="font-goudy text-xl text-[#2B2B2B] mt-0.5">
                    8-Course (£65) &amp; 10-Course (£85) Flights
                  </p>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Featuring Polish Krupnik Sliwka (Gdansk), Great Newsome Brewery Sleck Dust
                    (Hull), Wressle Vineyard Sparkling Rosé (Brigg), and European cellar selections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
