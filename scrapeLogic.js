const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  // res.send("hello from scrapeLogic");
  const browser = await puppeteer.launch({
    executablePath: process.env.NODE_ENV === 'production' 
    ? process.env.PUPPETEER_EXECUTABLE_PATH
    : puppeteer.executablePath(),
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--single-process",
      "--no-zygote",

    ]
  });
  try {
    const page = await browser.newPage();
    //  throw new Error("whoops!");
    await page.goto('https://developer.chrome.com/');

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    await page.type('.search-box__input', 'automate beyond recorder');

    // Wait and click on first result
    const searchResultSelector = '.search-box__link';
    await page.waitForSelector(searchResultSelector, { timeout: 60000 });
    await page.click(searchResultSelector);

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
      'text/Customize and automate'
    );
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title
    const logStatement = `The title of this blog post is  ${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`something went wrong while running puppeteer :${e}`);
  }
  finally {
    await browser.close();
  }
}

module.exports = { scrapeLogic };