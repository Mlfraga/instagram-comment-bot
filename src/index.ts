import puppeteer from 'puppeteer';

import * as dotenv from "dotenv";

dotenv.config();

(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage();
  await page.goto('https://instagram.com/accounts/login', { waitUntil: 'networkidle2' });

  await page.waitFor(1000);

  await page.type('[name=username]', String(process.env.LOGIN), { delay: 50 });
  await page.type('[name=password]', String(process.env.PASSWORD), { delay: 50 });

  await page.click('button[type="submit"]');

  await page.waitFor(3000);

  await page.goto('https://www.instagram.com/p/CFSFOF-laiP/');

  let comments = 0;

  let error = false;

  while (error === false) {
    await page.type('textarea[aria-label="Adicione um comentário..."]', "@eululu_", { delay: 150 });

    let publishButton = await page.$x('//button[contains(text(), "Publicar")]');


    let [tryAgainButton, ...rest] = await page.$x('//button[contains(text(), "Tentar novamente")]');

    if (!tryAgainButton) {
      comments++;

      const buttonClickResponse = await publishButton[0].click();

      let [secoundTryAgainButton, ...rest] = await page.$x('//button[contains(text(), "Tentar novamente")]');

      if (!secoundTryAgainButton) {
        console.log(`${comments} ${tryAgainButton} ${buttonClickResponse}`);
      }
    } else {
      setTimeout(pollDOM, 10000);
    }
  }

  // await page.waitFor(3000);

})();

function pollDOM() {
  console.log('esperando');
}