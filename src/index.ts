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

  const people = ['@eululu_'];
  let indexPeople = 0;

  while (error === false) {
    if (indexPeople === 1) {
      indexPeople = 0
    }

    await page.type('textarea[aria-label="Adicione um comentário..."]', people[indexPeople], { delay: 600 });

    let publishButton = await page.$x('//button[contains(text(), "Publicar")]');

    let [tryAgainButton, ...rest] = await page.$x('//button[contains(text(), "Tentar novamente")]');

    if (!tryAgainButton) {
      await publishButton[0].click();
    } else {
      setTimeout(async () => {
        try {
          await tryAgainButton.click();
        } catch {
          await publishButton[0].click();
        }
      }, 5000)
    }

    page.once('response', response => {
      if (response.url().includes("comments")) {
        if (response.url().includes("add")) {
          console.log("response code: ", response.status());

          const status = response.status();
          if (status === 200) {
            comments++;
            console.log(`${comments} comentários. ${status}`);

          }
        }
      }
    });

    indexPeople++;
  }
})();