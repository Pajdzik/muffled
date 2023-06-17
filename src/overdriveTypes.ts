export interface OverdriveResponse {
  totalItems: number;
  queryKeys: Record<string, string>;
  facets?: Facets;
  sortOptions: SortOption[];
  items: OverdriveItem[];
  links: Links;
  totalItemsText: string;
}

interface Facets {
  appliedCount: number;
  availability: AddedDates;
  mediaTypes: AddedDates;
  formats: AddedDates;
  maturityLevels: AddedDates;
  subjects: AddedDates;
  bisacCodes: AddedDates;
  languages: AddedDates;
  boolean: AddedDates;
  addedDates: AddedDates;
  atosLevels: AddedDates;
  lexileScores: AddedDates;
  interestLevels: AddedDates;
  gradeLevels: AddedDates;
  awards: AddedDates;
  jurisdiction: AddedDates;
  practiceArea: AddedDates;
  classification: AddedDates;
  audiobookDuration: AddedDates;
}

interface AddedDates {
  items: AddedDatesItem[];
  name: string;
}

interface AddedDatesItem {
  isApplied: boolean;
  totalItemsText: string;
  id: string;
  name: string;
  totalItems?: number;
}

interface OverdriveItem {
  isAvailable: boolean;
  isPreReleaseTitle: boolean;
  isFastlane: boolean;
  isRecommendableToLibrary: boolean;
  isOwned: boolean;
  isHoldable: boolean;
  isAdvantageFiltered: boolean;
  visitorEligible: boolean;
  juvenileEligible: boolean;
  youngAdultEligible: boolean;
  firstCreatorId: number;
  isBundledChild: boolean;
  subjects: Imprint[];
  bisacCodes: string[];
  bisac: Bisac[];
  levels: any[];
  creators: Creator[];
  languages: Imprint[];
  imprint?: Imprint;
  ratings: Ratings;
  reviewCounts: ReviewCounts;
  constraints: Constraints;
  sample: Sample;
  publisher: Imprint;
  type: Imprint;
  covers: Covers;
  formats: Format[];
  publisherAccount: Imprint;
  estimatedReleaseDate: Date;
  subtitle: string;
  description: string;
  availableCopies: number;
  ownedCopies: number;
  luckyDayAvailableCopies: number;
  luckyDayOwnedCopies: number;
  holdsCount: number;
  holdsRatio: number;
  estimatedWaitDays: number;
  availabilityType: string;
  id: string;
  firstCreatorName: string;
  firstCreatorSortName: string;
  title: string;
  sortTitle: string;
  publishDate: Date;
  publishDateText: string;
  reserveId: string;
  starRating?: number;
  starRatingCount?: number;
  edition?: string;
}

interface Bisac {
  description: string;
  code: string;
}

interface Constraints {
  isDisneyEulaRequired: boolean;
}

interface Covers {
  cover150Wide: Cover0Wide;
  cover300Wide: Cover0Wide;
  cover510Wide: Cover0Wide;
}

interface Cover0Wide {
  primaryColor: PrimaryColor;
  width: number;
  height: number;
  href: string;
}

interface PrimaryColor {
  rgb: RGB;
  hex: string;
}

interface RGB {
  blue: number;
  green: number;
  red: number;
}

interface Creator {
  id: number;
  sortName: string;
  role: string;
  name: string;
}

interface Format {
  isBundleParent: boolean;
  hasAudioSynchronizedText: boolean;
  identifiers: Identifier[];
  rights: any[];
  bundledContent: any[];
  id: string;
  name: string;
  onSaleDateUtc: Date;
  fulfillmentType: string;
  sample?: Sample;
  isbn?: string;
  fileSize?: number;
  duration?: string;
  partCount?: number;
}

interface Identifier {
  value: string;
  type: string;
}

interface Sample {
  href: string;
}

interface Imprint {
  name: string;
  id: string;
}

interface Ratings {
  maturityLevel: Imprint;
  naughtyScore: Imprint;
}

interface ReviewCounts {
  publisherSupplier: number;
  premium: number;
}

interface Links {
  self: First;
  first: First;
  last: First;
}

interface First {
  page: number;
  pageText: string;
}

interface SortOption {
  isApplied: boolean;
  id: string;
  name: string;
}
