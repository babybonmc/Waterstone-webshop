const Page = require("./basePage");
const { By } = require("selenium-webdriver");

const selectors = {
  cartItemPrices: By.className("lblTotalItem lblTotalItemCost"),
  cartTotalSum: By.css(
    "body > div.row.chk-surround.large-min-height > div.large-6.chk-right.columns.show-for-large > div > div > div.float-left.position-relative.full-width.large-margin-top-24 > div > div.row.panel-total-to-pay > div.large-11.columns.large-padding-top-8.large-border-dotted-top.large-padding-left-0 > div > p > span"
  ),
  cartFirstItem: By.css(
    "body > div.row.chk-surround.large-min-height > div.small-24.chk-left.medium-24.large-18.columns.main-container > div.panel-basket.panel-content-basket > div > ul > li:nth-child(1) > div > div.panel-basket-item > div.small-19.medium-12.columns.medium-margin-left-4.small-padding-left-0.small-padding-right-0 > ul > li:nth-child(2) > a"
  ),
  cartItemCount: By.css(
    "body > div.row.chk-surround.large-min-height > div.large-6.chk-right.columns.show-for-large > div > div > div.float-left.position-relative.full-width.large-margin-top-24 > div > div:nth-child(2) > div > p > a > span.lblBasketQuantity"
  ),
};

module.exports = class CartPage extends Page {
  async verifyCartSumIsCorrect(expectedSum) {
    const itemPrices = await super.getElements(selectors.cartItemPrices);

    let itemsSum = 0;
    for (const item of itemPrices) {
      const priceText = await item.getText();
      itemsSum += parseFloat(priceText.replace(/£/g, ""));
    }

    const basketSumText = await super.getElementText(selectors.cartTotalSum);
    const basketSumNum = parseFloat(basketSumText.replace(/£/g, ""));

    expect(basketSumNum).toBe(expectedSum);
  }

  async removeFirstItemFromCart() {
    await super.findAndClick(selectors.cartFirstItem);
  }

  async verifyCartHasItems(expectedItemCount) {
    await super.waitUntilElementText(selectors.cartItemCount, expectedItemCount.toString());
  }
};
