import browser from "webextension-polyfill";

import { Book, TitleAvailability } from "./book.js";

export type BackgroundMessage =
  | {
      data: "parseBook";
      book: Book;
    }
  | never;

export type BackgroundResponse<TMessage extends BackgroundMessage> = TMessage extends BackgroundMessage
  ? TitleAvailability | undefined
  : never;

export type ContentMessage =
  | {
      data: "detectListing";
    }
  | never;

export type ContentResponse<TMessage extends ContentMessage> = TMessage extends ContentMessage ? boolean : never;

type Message = BackgroundMessage | ContentMessage;
type MessageHandler<TMessage extends Message> = (message: TMessage) => Promise<any>;
const addMessageListener = <TMessage extends Message>(handler: MessageHandler<TMessage>) => {
  browser.runtime.onMessage.addListener(handler);
};

export const addBackgroundListener = addMessageListener<BackgroundMessage>;
export const addContentListener = addMessageListener<ContentMessage>;

export const sendMessageToBackgroundScript = (
  message: BackgroundMessage
): Promise<BackgroundResponse<BackgroundMessage>> => {
  return browser.runtime.sendMessage(message);
};

export const sendMessageToContentScript = (
  tabId: number,
  message: ContentMessage
): Promise<ContentResponse<ContentMessage>> => {
  return browser.tabs.sendMessage(tabId, message);
};
