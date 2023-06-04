// https://thunder.api.overdrive.com/v2/libraries/spl/media?query=Allergic%20Theresa%20MacPhail&format=ebook-overdrive,ebook-media-do,ebook-overdrive-provisional,audiobook-overdrive,audiobook-overdrive-provisional,magazine-overdrive&perPage=24&page=1&x-client-id=dewey

import { Book } from "./types.js";

const API_BASE = "https://thunder.api.overdrive.com/v2";
const BOOK_FORMAT_QUERY =
  "format=ebook-overdrive,ebook-media-do,ebook-overdrive-provisional,audiobook-overdrive,audiobook-overdrive-provisional,magazine-overdrive";
const CLIENT_ID_QUERY = "x-client-id=dewey";

const OVERDRIVE_HEADERS: HeadersInit = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-US",
  Connection: "keep-alive",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
};

const queryOverdrive = (input: RequestInfo | URL): Promise<Response> => {
  console.log(`URL: ${input}`);
  console.log(`headers: ${JSON.stringify(OVERDRIVE_HEADERS, undefined, 2)}`);

  return fetch(input, OVERDRIVE_HEADERS);
};

export const queryLibrary = async (library: string, book: Book) => {
  const httpResponse = await queryOverdriveApi(library, book);
  const overdriveResponse: Overdrive = await httpResponse.json();
  return overdriveResponse;
};

const queryOverdriveApi = async (
  library: string,
  book: Book
): Promise<Response> => {
  const resource = `libraries/${library}/media`;
  const bookQuery = `query=${encodeBookData(book)}`;
  const url = `${API_BASE}/${resource}?${bookQuery}&${BOOK_FORMAT_QUERY}&${CLIENT_ID_QUERY}`;

  return queryOverdrive(url);
};

const encodeBookData = (book: Book) =>
  encodeURIComponent(flattenBookData(book));

const flattenBookData = (book: Book): string => {
  if (book.author && book.title) {
    return `${book.title}  ${book.author}`;
  } else if (book.author) {
    return book.author;
  } else if (book.title) {
    return book.title;
  }

  throw new Error("Empty book data");
};

type Overdrive = {
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
