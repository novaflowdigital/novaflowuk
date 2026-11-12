export interface ServiceOption {
  id: string;
  title: string;
  subtitle: string;
  pricePerGuest: number;
  priceLabel: string;
  duration: string;
  availableTimes: string[];
  dietaryNote: string;
  pdfUrl: string;
}

export interface RealMenuCourse {
  name: string;
  detail: string;
  priceOrPairing?: string;
}

export interface RealMenuSection {
  id: 'tasting' | 'lunch' | 'alacarte' | 'sunday' | 'nye';
  title: string;
  priceSummary: string;
  scheduleNote: string;
  pdfPath: string;
  sections: {
    heading: string;
    items: RealMenuCourse[];
  }[];
}

export interface RealGoogleReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  source: string;
}

export interface BookingInput {
  serviceId: string;
  date: string;
  timeSlot: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  dietaryRequirements: string;
  drinksPairing?: boolean;
}

export interface BookingValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface ConfirmedBooking extends BookingInput {
  referenceCode: string;
  serviceTitle: string;
  estimatedValue: number;
  createdAt: string;
}

export interface ReviewFunnelDecision {
  rating: number;
  route: 'public_syndication' | 'private_gm_desk';
  headline: string;
  explanation: string;
  recipient: string;
  platforms: string[];
  seoImpactNote: string;
}

export interface RevenueSimulatorInput {
  monthlyVisitors: number;
  avgCoverSpend: number;
  avgPartySize: number;
  monthlyCateringInquiries: number;
}

export interface RevenueSimulatorOutput {
  legacyScore: number;
  upgradedScore: number;
  legacyLoadSeconds: number;
  upgradedLoadSeconds: number;
  recoveredTableBookings: number;
  recoveredCateringBookings: number;
  totalRecoveredBookings: number;
  monthlyRecoveredRevenueGbp: number;
  annualRecoveredRevenueGbp: number;
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'tasting-8',
    title: 'Chef’s Tasting Menu — Eight Courses (£79)',
    subtitle: 'Optional Eight-Course Drinks Pairing (+£65 pp) · Vegetarian/Vegan available',
    pricePerGuest: 79,
    priceLabel: '£79 per person',
    duration: 'Wed–Sat · From 12pm (Last orders 8:30pm)',
    availableTimes: ['12:30', '17:30', '18:30', '19:30', '20:15'],
    dietaryNote: 'Adaptable for dietary requirements — please inform us of any allergens in advance.',
    pdfUrl: '/assets/dom/menus/Tasting-Menu.pdf',
  },
  {
    id: 'tasting-10',
    title: 'Chef’s Extended Tasting Menu — Ten Courses (£95)',
    subtitle: 'Includes Pork Sweetcorn Velouté & Twice Baked Cheese Soufflé courses (+£85 Drinks Pairing)',
    pricePerGuest: 95,
    priceLabel: '£95 per person',
    duration: 'Wed–Sat · From 12pm (Last orders 8:30pm)',
    availableTimes: ['12:30', '17:30', '18:15', '19:00', '19:45'],
    dietaryNote: '10 courses of Lincolnshire seasonal craft curated by Chef Patron Sławek.',
    pdfUrl: '/assets/dom/menus/Tasting-Menu.pdf',
  },
  {
    id: 'set-lunch',
    title: 'Today’s Set Lunch Menu (2 Courses £34 / 3 Courses £39)',
    subtitle: 'Wednesday to Saturday Lunch Service · 7–9 Robert Street, Scunthorpe',
    pricePerGuest: 39,
    priceLabel: '£34 (2 Courses) / £39 (3 Courses)',
    duration: 'Wed–Sat · 12:00pm – 3:00pm',
    availableTimes: ['12:00', '12:30', '13:00', '13:30', '14:15'],
    dietaryNote: 'Features Duck Liver Parfait, Dill Cured Salmon, Potato & Leek Dumpling & BBQ Pork Loin.',
    pdfUrl: '/assets/dom/menus/Lunch-Menu.pdf',
  },
  {
    id: 'alacarte',
    title: 'Today’s Main À La Carte Menu',
    subtitle: 'Starters £11–£14 · Mains £25–£43 · Sides £5 · Desserts £11–£13',
    pricePerGuest: 54,
    priceLabel: 'À La Carte (Avg. £54 pp)',
    duration: 'Wed–Sat · 12:00pm – 8:30pm',
    availableTimes: ['12:30', '17:30', '18:30', '19:30', '20:30'],
    dietaryNote: 'Seared Venison (£32), 8oz Fillet Steak (£43), Smoked Salmon Mit-Cuit (£29) & Benoit’s Figs (£11).',
    pdfUrl: '/assets/dom/menus/Main-Menu.pdf',
  },
  {
    id: 'sunday-lunch',
    title: 'Sunday Lunch at DOM — Family-Style & Roasts (£49)',
    subtitle: '6 Family-Style Table Starters + Traditional Roasts + Dessert',
    pricePerGuest: 49,
    priceLabel: '£49 per person',
    duration: 'Sundays · 12:00pm to 3:30pm (Oct–Dec)',
    availableTimes: ['12:00', '12:45', '13:30', '14:15', '15:00'],
    dietaryNote: 'Tables of 6+ include instant digital pre-order selection (no manual email form needed).',
    pdfUrl: '/assets/dom/menus/Sunday-Lunch.pdf',
  },
  {
    id: 'nye-2026',
    title: 'New Year’s Eve 2026 — 6-Course Tasting Menu (£99)',
    subtitle: 'New Year’s Eve Evening Only · Optional Drinks Pairing (£85 pp)',
    pricePerGuest: 99,
    priceLabel: '£99 per person',
    duration: '31 Dec 2026 · Evening Only',
    availableTimes: ['18:30', '19:00', '19:30', '20:00'],
    dietaryNote: 'Includes House Charcuteries, Wressle Vineyard Sparkling Rosé pairing & Beef Wellington.',
    pdfUrl: '/assets/dom/menus/NYE-Menu.pdf',
  },
];

export const REAL_MENUS_DATA: RealMenuSection[] = [
  {
    id: 'tasting',
    title: 'Chef’s Tasting Menu',
    priceSummary: 'Eight Courses £79 · Extended Ten Courses £95 · Drinks Pairing £65 / £85 pp',
    scheduleNote: 'Wednesday to Saturday · Adaptable for Vegetarian & Vegan guests',
    pdfPath: '/assets/dom/menus/Tasting-Menu.pdf',
    sections: [
      {
        heading: 'Tasting Sequence (Updated from restaurantdom.co.uk)',
        items: [
          {
            name: 'House Cured Pork Coppa',
            detail: 'Porc Coppa Confit Garlic Oil',
            priceOrPairing: 'Pairing: Prosecco - Veneto, Italy',
          },
          {
            name: 'Focaccia',
            detail: 'Served with pork smalec and salted cucumber',
            priceOrPairing: 'House Bakery',
          },
          {
            name: 'Potato / Leek / Dumpling',
            detail: 'Potato & Leek Dumpling, Potato Velouté, Blown Wild Rice',
            priceOrPairing: 'Pairing: Paparuda 2024, Feteasca Regala, Romania',
          },
          {
            name: 'Duck Liver Parfait / Plum / Port',
            detail: 'Macerated Plums, Almond Brittle, Plum Chutney',
            priceOrPairing: 'Pairing: Krupnik, Sliwka, Gdansk, Poland',
          },
          {
            name: 'Pork / Sweetcorn / Velouté (Extended 10-Course)',
            detail: 'Pork Croquette, Sweetcorn Velouté, BBQ Sweetcorn, Wild Mushrooms',
            priceOrPairing: 'Pairing: Sleck Dust, Great Newsome Brewery, Hull',
          },
          {
            name: 'Mackerel / Figs / Ponzu',
            detail: 'Barbecued Mackerel, Benoit’s Figs, Radish, Hazelnut & Ponzu dressing',
            priceOrPairing: 'Pairing: Kuki 2020 - Marlborough, New Zealand',
          },
          {
            name: 'Cheese Soufflé / Mushroom / Olive Oil (Extended 10-Course)',
            detail: 'Twice Baked Cheese Soufflé, Mushroom Duxelle, Olive Oil, Parmesan Velouté',
            priceOrPairing: 'Pairing: Avondale 2021 - Western Cape, SA',
          },
          {
            name: 'Poached & Seared Breast of Chicken or Seared Picanha Steak',
            detail: 'Beetroot Relish, Golden Beetroot, Horseradish Cream, Jus, Crispy Potatoes',
            priceOrPairing: 'Beef: #22 Solomnishvili 2019, Georgia | Chicken: Esk Valley Pinot Gris',
          },
          {
            name: 'Chocolate / Granola / Blackberry',
            detail: 'Chocolate Pavé, Homemade Granola, Blackberry Sorbet',
            priceOrPairing: 'Pairing: Reciotto Della Valpolicella, 2022, Italy',
          },
          {
            name: 'Peach / Elderflower / Yoghurt',
            detail: 'House Elderflower Set Yoghurt, Preserved Peaches, Almond Sponge, Lemon Curd, Raspberry Sorbet',
            priceOrPairing: 'Pairing: Pacherinc Du Vic-Bilh, 2022, Pyrenees, France',
          },
        ],
      },
    ],
  },
  {
    id: 'alacarte',
    title: 'Today’s Main Menu (À La Carte)',
    priceSummary: 'Starters £11–£14 · Mains £25–£43 · Sides All £5 · Desserts £11–£13',
    scheduleNote: 'Wednesday to Saturday · From 12pm (Last orders 8.30pm)',
    pdfPath: '/assets/dom/menus/Main-Menu.pdf',
    sections: [
      {
        heading: 'Starters',
        items: [
          {
            name: 'Pork Croquette',
            detail: 'Sweetcorn Velouté, BBQ Sweetcorn, Wild Mushrooms',
            priceOrPairing: '£12',
          },
          {
            name: 'Duck Liver Parfait',
            detail: 'Macerated Plums, Almond Brittle, Plum Chutney',
            priceOrPairing: '£12',
          },
          {
            name: 'Potato & Leek Dumpling',
            detail: 'Potato Velouté, Blown Wild Rice',
            priceOrPairing: '£11',
          },
          {
            name: 'Barbecued Mackerel & Benoit’s Figs',
            detail: 'Benoit’s Figs, Radish, Hazelnut & Ponzu dressing',
            priceOrPairing: '£11',
          },
          {
            name: 'Twice Baked Cheese Soufflé',
            detail: 'Mushroom Duxelle, Olive Oil, Parmesan Velouté',
            priceOrPairing: '£12',
          },
          {
            name: 'Dill Cured Salmon Dressed in Soy',
            detail: 'Granny Smith Apple, Soy Mayonnaise, Rice Paper & Nori Crisp, Sumac',
            priceOrPairing: '£14',
          },
        ],
      },
      {
        heading: 'Mains & Sides (Sides All £5)',
        items: [
          {
            name: 'BBQ Pork Loin',
            detail: 'Beetroot Relish, Mustard Emulsion, Pork Jus, Crispy Potatoes',
            priceOrPairing: '£30',
          },
          {
            name: 'Poached & Seared Breast of Chicken',
            detail: 'Chicken Croquette, Roasted Cauliflower, Cauliflower Purée, Red Pepper Relish',
            priceOrPairing: '£28',
          },
          {
            name: 'Smoked Salmon Mit-Cuit',
            detail: 'Beurre Blanc, Trout Roe, Wakame, Baby Gem, Pickled Cucumber',
            priceOrPairing: '£29',
          },
          {
            name: 'Charred Aubergine (V)',
            detail: 'Cumin & Aubergine Purée, Golden Raisins, Yeast Sauce, Onion Crisps',
            priceOrPairing: '£25',
          },
          {
            name: 'Seared Venison & Venison Croquette',
            detail: 'Braised Red Cabbage, Caramelised Onions, Apple Purée',
            priceOrPairing: '£32',
          },
          {
            name: 'Ribeye Steak 8oz / Fillet Steak 8oz',
            detail: 'Confit Shallot, Lyonnaise Purée, Pickled Onions (Add Peppercorn Sauce £3)',
            priceOrPairing: '£36 / £43',
          },
        ],
      },
      {
        heading: 'Desserts',
        items: [
          {
            name: 'Beurre Noisette Apples',
            detail: 'Salted Oat Crumble, Apple Sponge, Cinnamon Ice Cream',
            priceOrPairing: '£11',
          },
          {
            name: 'Chocolate Namelaka',
            detail: 'Cocoa Nib Brittle, Vanilla Ice Cream, Hazelnuts',
            priceOrPairing: '£13',
          },
          {
            name: 'Orange Trifle',
            detail: 'Crème Pâtissière, Brown Butter Sponge, Honey Granola, Orange Espuma',
            priceOrPairing: '£13',
          },
          {
            name: 'Lemon Posset & Artisan Cheeses',
            detail: 'Caramelised White Chocolate, Raspberries (£12) | Selection of Artisan Cheeses, Apple & Shallots Chutney (£12)',
            priceOrPairing: '£12',
          },
        ],
      },
    ],
  },
  {
    id: 'lunch',
    title: 'Today’s Lunch Menu',
    priceSummary: 'Two Courses £34 / Three Courses £39 · Sides All £5',
    scheduleNote: 'Wednesday to Saturday Midday Service',
    pdfPath: '/assets/dom/menus/Lunch-Menu.pdf',
    sections: [
      {
        heading: 'Starters',
        items: [
          {
            name: 'Duck Liver Parfait',
            detail: 'Macerated Plums, Almond Brittle, Sour Plum Chutney',
            priceOrPairing: 'Included',
          },
          {
            name: 'Dill Cured Salmon Dressed in Soy',
            detail: 'Granny Smith Apple, Soy Mayonnaise, Rice Paper & Nori Crisp, Sumac',
            priceOrPairing: 'Included',
          },
          {
            name: 'Potato & Leek Dumpling',
            detail: 'Potato Velouté, Blown Wild Rice',
            priceOrPairing: 'Included',
          },
          {
            name: 'Twice Baked Cheese Soufflé',
            detail: 'Tomato Fondue, Olive Oil, Parmesan Velouté',
            priceOrPairing: 'Included',
          },
        ],
      },
      {
        heading: 'Mains & Desserts',
        items: [
          {
            name: 'Barbecued Pork Loin',
            detail: 'Housemade Sauerkraut, Caramelised Apples, Burnt Apple Purée, Pork Crackling',
            priceOrPairing: '2 Courses £34',
          },
          {
            name: 'Poached & Seared Breast of Chicken',
            detail: 'Chicken Croquette, Roasted Cauliflower, Cauliflower Purée, Red Pepper Relish',
            priceOrPairing: '3 Courses £39',
          },
          {
            name: 'Smoked Salmon Mit-Cuit',
            detail: 'Beurre Blanc, Trout Roe, Wakame, Baby Gem, Pickled Cucumber',
            priceOrPairing: 'Included',
          },
          {
            name: 'Charred Aubergine (V)',
            detail: 'Cumin & Aubergine Purée, Golden Raisins, Yeast Sauce, Onion Crisps',
            priceOrPairing: 'Included',
          },
        ],
      },
    ],
  },
  {
    id: 'sunday',
    title: 'Sunday Lunch at DOM',
    priceSummary: 'Set Menu: £49 per person · Family-Style Starters, Roast & Dessert',
    scheduleNote: 'Sundays 12pm to 3.30pm (October to December)',
    pdfPath: '/assets/dom/menus/Sunday-Lunch.pdf',
    sections: [
      {
        heading: 'Starters (Served Family-Style for the Whole Table to Enjoy)',
        items: [
          {
            name: 'Milk Bread, Smalec & Salted Cucumber + House Cured Meats',
            detail: 'Served alongside Duck Liver Parfait with Red Pepper Chutney',
            priceOrPairing: 'Table Share',
          },
          {
            name: 'Homemade Ricotta & Ajoblanco Almond Gazpacho',
            detail: 'Confit Tomatoes, Basil Pesto, Khalkidhiki Greek Olives (Stone In), Celery & Toasted Almonds',
            priceOrPairing: 'Table Share',
          },
        ],
      },
      {
        heading: 'Roasts & Desserts (Set Menu £49 pp)',
        items: [
          {
            name: 'Choice of Sunday Roast',
            detail: 'Roasted Beef Sirloin | Roasted Pork Loin | Roasted Chicken Breast | Forest & Sesame Roast (V,VG)',
            priceOrPairing: 'With Yorkshire Pudding & Trimmings',
          },
          {
            name: 'Sunday Accompaniments',
            detail: 'Roasted Carrot, Yorkshire Pudding, Roast Potatoes, Broccoli, Red Braised Cabbage, Gravy (Extra: Cauliflower Cheese +£5)',
            priceOrPairing: 'Included',
          },
          {
            name: 'Sunday Desserts',
            detail: 'Apple Crumble, Autumn Berries, Vanilla Ice Cream OR Cheese Selection, Chutney, Pickled Grapes, Homemade Crackers',
            priceOrPairing: 'Included',
          },
        ],
      },
    ],
  },
  {
    id: 'nye',
    title: 'New Year’s Eve 2026 Chef’s Tasting Menu',
    priceSummary: '6-Course Tasting Menu £99 pp · Optional Drinks Pairing £85 pp',
    scheduleNote: '31 December 2026 · Evening Service Only',
    pdfPath: '/assets/dom/menus/NYE-Menu.pdf',
    sections: [
      {
        heading: 'New Year’s Eve 2026 Tasting Courses',
        items: [
          {
            name: 'House Made Charcuteries & Milk Bread / Smalec',
            detail: 'Japanese Milk Bread, Pork Smalec, Salted Cucumber & Dill',
            priceOrPairing: 'Pairing: Dear Roe Deer 2024 Sparkling Rosé, Wressle Vineyard, Brigg',
          },
          {
            name: 'Dumpling / Hen of The Woods / Parmesan',
            detail: 'Potato & Wild Mushroom Dumpling, Parmesan Velouté, Blown Wild Rice',
            priceOrPairing: 'Pairing: Sleck Dust Pale Ale, Great Newsome Brewery, Hull',
          },
          {
            name: 'Haddock / Leeks / Bisque',
            detail: 'Poached Haddock Ballantine, Shellfish Bisque, Leek Etuvée, Crispy Prawn',
            priceOrPairing: 'Pairing: Sancerre Silex, Sauvignon Blanc, Paul Thomas 2022',
          },
          {
            name: 'Wellington / Dauphinoise / Béarnaise & Chocolate Pavé',
            detail: 'Beef Wellington, Roasted Carrot, Dauphinoise Potatoes, Braised Red Cabbage, Béarnaise Sauce followed by Chocolate Pavé',
            priceOrPairing: 'Pairing: Los Vascos 2020 Cabernet Sauvignon & Reciotto Della Valpolicella',
          },
        ],
      },
    ],
  },
];

export const REAL_GOOGLE_REVIEWS: RealGoogleReview[] = [
  {
    id: 'rev-verity',
    author: 'Verity Thompson',
    rating: 5,
    text: 'After wanting to visit all year- We finally dined at Restaurant Dom yesterday lunchtime for the set lunch menu. Can honestly say was worth the wait- my husband said it was the best meal he’s had! The restaurant had a lovely atmosphere, the service was seamless- whilst still being warm and welcoming and the food was beautifully presented.',
    source: 'Verified Google Review on restaurantdom.co.uk',
  },
  {
    id: 'rev-nina',
    author: 'Nina Ronson (Nina Nannar)',
    rating: 5,
    text: 'On returning to my hometown I have just enjoyed an exquisite lunch at this restaurant. Every course was absolutely beautiful. The service was fantastic and I literally can’t wait to come back again, utterly delicious.',
    source: 'Verified Google Review on restaurantdom.co.uk',
  },
  {
    id: 'rev-vivienne',
    author: 'Vivienne Bee',
    rating: 5,
    text: 'Our experience at DOM was exceptional. We received a warm welcome and enjoyed the friendly relaxed atmosphere. The restaurant interior is sophisticated and comfortable and the menu is inventive and enticing. All staff displayed great knowledge around each individual dish and ingredients.',
    source: 'Verified Google Review on restaurantdom.co.uk',
  },
  {
    id: 'rev-mike',
    author: 'Mike Cavanagh',
    rating: 5,
    text: 'Outstanding good. 10 courses of absolute heaven.',
    source: 'Verified Google Review on restaurantdom.co.uk',
  },
];

export function validateReservationForm(input: BookingInput): BookingValidationResult {
  const errors: Record<string, string> = {};

  if (!input.serviceId || !SERVICE_OPTIONS.some((s) => s.id === input.serviceId)) {
    errors.serviceId = 'Please select a dining menu.';
  }
  if (!input.date || input.date.trim().length === 0) {
    errors.date = 'Please choose a reservation date.';
  }
  if (!input.timeSlot || input.timeSlot.trim().length === 0) {
    errors.timeSlot = 'Please select a seating time.';
  }
  if (!Number.isFinite(input.guests) || input.guests < 1 || input.guests > 40) {
    errors.guests = 'Party size must be between 1 and 40 guests.';
  }
  if (!input.guestName || input.guestName.trim().length < 2) {
    errors.guestName = 'Please enter your full name.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.guestEmail || !emailRegex.test(input.guestEmail.trim())) {
    errors.guestEmail = 'Please enter a valid email address for confirmation.';
  }
  const cleanedPhone = (input.guestPhone || '').replace(/[\s\-()]/g, '');
  if (cleanedPhone.length < 7 || !/^\+?[0-9]{7,15}$/.test(cleanedPhone)) {
    errors.guestPhone = 'Please enter a valid UK contact number.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createBookingRecord(input: BookingInput, sequenceNumber = 104): ConfirmedBooking {
  const service =
    SERVICE_OPTIONS.find((item) => item.id === input.serviceId) ?? SERVICE_OPTIONS[0];
  const pairingAddOn = input.drinksPairing ? 65 * input.guests : 0;
  const estimatedValue = Math.round(service.pricePerGuest * input.guests + pairingAddOn);
  const referenceCode = `DOM-${sequenceNumber}-${input.timeSlot.replace(':', '')}`;

  return {
    ...input,
    referenceCode,
    serviceTitle: service.title,
    estimatedValue,
    createdAt: 'Just now',
  };
}

export function evaluateReviewFunnel(rating: number): ReviewFunnelDecision {
  const clamped = Math.max(1, Math.min(5, Math.round(rating)));

  if (clamped >= 4) {
    return {
      rating: clamped,
      route: 'public_syndication',
      headline: `${clamped}-Star Diner Experience — Direct to Google Reviews & Trustindex`,
      explanation:
        'Two hours after their table closes on Toast POS, 4–5★ guests receive an automatic SMS/email link that opens Restaurant DOM’s Google Review card in one tap — compounding the verified Google reviews shown on restaurantdom.co.uk.',
      recipient: 'Google Business Profile (Scunthorpe) & Trustindex Feed',
      platforms: ['Google Maps (Scunthorpe)', 'MICHELIN Guide Diner Shares', 'Instagram (@restaurant_dom)'],
      seoImpactNote:
        'Strengthens Map Pack ranking for "fine dining Scunthorpe", "Sunday lunch North Lincolnshire", and "tasting menu DN15".',
    };
  }

  return {
    rating: clamped,
    route: 'private_gm_desk',
    headline: `${clamped}-Star Feedback — Privately Routed to General Manager Benoit Lamaudiere`,
    explanation:
      'If a guest selects 1 to 3 stars, the funnel intercepts the note privately before it reaches public review sites and alerts General Manager Benoit Lamaudiere (info@restaurantdom.co.uk) so the team can resolve it personally.',
      recipient: 'Benoit Lamaudiere — General Manager (info@restaurantdom.co.uk)',
      platforms: ['Private GM Hospitality Recovery Desk'],
      seoImpactNote:
        'Protects Restaurant DOM’s 5.0★ Google & Michelin reputation while turning any issue into a loyal return guest.',
  };
}

export function calculateRevenueImpact(input: RevenueSimulatorInput): RevenueSimulatorOutput {
  const visitors = Math.max(200, Math.min(25000, input.monthlyVisitors));
  const coverSpend = Math.max(25, Math.min(180, input.avgCoverSpend));
  const partySize = Math.max(1, Math.min(12, input.avgPartySize));
  const cateringLeads = Math.max(1, Math.min(60, input.monthlyCateringInquiries));

  const recoveredTableBookings = Math.max(8, Math.round(visitors * 0.0165));
  const recoveredCateringBookings = Math.max(1, Math.round(cateringLeads * 0.38));
  const totalRecoveredBookings = recoveredTableBookings + recoveredCateringBookings;

  const avgTableValue = coverSpend * partySize;
  const avgCateringValue = Math.max(420, coverSpend * 9);

  const monthlyRecoveredRevenueGbp = Math.round(
    recoveredTableBookings * avgTableValue +
      recoveredCateringBookings * avgCateringValue * 0.35
  );

  return {
    legacyScore: 44,
    upgradedScore: 96,
    legacyLoadSeconds: 4.8,
    upgradedLoadSeconds: 0.9,
    recoveredTableBookings,
    recoveredCateringBookings,
    totalRecoveredBookings,
    monthlyRecoveredRevenueGbp,
    annualRecoveredRevenueGbp: monthlyRecoveredRevenueGbp * 12,
  };
}

export function buildAiSearchSchema(): string {
  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Restaurant DOM',
    legalName: 'Restaurant DOM Ltd (Company No. 14480146)',
    description:
      'DOM means ‘home’ in Polish. Featured in the MICHELIN Guide 2026. Zero-waste Lincolnshire seasonal dining by Chef Patron Sławek Mikołajczyk, Maryiana & General Manager Benoit Lamaudiere in Scunthorpe.',
    url: 'https://www.restaurantdom.co.uk/',
    sameAs: [
      'https://guide.michelin.com/gb/en/north-lincolnshire/scunthorpe_1742628/restaurant/restaurant-dom',
      'https://www.instagram.com/restaurant_dom/',
    ],
    telephone: '+44 1724 506816',
    email: 'info@restaurantdom.co.uk',
    priceRange: '£££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7-9 Robert Street',
      addressLocality: 'Scunthorpe',
      addressRegion: 'North Lincolnshire',
      postalCode: 'DN15 6LU',
      addressCountry: 'GB',
    },
    hasMenu: [
      {
        '@type': 'Menu',
        name: "Chef's Tasting Menu (8 Courses £79 / Extended 10 Courses £95)",
        hasMenuItem: [
          { '@type': 'MenuItem', name: 'Barbecued Mackerel, Benoit’s Figs, Radish, Hazelnut & Ponzu dressing' },
          { '@type': 'MenuItem', name: 'Potato & Leek Dumpling, Potato Velouté, Blown Wild Rice' },
          { '@type': 'MenuItem', name: 'Duck Liver Parfait, Macerated Plums, Almond Brittle' },
        ],
      },
      {
        '@type': 'Menu',
        name: "Today's Lunch Menu (Two Courses £34 / Three Courses £39)",
      },
      {
        '@type': 'Menu',
        name: 'Sunday Lunch at DOM (Set Menu £49 per person)',
      },
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: 'https://tables.toasttab.com/restaurants/9db9a2cb-5353-4456-a730-7c2a12caa479/reserve',
    },
  };

  return JSON.stringify(schemaObj, null, 2);
}
