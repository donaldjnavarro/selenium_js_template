/**
 * Custom utilities developed for this project
 */

import { config } from 'dotenv';
import process from 'process';
config({ path: './.env' })

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
    'CHROME'
}
