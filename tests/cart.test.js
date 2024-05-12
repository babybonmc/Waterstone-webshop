const Page = require("./basePage");
const CartPage = require("./cartPage");
const { By } = require("selenium-webdriver");

const TIMEOUT = 5000;
const baseUrl = "https://www.waterstones.com/";

// Commonly used selectors
const selectors = {
  cookieButton: By.css("#onetrust-button-group > #onetrust-accept-btn-handler"),
  pageTitleElement: By.css("#main-logos > div > a.logo"),
  searchField: By.className("input input-search"),
  searchButton: By.className("input-search-button icon"),
  searchResultKeyword: By.className("search-result-tab-all"),
  searchResultImg: By.css("div.book-thumb > div > a > img"),
  searchResultBasket: By.className("button-buy button button-teal button-small"),
  cartButton: By.css("a.basket > strong"),
};

module.exports = class HomePage extends Page {
  async openUrl() {
    await super.openUrl(baseUrl);
  }

  async agreeWithCookies() {
    await super.sleep(TIMEOUT);
    await super.findAndClick(selectors.cookieButton);
  }

  async verifyPageTitleContains(text) {
    const pageTitle = await super.getElementText(selectors.pageTitleElement);
    expect(pageTitle).toBe(text);
  }

  async searchForText(text) {
    await super.sendText(selectors.searchField, text);
    await super.findAndClick(selectors.searchButton);
  }

  async hoverOverProduct(elementNum) {
    const imageElements = await super.getElements(selectors.searchResultImg);
    await super.hoverOverElement(imageElements[elementNum - 1]);
  }

  async verifySearchResultCount(searchAmount) {
    const searchCount = await super.getElementText(selectors.searchResultKeyword);
    const searchCountNum = searchCount.replaceAll(/\D+/g, "");
    expect(parseInt(searchCountNum)).toBeGreaterThan(searchAmount);
  }

  async addProductToCart(elementNum) {
    const basketElem = await super.getElements(selectors.searchResultBasket);
    await super.click(basketElem[elementNum - 1]);
  }

  async verifyProductIsAddedToBasket(elementNumber) {
    await super.waitUntilElementText(selectors.cartButton, elementNumber.toString());
  }

  async goToShoppingCart() {
    await super.waitUntilElementVisible(selectors.cartButton);
    await super.findAndClick(selectors.cartButton);
    return new CartPage(super.getDriver());
  }
};
