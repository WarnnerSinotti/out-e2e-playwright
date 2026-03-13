import { type Page } from "@playwright/test";

export interface AssertionGlobalInterface {
  url(page: Page, url: string): Promise<void>;
}

export const assertionGlobal: AssertionGlobalInterface = {
  async url(page: Page, url: string): Promise<void> {
    await page.waitForURL(new RegExp(url));
  },
};
