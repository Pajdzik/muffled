const Levels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

type Level = keyof typeof Levels;
export const LOG_LEVEL: Level = "info";

const log = (level: Level, text: string): void => {
  if (Levels[LOG_LEVEL] <= Levels[level]) {
    console.log(`[Aulibby - ${level}]\t${text}`);
  }
};

export const logDebug = (text: string): void => {
  log("debug", text);
};
export const logInfo = (text: string): void => {
  log("info", text);
};
export const logWarn = (text: string): void => {
  log("warn", text);
};
export const logError = (text: string): void => {
  log("error", text);
};
