export type OverdriveResponse = {
  totalItems: number;
  queryKeys: QueryKeys;
  facets?: Facets;
  sortOptions: SortOption[];
  items: OverdriveItem[];
  links: Links;
  totalItemsText: string;
};

type Facets = {
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
};

type AddedDates = {
  items: AddedDatesItem[];
  name: string;
};

type AddedDatesItem = {
  isApplied: boolean;
  totalItemsText: string;
  id: string;
  name: string;
  totalItems?: number;
};

type OverdriveItem = {
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
};

type Bisac = {
  description: string;
  code: string;
};

type Constraints = {
  isDisneyEulaRequired: boolean;
};

type Covers = {
  cover150Wide: Cover0Wide;
  cover300Wide: Cover0Wide;
  cover510Wide: Cover0Wide;
};

type Cover0Wide = {
  primaryColor: PrimaryColor;
  width: number;
  height: number;
  href: string;
};

type PrimaryColor = {
  rgb: RGB;
  hex: string;
};

type RGB = {
  blue: number;
  green: number;
  red: number;
};

type Creator = {
  id: number;
  sortName: string;
  role: string;
  name: string;
};

type Format = {
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
};

type Identifier = {
  value: string;
  type: string;
};

type Sample = {
  href: string;
};

type Imprint = {
  name: string;
  id: string;
};

type Ratings = {
  maturityLevel: Imprint;
  naughtyScore: Imprint;
};

type ReviewCounts = {
  publisherSupplier: number;
  premium: number;
};

type Links = {
  self: First;
  first: First;
  last: First;
};

type First = {
  page: number;
  pageText: string;
};

type QueryKeys = {};

type SortOption = {
  isApplied: boolean;
  id: string;
  name: string;
};
