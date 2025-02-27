/**
 * Example test
 * 
 * @module example
 */
import { assert } from 'console';
import { By, Key, until } from 'selenium-webdriver';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { startBrowser } from './utilities.mjs';

/** Test: Wikipedia website */
;(async function wikipedia_website() {
  const driver = await startBrowser();
  try {
    await driver.get('https://www.wikipedia.org/');
    await driver.findElement(By.xpath('//input[@name = \'search\']')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('Selenium (software) - Wikipedia'), 2000);
    assert(await driver.getTitle() === 'Selenium (software) - Wikipedia');
  } finally {
    await driver.quit();
  }
})()

/** Test: Selenium website */
;(async function selenium_website() {  
  let driver;
  try {
    driver = await startBrowser();
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
  
    assert(await driver.getTitle() === 'Web form');
  
    await driver.manage().setTimeouts({implicit: 500});
  
    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));
  
    await textBox.sendKeys('Selenium');
    await submitButton.click();
  
    let message = await driver.findElement(By.id('message'));
    assert(await message.getText() === 'Received!');
  } catch (e) {
    console.log(e);
  } finally {
    await driver?.quit();
  }
}());
