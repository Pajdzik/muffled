export async function isAudibleActive(): Promise<any> {
  const currentTab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  return currentTab;

  return false;
}
