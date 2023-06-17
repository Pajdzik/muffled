const Levels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

type Level = keyof typeof Levels;
const currentLevel: Level = "debug";

const log = (level: Level, text: string) => {
  if (Levels[currentLevel] <= Levels[level]) {
    console.log(`[Aulibby - ${level}]\t${text}`);
  }
};

export const logDebug = (text: string) => { log("debug", text); };
export const logInfo = (text: string) => { log("info", text); };
export const logWarn = (text: string) => { log("warn", text); };
export const logError = (text: string) => { log("error", text); };
