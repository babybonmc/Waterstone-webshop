const { until } = require("selenium-webdriver");

const DEFAULT_TIMEOUT = 5000;

module.exports = class Page {
  constructor(driver) {
    this.driver = driver;
  }

  async openUrl(url) {
    await this.driver.get(url);
  }

  async sleep(milliSeconds) {
    await this.driver.sleep(milliSeconds);
  }

  async findAndClick(locator) {
    const element = await this.driver.findElement(locator);
    await element.click();
  }

  async click(element) {
    await element.click();
  }

  async getElement(locator) {
    return await this.driver.findElement(locator);
  }

  async getElements(locator) {
    return await this.driver.findElements(locator);
  }

  async getElementText(locator) {
    const element = await this.driver.findElement(locator);
    return await element.getText();
  }

  async sendText(locator, text) {
    const element = await this.driver.findElement(locator);
    await element.click();
    await element.sendKeys(text);
  }

  async hoverOverElement(element) {
    const actions = this.driver.actions({ async: true });
    await actions.move({ origin: element }).perform();
  }

  async waitUntilElementText(locator, text) {
    const element = await this.driver.findElement(locator);
    await this.driver.wait(until.elementTextIs(element, text), DEFAULT_TIMEOUT);
  }

  async waitUntilElementVisible(locator, timeout = DEFAULT_TIMEOUT) {
    await this.driver.wait(
      until.elementLocated(locator),
      timeout,
      `Timeout waiting for element located by ${locator}`
    );
    const element = await this.driver.findElement(locator);
    await this.driver.wait(
      until.elementIsVisible(element),
      timeout,
      `Timeout waiting for element to be visible`
    );
  }
};
