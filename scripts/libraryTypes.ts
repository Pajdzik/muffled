export type LibrarySearchResult = {
  totalItems: number;
  items: Library[];
  links: LibrarySearchResultLinks;
  totalItemsText: string;
};

export type LibrarySummary = {
  name: string;
  id: string;
};

export type Library = {
  recommendToLibraryEnabled: boolean;
  lastModifiedDate: Date;
  allowAnonymousSampling: boolean;
  allowDeepSearch: boolean;
  isDemo: boolean;
  areLuckyDayTitlesAllocated: boolean;
  canAddLibrariesInSora: boolean;
  isLuckyDayEnabled: boolean;
  isLexisNexis: boolean;
  isAuroraEnabled: boolean;
  isInstantAccessEnabled: boolean;
  hasAdvantageAccounts: boolean;
  isAutocompleteEnabled: boolean;
  allowRecommendToLibrary: boolean;
  isConsortium: boolean;
  accessId: number;
  websiteId: number;
  accounts: number[];
  settings: ItemSettings;
  links: ItemLinks;
  messages: Message[];
  defaultLanguage: Language;
  supportedLanguages: Language[];
  enabledPlatforms: EnabledPlatform[];
  visitableLibraries: number[];
  parentCRAccessId?: number;
  showcaseTarget: ShowcaseTarget;
  type: Type;
  status: Status;
  name: string;
  fulfillmentId: string;
  visitorKey: string;
  preferredKey: string;
  id: string;
  mergedWebsiteId?: number;
  mergedLibraryKey?: string;
};

export type Language = {
  languageCodes: string[];
  defaultLanguageCode: string;
  nativeDisplayName: string;
  displayName: string;
};

export type EnabledPlatform = "lightning" | "libby" | "dlr";

export type ItemLinks = {
  librarySupportUrl?: CardAcquisitionURL;
  pinterest?: CardAcquisitionURL;
  twitter?: CardAcquisitionURL;
  libraryHome?: CardAcquisitionURL;
  cardAcquisitionUrl?: CardAcquisitionURL;
  facebook?: CardAcquisitionURL;
  youTube?: CardAcquisitionURL;
  librarySupportEmail?: CardAcquisitionURL;
};

export type CardAcquisitionURL = {
  href: string;
};

export type Message = {
  messageId: number;
  settings: MessageSettings;
  message: string;
};

export type MessageSettings = {
  sampleSiteOnly: boolean;
};

export type ItemSettings = {
  primaryColor?: AryColor;
  secondaryColor?: AryColor;
  logo140X60?: CardAcquisitionURL;
  cookieSetting: CookieSetting;
};

export type CookieSetting = "Never" | "Always";

export type AryColor = {
  rgb: RGB;
  hex: string;
};

export type RGB = {
  blue: number;
  green: number;
  red: number;
};

export type ShowcaseTarget = "default";

export type Status = "Live" | "Terminated" | "Merged";

export type Type = "DLR";

export type LibrarySearchResultLinks = {
  self: First;
  first: First;
  last: First;
  next: First;
};

export type First = {
  page: number;
  pageText: string;
};
