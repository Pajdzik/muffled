import { logDebug } from "./debug.js";

const API_BASE = "https://thunder.api.overdrive.com/v2";
const BOOK_FORMAT_QUERY =
  "format=ebook-overdrive,ebook-media-do,ebook-overdrive-provisional,audiobook-overdrive,audiobook-overdrive-provisional,magazine-overdrive";
const FAUCET_QUERY = "includeFacets=false";
const PER_PAGE_QUERY = "perPage=24";
const PAGE_QUERY = "page=1";
const CLIENT_ID_QUERY = "x-client-id=dewey";
const ADDITIONAL_QUERIES = `${BOOK_FORMAT_QUERY}&${FAUCET_QUERY}&${PER_PAGE_QUERY}&${PAGE_QUERY}&${CLIENT_ID_QUERY}`;

export const OVERDRIVE_HEADERS: HeadersInit = {
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
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

const queryOverdrive = async (input: RequestInfo | URL): Promise<Response> => {
  console.log(`URL: ${input}`);
  console.log(`headers: ${JSON.stringify(OVERDRIVE_HEADERS, undefined, 2)}`);

  return fetch(input, OVERDRIVE_HEADERS);
};

export const queryOverdriveApi = async (
  path: string,
  query?: string,
  includeAdditionalQueries?: boolean
): Promise<Response> => {
  logDebug(`Querying Overdrive API: ${path}`);

  const queries = [];
  if (query) {
    queries.push(query);
  }
  if (includeAdditionalQueries) {
    queries.push(ADDITIONAL_QUERIES);
  }

  const queryContent = (queries.length > 0) ? queries.join("&") : undefined;
  const querySegment = queryContent ? `?${queryContent}` : "";

  const url = `${API_BASE}/${path}${querySegment}`;

  return queryOverdrive(url);
};
