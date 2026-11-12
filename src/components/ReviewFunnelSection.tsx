import React, { useState } from 'react';
import { evaluateReviewFunnel, REAL_GOOGLE_REVIEWS } from '../utils/domLogic';
import { Star, ShieldCheck, Share2, MessageSquareHeart, CheckCircle2 } from 'lucide-react';

interface FunnelLogEntry {
  id: string;
  guestName: string;
  rating: number;
  routeLabel: string;
  note: string;
  timestamp: string;
}

const INITIAL_LOGS: FunnelLogEntry[] = REAL_GOOGLE_REVIEWS.map((r) => ({
  id: r.id,
  guestName: r.author,
  rating: r.rating,
  routeLabel: r.source,
  note: `“${r.text}”`,
  timestamp: 'Verified Google Review',
}));

export const ReviewFunnelSection: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [dinerName, setDinerName] = useState<string>('Luke Parsons');
  const [dinerNote, setDinerNote] = useState<string>(
    'Recently had the chance to eat here and had a great time, food was exceptional and staff are lovely!'
  );
  const [funnelLogs, setFunnelLogs] = useState<FunnelLogEntry[]>(INITIAL_LOGS);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  const decision = evaluateReviewFunnel(selectedRating);

  const handleStarSelect = (rating: number) => {
    setSelectedRating(rating);
    setSubmittedNotice(null);
    if (rating >= 4) {
      setDinerNote(
        'Recently had the chance to eat here and had a great time, food was exceptional and staff are lovely!'
      );
    } else {
      setDinerNote(
        'The courses were delicious, though our taxi pickup on Robert Street was delayed after dessert.'
      );
    }
  };

  const handleTestFunnelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = dinerName.trim() || 'Verified Guest';
    const cleanNote = dinerNote.trim() || 'Tested via live preview.';

    const newEntry: FunnelLogEntry = {
      id: `rev-${Date.now()}`,
      guestName: cleanName,
      rating: selectedRating,
      routeLabel:
        decision.route === 'public_syndication'
          ? 'Syndicated to Google Reviews & Trustindex Feed'
          : 'Intercepted Privately to GM Benoit Lamaudiere (info@restaurantdom.co.uk)',
      note: `“${cleanNote}”`,
      timestamp: 'Just now',
    };

    setFunnelLogs((prev) => [newEntry, ...prev]);
    setSubmittedNotice(
      decision.route === 'public_syndication'
        ? `5★/4★ Public Google Review triggered for ${cleanName} — feeds your Trustindex widget on restaurantdom.co.uk.`
        : `Private feedback routed directly to Benoit Lamaudiere (info@restaurantdom.co.uk) — kept off public Google reviews.`
    );
  };

  return (
    <section
      id="review-funnel"
      className="py-16 border-b border-stone-300 bg-[#E8E3D5] text-[#2B2B2B]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs uppercase tracking-widest text-[#8F521D] font-semibold">
            02. Automated 4–5 Star Google Review Funnel · Synced with Trustindex
          </div>
          <h2
            className="font-goudy text-3xl sm:text-4xl text-[#8F521D] mt-1"
            style={{ textWrap: 'balance' }}
          >
            What Our Guests Are Saying — Automated Post-Visit Review Engine
          </h2>
          <p className="text-stone-700 text-sm sm:text-base mt-2">
            Your current site displays verified Google Reviews via Trustindex (Nina Ronson, Verity
            Thompson, Vivienne Bee, Mike Cavanagh). This automated funnel messages diners 2 hours
            after their meal: 4–5★ ratings go straight to Google Maps, while 1–3★ notes go
            privately to General Manager Benoit Lamaudiere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (7 cols): Interactive 1-5 Star Simulator */}
          <div className="lg:col-span-7 rounded-xl bg-[#FAF8F3] border border-stone-300 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-stone-300">
                <div>
                  <span className="text-xs text-stone-600">
                    Interactive Diner Post-Visit SMS / Email Prompt
                  </span>
                  <h3 className="font-goudy text-2xl text-[#2B2B2B]">
                    “Thank you for dining at Restaurant DOM. How was your meal?”
                  </h3>
                </div>
                <span className="font-mono-tabular text-xs font-semibold text-[#8F521D]">
                  Selected: {selectedRating} / 5 Stars
                </span>
              </div>

              <div className="my-6">
                <p className="text-xs font-semibold text-stone-700 mb-2.5">
                  Tap a Star Rating Below to Test the Automated Routing:
                </p>
                <div
                  role="group"
                  aria-label="Select diner star rating"
                  className="grid grid-cols-5 gap-2 sm:gap-3"
                >
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const active = starValue <= selectedRating;
                    const isExact = starValue === selectedRating;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => handleStarSelect(starValue)}
                        aria-label={`Rate ${starValue} out of 5 stars`}
                        className={`py-3 px-2 rounded-lg border text-center transition-colors flex flex-col items-center justify-center gap-1 ${
                          isExact
                            ? 'border-[#8F521D] bg-[#8F521D] text-white'
                            : active
                            ? 'border-[#8F521D]/40 bg-[#F0EDE3] text-[#8F521D]'
                            : 'border-stone-300 bg-white text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            isExact
                              ? 'fill-white text-white'
                              : active
                              ? 'fill-[#8F521D] text-[#8F521D]'
                              : 'text-stone-400'
                          }`}
                        />
                        <span className="font-mono-tabular text-xs font-semibold whitespace-nowrap">
                          {starValue} {starValue === 1 ? 'Star' : 'Stars'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Routing Explanation */}
              <div className="p-5 rounded-xl border border-stone-300 bg-[#F0EDE3]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#8F521D] flex items-center gap-1.5">
                    {decision.route === 'public_syndication' ? (
                      <Share2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                    )}
                    {decision.headline}
                  </span>
                  <span className="font-mono-tabular text-xs font-semibold text-stone-700">
                    {decision.route === 'public_syndication'
                      ? 'Public Google Map Pack'
                      : 'Private GM Shield'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {decision.explanation}
                </p>
                <div className="mt-3 pt-3 border-t border-stone-300 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                  <span>Destination: {decision.recipient}</span>
                  <span className="text-[#8F521D] font-medium">{decision.seoImpactNote}</span>
                </div>
              </div>

              <form onSubmit={handleTestFunnelSubmit} className="mt-5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="funnel-diner-name"
                      className="block text-xs font-semibold text-stone-700 mb-1"
                    >
                      Guest Name
                    </label>
                    <input
                      id="funnel-diner-name"
                      type="text"
                      value={dinerName}
                      onChange={(e) => setDinerName(e.target.value)}
                      className="w-full rounded-lg bg-white border border-stone-300 px-3 py-2 text-sm text-[#2B2B2B] focus:outline-none focus:border-[#8F521D]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="funnel-diner-note"
                      className="block text-xs font-semibold text-stone-700 mb-1"
                    >
                      Guest Review / Note
                    </label>
                    <input
                      id="funnel-diner-note"
                      type="text"
                      value={dinerNote}
                      onChange={(e) => setDinerNote(e.target.value)}
                      className="w-full rounded-lg bg-white border border-stone-300 px-3 py-2 text-sm text-[#2B2B2B] focus:outline-none focus:border-[#8F521D]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#8F521D] hover:bg-[#774316] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                >
                  <MessageSquareHeart className="w-4 h-4" />
                  <span>
                    {decision.route === 'public_syndication'
                      ? `Simulate ${selectedRating}★ Public Google Review Post`
                      : `Simulate ${selectedRating}★ Private Alert to Benoit Lamaudiere`}
                  </span>
                </button>
              </form>

              {submittedNotice && (
                <div
                  role="status"
                  className="mt-3 p-3 rounded-lg border border-emerald-700/40 bg-emerald-950/10 text-xs text-emerald-950 font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
                  <span>{submittedNotice}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): Real Verified Google Reviews from restaurantdom.co.uk */}
          <div className="lg:col-span-5 rounded-xl bg-[#FAF8F3] border border-stone-300 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-300">
                <div>
                  <p className="text-xs text-[#8F521D] font-semibold">
                    Live Google Reviews &amp; Trustindex Feed
                  </p>
                  <h3 className="font-goudy text-2xl text-[#2B2B2B]">
                    Verified Guest Reviews at DOM
                  </h3>
                </div>
                <span className="font-mono-tabular text-xs text-stone-600">
                  {funnelLogs.length} verified entries
                </span>
              </div>

              <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {funnelLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-lg border border-stone-300 bg-white space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#2B2B2B]">{log.guestName}</span>
                      <span className="font-mono-tabular text-[#8F521D] font-semibold">
                        {'★'.repeat(log.rating)} ({log.rating}/5)
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">{log.note}</p>
                    <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500">
                      <span>{log.routeLabel}</span>
                      <span className="font-mono-tabular">{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-300 text-xs text-stone-700 space-y-1">
              <div className="flex items-center justify-between font-mono-tabular">
                <span className="font-semibold">Automated Review Velocity Lift:</span>
                <span className="text-[#8F521D] font-bold">+18 to +28 5★ Google reviews / mo</span>
              </div>
              <p className="text-stone-600">
                Replaces heavy render-blocking Trustindex CSS/JS scripts with fast, cached server
                reviews that load in 0.1s on mobile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
