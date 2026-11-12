import React, { useState } from 'react';
import { calculateRevenueImpact, buildAiSearchSchema } from '../utils/domLogic';
import { Code2, Copy, Check, Send, TrendingUp, Gauge } from 'lucide-react';

export const DiagnosticAuditSection: React.FC = () => {
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(1850);
  const [avgCoverSpend, setAvgCoverSpend] = useState<number>(52);
  const [monthlyCateringInquiries, setMonthlyCateringInquiries] = useState<number>(8);
  const [showSchemaModal, setShowSchemaModal] = useState<boolean>(false);
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  const [contactName, setContactName] = useState<string>('Benoit Lamaudiere');
  const [contactEmail, setContactEmail] = useState<string>('info@restaurantdom.co.uk');
  const [preferredRolloutOption, setPreferredRolloutOption] = useState<string>(
    '10-minute walkthrough of live integration on restaurantdom.co.uk'
  );
  const [rolloutNotes, setRolloutNotes] = useState<string>('');
  const [rolloutSubmitted, setRolloutSubmitted] = useState<boolean>(false);
  const [rolloutError, setRolloutError] = useState<string | null>(null);

  const metrics = calculateRevenueImpact({
    monthlyVisitors,
    avgCoverSpend,
    avgPartySize: 2.4,
    monthlyCateringInquiries,
  });

  const schemaJson = buildAiSearchSchema();

  const handleCopySchema = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(schemaJson).catch(() => {});
    }
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  const handleRolloutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactEmail.includes('@')) {
      setRolloutError('Please provide a valid name and email address.');
      return;
    }
    setRolloutError(null);
    setRolloutSubmitted(true);
  };

  return (
    <section id="diagnostic" className="py-16 bg-[#F0EDE3] text-[#2B2B2B]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-[#8F521D] font-semibold">
              03. Technical Diagnostic of restaurantdom.co.uk · Scunthorpe (DN15 6LU)
            </div>
            <h2
              className="font-goudy text-3xl sm:text-4xl text-[#8F521D] mt-1"
              style={{ textWrap: 'balance' }}
            >
              Removing Avada / Vimeo / PDF Mobile Friction Recovers £3,000–£6,200 Every Month
            </h2>
            <p className="text-stone-700 text-sm sm:text-base mt-2">
              Our diagnostic on <strong className="font-semibold">restaurantdom.co.uk</strong>{' '}
              identified three specific mobile bottlenecks: heavy background Vimeo + Avada theme CSS
              overhead (44/100 mobile conversion score), 10 separate static PDF menu downloads, and
              external ToastTab redirect drop-offs.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowSchemaModal((prev) => !prev)}
            className="px-4 py-2.5 rounded-lg border border-stone-400 bg-white hover:border-[#8F521D] text-xs font-semibold text-[#2B2B2B] transition-colors flex items-center gap-2 self-start whitespace-nowrap shrink-0"
          >
            <Code2 className="w-4 h-4 text-[#8F521D]" />
            <span>
              {showSchemaModal ? 'Hide AI-Search JSON-LD Schema' : 'Inspect AI-Search Schema'}
            </span>
          </button>
        </div>

        {showSchemaModal && (
          <div className="rounded-xl border border-[#8F521D]/40 bg-[#FAF8F3] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-300">
              <div>
                <h3 className="font-goudy text-2xl text-[#8F521D]">
                  AI-Search &amp; Local SEO Schema for Restaurant DOM Ltd (Company No. 14480146)
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Links your MICHELIN Guide 2026 profile, ToastTab reservations, and exact dish names
                  (including Barbecued Mackerel &amp; Benoit’s Figs) for Google AI &amp; Voice Search.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopySchema}
                className="px-3.5 py-2 rounded-lg bg-[#8F521D] text-white font-semibold text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSchema ? 'Copied Schema JSON-LD' : 'Copy JSON-LD Code'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-[#2D3032] text-[#F0EDE3] text-xs font-mono-tabular overflow-x-auto max-h-72">
              {schemaJson}
            </pre>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 6 Cols: Real Audit Findings on restaurantdom.co.uk */}
          <div className="lg:col-span-6 rounded-xl border border-stone-300 bg-[#FAF8F3] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-300">
                <div>
                  <p className="text-xs text-[#8F521D] font-semibold">Live Site Audit</p>
                  <h3 className="font-goudy text-2xl text-[#2B2B2B]">
                    Current WordPress/Avada Setup vs. Upgraded Experience
                  </h3>
                </div>
                <Gauge className="w-5 h-5 text-[#8F521D]" />
              </div>

              <div className="mt-5 divide-y divide-stone-200 text-xs sm:text-sm">
                <div className="py-3.5 grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 text-stone-800 font-semibold">
                    Mobile Conversion Score
                  </span>
                  <span className="col-span-3 font-mono-tabular text-stone-500">
                    44 / 100 (Current)
                  </span>
                  <span className="col-span-4 font-mono-tabular text-[#8F521D] font-bold text-right">
                    96 / 100 (Upgraded)
                  </span>
                </div>

                <div className="py-3.5 grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 text-stone-800 font-semibold">
                    Hero &amp; Script Payload
                  </span>
                  <span className="col-span-3 font-mono-tabular text-stone-500">
                    4.8s (Vimeo + Avada)
                  </span>
                  <span className="col-span-4 font-mono-tabular text-emerald-700 font-bold text-right">
                    0.9s (Optimized)
                  </span>
                </div>

                <div className="py-3.5 grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 text-stone-800 font-semibold">
                    10 Menu Files on Mobile
                  </span>
                  <span className="col-span-3 text-stone-500">PDF downloads</span>
                  <span className="col-span-4 text-[#2B2B2B] font-semibold text-right">
                    Instant HTML + PDF option
                  </span>
                </div>

                <div className="py-3.5 grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 text-stone-800 font-semibold">
                    ToastTab Table Booking
                  </span>
                  <span className="col-span-3 text-stone-500">External tab redirect</span>
                  <span className="col-span-4 text-[#2B2B2B] font-semibold text-right">
                    Embedded 2-Click Flow
                  </span>
                </div>

                <div className="py-3.5 grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 text-stone-800 font-semibold">
                    Tables of 6+ (Sunday Lunch)
                  </span>
                  <span className="col-span-3 text-stone-500">Manual email form</span>
                  <span className="col-span-4 text-[#2B2B2B] font-semibold text-right">
                    Digital 2-Click Pre-Order
                  </span>
                </div>

                <div className="py-3.5 grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 text-stone-800 font-semibold">
                    MICHELIN &amp; Dish Schema
                  </span>
                  <span className="col-span-3 text-stone-500">Unstructured PDF text</span>
                  <span className="col-span-4 text-[#8F521D] font-bold text-right">
                    Full Restaurant JSON-LD
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[#F0EDE3] border border-stone-300 text-xs text-stone-700">
              <strong className="text-[#2B2B2B]">Seamless Toast POS Compatibility:</strong> Keeps
              your existing ToastTab reservation system (`tables.toasttab.com`) and kitchen workflow
              intact while eliminating mobile bounce.
            </div>
          </div>

          {/* Right 6 Cols: Interactive Revenue Recovery Calculator */}
          <div className="lg:col-span-6 rounded-xl border border-stone-300 bg-[#FAF8F3] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-300">
                <div>
                  <p className="text-xs text-[#8F521D] font-semibold">Interactive ROI Model</p>
                  <h3 className="font-goudy text-2xl text-[#2B2B2B]">
                    Monthly Booking &amp; Revenue Recovery Calculator
                  </h3>
                </div>
                <TrendingUp className="w-5 h-5 text-[#8F521D]" />
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label htmlFor="visitors-slider" className="text-stone-700 font-semibold">
                      Monthly Website Visitors (restaurantdom.co.uk)
                    </label>
                    <span className="font-mono-tabular text-[#8F521D] font-bold">
                      {monthlyVisitors.toLocaleString()} visitors / mo
                    </span>
                  </div>
                  <input
                    id="visitors-slider"
                    type="range"
                    min={800}
                    max={4500}
                    step={50}
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                    className="w-full accent-[#8F521D] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label htmlFor="spend-slider" className="text-stone-700 font-semibold">
                      Average Spend per Guest (Set Lunch £34 to Tasting £95)
                    </label>
                    <span className="font-mono-tabular text-[#8F521D] font-bold">
                      £{avgCoverSpend} / guest
                    </span>
                  </div>
                  <input
                    id="spend-slider"
                    type="range"
                    min={34}
                    max={95}
                    step={1}
                    value={avgCoverSpend}
                    onChange={(e) => setAvgCoverSpend(Number(e.target.value))}
                    className="w-full accent-[#8F521D] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label htmlFor="catering-slider" className="text-stone-700 font-semibold">
                      Monthly Large-Party (6+) &amp; Private Dining Inquiries
                    </label>
                    <span className="font-mono-tabular text-[#8F521D] font-bold">
                      {monthlyCateringInquiries} inquiries / mo
                    </span>
                  </div>
                  <input
                    id="catering-slider"
                    type="range"
                    min={2}
                    max={25}
                    step={1}
                    value={monthlyCateringInquiries}
                    onChange={(e) => setMonthlyCateringInquiries(Number(e.target.value))}
                    className="w-full accent-[#8F521D] cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-[#2D3032] text-[#F0EDE3] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-stone-300">Recovered Bookings / Month</p>
                  <p className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-white mt-1">
                    +{metrics.totalRecoveredBookings} bookings
                  </p>
                  <p className="text-xs text-stone-300 font-mono-tabular mt-1">
                    {metrics.recoveredTableBookings} tables + {metrics.recoveredCateringBookings}{' '}
                    large-party/events
                  </p>
                </div>

                <div>
                  <p className="text-xs text-stone-300">Recovered Monthly Revenue</p>
                  <p className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#E09F67] mt-1">
                    £{metrics.monthlyRecoveredRevenueGbp.toLocaleString()} / mo
                  </p>
                  <p className="text-xs text-stone-300 font-mono-tabular mt-1">
                    £{metrics.annualRecoveredRevenueGbp.toLocaleString()} annualized impact
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-stone-600">
              Calibrated to Scunthorpe &amp; North Lincolnshire hospitality benchmarks (25–45
              recovered table &amp; group bookings · £3,000–£6,200 monthly revenue).
            </p>
          </div>
        </div>

        {/* Zero-Obligation Next Step Form for Benoit Lamaudiere */}
        <div
          id="rollout-approval"
          className="rounded-xl bg-[#2D3032] text-[#F0EDE3] p-6 sm:p-8 lg:p-10 border border-stone-700"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#E09F67] font-semibold">
                Zero-Obligation Next Step · Prepared for Benoit Lamaudiere
              </div>
              <h3 className="font-goudy text-3xl text-white">
                Would You Like Us to Deploy This Upgrade on restaurantdom.co.uk?
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Hi Benoit — as promised in Sarah Miller’s email, there is zero obligation. We can
                implement the 2-click ToastTab &amp; 6+ guest pre-order flow, replace the slow PDF
                menu links with fast indexable HTML menus, and activate the 4–5★ Google Review
                shield without any downtime.
              </p>
              <div className="pt-2 text-xs text-stone-400 space-y-1">
                <p>Prepared by: Sarah Miller — Client Partnerships, NovaFlow Digital</p>
                <p>Email: sarah.miller@novaflowdigital.work</p>
              </div>
            </div>

            <div className="lg:col-span-6">
              {!rolloutSubmitted ? (
                <form onSubmit={handleRolloutSubmit} className="space-y-3.5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="rollout-name"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        id="rollout-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full rounded-lg bg-[#1E2022] border border-stone-600 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E09F67]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="rollout-email"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="rollout-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full rounded-lg bg-[#1E2022] border border-stone-600 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E09F67]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="rollout-option"
                      className="block text-xs font-medium text-stone-300 mb-1"
                    >
                      Preferred Next Step (No Obligation)
                    </label>
                    <select
                      id="rollout-option"
                      value={preferredRolloutOption}
                      onChange={(e) => setPreferredRolloutOption(e.target.value)}
                      className="w-full rounded-lg bg-[#1E2022] border border-stone-600 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E09F67]"
                    >
                      <option value="10-minute walkthrough of live integration on restaurantdom.co.uk">
                        1. Book a quick 10-minute walkthrough with Sarah Miller
                      </option>
                      <option value="Send written rollout timeline & pricing by email first">
                        2. Send me the written rollout timeline &amp; pricing by email first
                      </option>
                      <option value="Set up a zero-risk staging preview on our domain">
                        3. Set up a zero-risk staging test for Restaurant DOM
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="rollout-notes"
                      className="block text-xs font-medium text-stone-300 mb-1"
                    >
                      Notes or Best Time to Reach You Between Services (Optional)
                    </label>
                    <input
                      id="rollout-notes"
                      type="text"
                      placeholder="e.g. Wednesday or Thursday morning before 11:30am lunch prep..."
                      value={rolloutNotes}
                      onChange={(e) => setRolloutNotes(e.target.value)}
                      className="w-full rounded-lg bg-[#1E2022] border border-stone-600 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E09F67]"
                    />
                  </div>

                  {rolloutError && (
                    <p className="text-xs text-amber-400" role="alert">
                      {rolloutError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-lg bg-[#8F521D] hover:bg-[#a66023] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Zero-Obligation Rollout Plan</span>
                  </button>
                </form>
              ) : (
                <div
                  role="status"
                  className="p-6 rounded-xl border border-emerald-500/40 bg-emerald-950/30 space-y-2"
                >
                  <p className="text-sm font-semibold text-emerald-300">
                    Thank you, {contactName} — Your Preferences Have Been Logged!
                  </p>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    Selected option: <strong>{preferredRolloutOption}</strong>. Sarah Miller
                    (NovaFlow Digital) will follow up at{' '}
                    <span className="font-mono-tabular">{contactEmail}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRolloutSubmitted(false)}
                    className="text-xs text-[#E09F67] underline pt-1"
                  >
                    Update preference or add another note
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
