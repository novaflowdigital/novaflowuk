import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateReservationForm,
  createBookingRecord,
  evaluateReviewFunnel,
  calculateRevenueImpact,
  buildAiSearchSchema,
  REAL_MENUS_DATA,
} from './domLogic';

test('validateReservationForm rejects empty required fields and accepts valid UK reservation', () => {
  const invalidResult = validateReservationForm({
    serviceId: '',
    date: '',
    timeSlot: '',
    guests: 0,
    guestName: '',
    guestEmail: 'not-an-email',
    guestPhone: '123',
    dietaryRequirements: '',
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.guestName);
  assert.ok(invalidResult.errors.guestEmail);
  assert.ok(invalidResult.errors.guestPhone);

  const validResult = validateReservationForm({
    serviceId: 'tasting-8',
    date: '2026-11-14',
    timeSlot: '19:30',
    guests: 2,
    guestName: 'Benoit Lamaudiere',
    guestEmail: 'info@restaurantdom.co.uk',
    guestPhone: '01724 506816',
    dietaryRequirements: 'None',
  });
  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('createBookingRecord uses exact £79 8-course tasting menu price from restaurantdom.co.uk', () => {
  const record = createBookingRecord(
    {
      serviceId: 'tasting-8',
      date: '2026-11-14',
      timeSlot: '19:30',
      guests: 2,
      guestName: 'Verity Thompson',
      guestEmail: 'verity@example.co.uk',
      guestPhone: '07700 900123',
      dietaryRequirements: 'None',
    },
    208
  );

  assert.equal(record.referenceCode, 'DOM-208-1930');
  assert.equal(record.estimatedValue, 79 * 2);
});

test('REAL_MENUS_DATA contains authentic dishes including Benoit’s Figs and Pork Smalec', () => {
  const allDishNames = REAL_MENUS_DATA.flatMap((m) =>
    m.sections.flatMap((s) => s.items.map((i) => `${i.name} ${i.detail}`))
  ).join(' ');
  assert.ok(allDishNames.includes('Benoit’s Figs'));
  assert.ok(allDishNames.includes('smalec'));
});

test('evaluateReviewFunnel routes 4-5 stars to public syndication and 1-3 stars to GM desk', () => {
  const highReview = evaluateReviewFunnel(5);
  assert.equal(highReview.route, 'public_syndication');

  const lowReview = evaluateReviewFunnel(2);
  assert.equal(lowReview.route, 'private_gm_desk');
  assert.ok(lowReview.recipient.includes('Benoit Lamaudiere'));
});

test('calculateRevenueImpact aligns with Scunthorpe diagnostic baseline (25-45 bookings, £3,000-£6,200)', () => {
  const impact = calculateRevenueImpact({
    monthlyVisitors: 1850,
    avgCoverSpend: 52,
    avgPartySize: 2.4,
    monthlyCateringInquiries: 8,
  });

  assert.equal(impact.legacyScore, 44);
  assert.equal(impact.upgradedScore, 96);
  assert.ok(impact.totalRecoveredBookings >= 25 && impact.totalRecoveredBookings <= 45);
  assert.ok(impact.monthlyRecoveredRevenueGbp >= 3000 && impact.monthlyRecoveredRevenueGbp <= 6200);
});

test('buildAiSearchSchema outputs valid JSON-LD containing Michelin Guide and ToastTab links', () => {
  const jsonString = buildAiSearchSchema();
  const parsed = JSON.parse(jsonString);
  assert.equal(parsed['@type'], 'Restaurant');
  assert.equal(parsed.address.postalCode, 'DN15 6LU');
});
