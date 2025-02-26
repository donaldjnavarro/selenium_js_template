const { assert } = require('console');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
require('dotenv').config({ path: './.env' });
const { startBrowser } = require('./utilities.ts')

/** Test: Wikipedia website */
;(async function wikipedia_website() {
  const driver = await startBrowser()
  try {
    await driver.get('https://www.wikipedia.org/')
    await driver.findElement(By.xpath('//input[@name = \'search\']')).sendKeys('webdriver', Key.RETURN)
    await driver.wait(until.titleIs('Selenium (software) - Wikipedia'), 2000)
    assert(await driver.getTitle() === 'Selenium (software) - Wikipedia')
  } finally {
    await driver.quit()
  }
})()

/** Test: Selenium website */
;(async function selenium_website() {  
  let driver;
  try {
    driver = await startBrowser()
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
  
    assert(await driver.getTitle() === 'Web form')
  
    await driver.manage().setTimeouts({implicit: 500});
  
    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));
  
    await textBox.sendKeys('Selenium');
    await submitButton.click();
  
    let message = await driver.findElement(By.id('message'));
    assert(await message.getText() === 'Received!');
  } catch (e) {
    console.log(e)
  } finally {
    await driver.quit();
  }
}())
