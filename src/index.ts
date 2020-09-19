import puppeteer from 'puppeteer';

import * as dotenv from "dotenv";

dotenv.config();

(async () => {
  const browser = await puppeteer.launch({ headless: false })
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

  const people = ['@eululu_', '@azalim12', '@luccaalvesc', '@xanda1235'];
  let indexPeople = 0;

  while (error === false) {
    if (indexPeople === 3) [
      indexPeople = 0
    ]

    await page.type('textarea[aria-label="Adicione um comentário..."]', people[indexPeople], { delay: 150 });

    let publishButton = await page.$x('//button[contains(text(), "Publicar")]');

    let [tryAgainButton, ...rest] = await page.$x('//button[contains(text(), "Tentar novamente")]');

    if (!tryAgainButton) {
      comments++;

      await publishButton[0].click();

      console.log(`${comments} ${tryAgainButton}`);

    } else {
      await tryAgainButton.click();
    }

    indexPeople++;
  }

})();

function pollDOM() {
  console.log('esperando');
}