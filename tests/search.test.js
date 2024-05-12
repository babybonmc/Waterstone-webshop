const { Builder } = require("selenium-webdriver");
const Homepage = require("./pageobjects/homePage");
require("chromedriver");

const TIMEOUT = 5000;

describe("Filter menu", () => {
  let driver;
  let homepage;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();
    driver.manage().setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });

    homepage = new Homepage(driver);
    await homepage.openUrl();
    await homepage.agreeWithCookies();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Homepage opens successfully", async () => {
    await homepage.verifyPageTitleContains("Waterstones");
  });
});
