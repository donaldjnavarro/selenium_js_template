/**
 * Custom utilities developed for this project
 */

import { config } from 'dotenv';
import process from 'process';
config({ path: './.env' });
import { Builder, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
const VALID_BROWSERS = Object.values(Browser)
  .map(b => b
    .toUpperCase()
    .replace(/\s+/g, '_')
  );

/**
 * Configure the current browser in the .env file
 * Default to Chrome
 * Standardize to upper case
 *
 * @returns {string} Name of the browser to be used
 */
export function getBrowser () {
  const browser = process.env.BROWSER?.toUpperCase();

  if (!browser) {
    throw new Error(
      `Missing BROWSER variable from .env - Must be one of: ${VALID_BROWSERS.join(', ')}`
    );
  }

  if (!VALID_BROWSERS.includes(browser)) {
    throw new Error(
      `Invalid value BROWSER=${browser} in .env - Must be one of: ${VALID_BROWSERS.join(', ')}`
    );
  }
  return browser;
}

export async function startBrowser (browserName = getBrowser()) {
   try {
    console.debug(`Attempting to launch browser: ${browserName}`);
    switch (browserName) {
      case 'CHROME': {
        /** Set Chrome-specific options */
        const options = new chrome.Options();
        if (process.env.HEADLESS?.toLowerCase() === 'true') {
          options.addArguments('headless');
        }
        /** Start the browser instance */
        return await new Builder()
          .forBrowser(Browser[browserName])
          .setChromeOptions(options)
          .build();
      }
      default:
        /** Start the browser instance based on generic configurations */
        return await new Builder()
          .forBrowser(Browser[browserName])
          .build();
    }
  } catch (err) {
    throw new Error(`Error while launching browser '${browserName}': ${err}`);
  }
}
