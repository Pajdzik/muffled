const debug = true;

export const logDebug = (text: string) => {
  if (debug) {
    console.debug(text);
  }
};
