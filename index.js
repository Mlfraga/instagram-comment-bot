const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage();
  await page.goto('https://instagram.com/accounts/login', { waitUntil: 'networkidle2' });

  await page.waitFor(1000);

  await page.type('[name=username]', "mfraga_12", { delay: 50 });
  await page.type('[name=password]', 'Mm884741', { delay: 50 });

  await page.evaluate(() => {
    document.querySelector('.sqdOP').click();
  })

  await page.waitFor(4000);

  await browser.close();
})();