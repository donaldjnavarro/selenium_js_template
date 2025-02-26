/**
 * Custom utilities developed for this project
 */

import { config } from 'dotenv';
import process from 'process';
config({ path: './.env' });
import { Builder, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

/**
 * Configure the current browser in the .env file
 * Default to Chrome
 * Standardize to upper case
 * 
 * @returns {string} Name of the browser to be used
 */
export function getBrowser () {
  return process.env.BROWSER ?
    process.env.BROWSER.toUpperCase() :
    'CHROME';
}

export async function startBrowser (browserName = getBrowser()) {
  switch (browserName) {
    case 'CHROME': {
      /** Set Chrome-specific options */
      const options = new chrome.Options();
      if (process.env.HEADLESS?.toLowerCase() === 'true') {
        options.addArguments('headless');
      }
      /** Start the browser instance */
      return await new Builder()
        .forBrowser(Browser[getBrowser()])
        .setChromeOptions(options)
        .build();
    }
    default:
      /** Start the browser instance based on generic configurations */
      return await new Builder()
        .forBrowser(Browser[getBrowser()])
        .build();
  }
}
